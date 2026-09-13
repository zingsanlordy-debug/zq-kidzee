// Web Audio API Synthesizer & Web Speech Engine for ZQ Kidzee
// Features:
// - Story narration (Dadi style 0.7 rate, character voices: Sher, Chuha, Akbar, Birbal, Khargosh, Kachua)
// - Poem songs (cute girl voice 1.2 pitch, 0.9 rate + happy piano, dholak, clap, horse trot)
// - Lori lullabies (Maa mamta voice 0.8 pitch, 0.6 rate, echo + 60 BPM celestial lullaby, infinite loop)
// - Rich sound FX: Lion roar, mouse squeak, royal shehnai, cat meow, race wind, river stream, birds, dholak

export type SoundFxType =
  | 'sher'
  | 'shehnai'
  | 'cat_mouse'
  | 'race_wind'
  | 'birds'
  | 'water'
  | 'space'
  | 'village'
  | 'magic'
  | 'dholak_piano'
  | 'horse_trot'
  | 'train_chug'
  | 'lori_sleep';

class KidzeeAudioPlayer {
  private audioCtx: AudioContext | null = null;
  private bgTimer: number | null = null;
  private fxTimer: number | null = null;
  private isSynthesizing: boolean = false;
  private bgGainNode: GainNode | null = null;
  private echoDelayNode: DelayNode | null = null;
  private echoFeedbackNode: GainNode | null = null;
  private activeVoices: SpeechSynthesisVoice[] = [];
  private currentBgVolume: number = 0.15; // 15% soft background volume

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.activeVoices = window.speechSynthesis.getVoices();
    }
  }

  public initCtx(): AudioContext | null {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Audio ducking helper: keeps background music soft (15%) when speech is active
  public setDucking(isSpeaking: boolean) {
    if (this.bgGainNode && this.audioCtx) {
      const targetVolume = isSpeaking ? 0.14 : 0.18;
      try {
        this.bgGainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
        this.bgGainNode.gain.linearRampToValueAtTime(targetVolume, this.audioCtx.currentTime + 0.1);
      } catch (e) {
        this.bgGainNode.gain.value = targetVolume;
      }
    }
  }

  public setVolume(vol: number) {
    this.currentBgVolume = Math.max(0, Math.min(1, vol));
    if (this.bgGainNode && this.audioCtx) {
      try {
        this.bgGainNode.gain.setValueAtTime(this.currentBgVolume, this.audioCtx.currentTime);
      } catch {
        // ignore
      }
    }
  }

  public stopAll() {
    this.stopAllAmbientOnly();
    this.isSynthesizing = false;

    if (this.bgGainNode && this.audioCtx) {
      try {
        this.bgGainNode.gain.setValueAtTime(this.bgGainNode.gain.value, this.audioCtx.currentTime);
        this.bgGainNode.gain.linearRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.1);
      } catch {
        // ignore
      }
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public stopAllAmbientOnly() {
    if (this.bgTimer) {
      window.clearInterval(this.bgTimer);
      this.bgTimer = null;
    }
    if (this.fxTimer) {
      window.clearInterval(this.fxTimer);
      this.fxTimer = null;
    }
  }

  // ==========================================
  // AMBIENT & SOUND FX SYNTHESIZERS
  // ==========================================

  // Synthesize a cute Lion roar / growl
  public playLionRoar() {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.8);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.8);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.9);
  }

  // Synthesize cute mouse squeak
  public playMouseSqueak() {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.linearRampToValueAtTime(3200, now + 0.08);
    osc.frequency.linearRampToValueAtTime(2200, now + 0.15);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  // Synthesize cute cat meow
  public playCatMeow() {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(820, now + 0.25);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.6);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.7);
  }

  // Synthesize royal shehnai riff
  public playShehnaiNote(freq: number, duration: number = 0.5) {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.5, now);
    filter.Q.setValueAtTime(4.0, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.07, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  // Horse galloping trot sound (tak-bak tak-bak)
  public playHorseTrot() {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    [0, 0.12].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(offset === 0 ? 140 : 110, now + offset);

      gain.gain.setValueAtTime(0.001, now + offset);
      gain.gain.linearRampToValueAtTime(0.08, now + offset + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.09);
    });
  }

  // Clap sound
  public playClapSound() {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Dholak deep bass thump (dhum-dhum)
  public playDholakBass() {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.22);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  // Heavy lion paw footsteps (deep resonant thud)
  public playPawFootstep() {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.18);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.24);
  }

  // Fast cute mouse running pitter-patter sound
  public playPitterPatter() {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    [0, 0.045, 0.09, 0.135].forEach((offset, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(idx % 2 === 0 ? 1300 : 1600, now + offset);
      gain.gain.setValueAtTime(0.07, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.04);
    });
  }

  // Water bubbling bloop-blip pops (for fish and river)
  public playWaterBubbles() {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    [0, 0.08, 0.16].forEach((offset, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const startF = 380 + i * 160;
      osc.frequency.setValueAtTime(startF, now + offset);
      osc.frequency.exponentialRampToValueAtTime(startF * 1.7, now + offset + 0.06);

      gain.gain.setValueAtTime(0.09, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.08);
    });
  }

  // Gentle night breeze whispering
  public playGentleBreeze() {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(210, now + 0.5);
    osc.frequency.linearRampToValueAtTime(130, now + 1.1);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.15);
  }

  // Night cricket trill / star twinkle chime
  public playNightCrickets() {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    [0, 0.06, 0.12].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(3600, now + offset);
      gain.gain.setValueAtTime(0.025, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.05);
    });
  }

  // Jungle birds chirping trill
  public playBirdChirp() {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(3700, now + 0.07);
    osc.frequency.exponentialRampToValueAtTime(2700, now + 0.14);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.17);
  }

  // Bus horn beep-beep
  public playBusHorn() {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    [0, 0.16].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(340, now + offset);

      gain.gain.setValueAtTime(0.06, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.12);
    });
  }

  // Cartoon spring boing sound
  public playBoingJump() {
    const ctx = this.initCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(650, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(340, now + 0.28);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  // Trigger Scene SFX automatically based on line content & mode
  public playSceneSfxForLine(lineText: string, mode: 'story' | 'poem' | 'lori', title: string = '') {
    const text = (lineText + ' ' + title).toLowerCase();

    if (mode === 'lori') {
      // Soft gentle breeze or star crickets
      if (Math.random() > 0.5) {
        this.playGentleBreeze();
      } else {
        this.playNightCrickets();
      }
      return;
    }

    if (mode === 'poem') {
      if (text.includes('machhli') || text.includes('मछली') || text.includes('पानी') || text.includes('जल')) {
        this.playWaterBubbles();
      } else if (text.includes('bus') || text.includes('बस') || text.includes('चढ़ी') || text.includes('पहिए')) {
        this.playBusHorn();
      } else if (text.includes('घोड़ा') || text.includes('काठी') || text.includes('horse') || text.includes('दौड़ा')) {
        this.playHorseTrot();
      } else if (text.includes('आलू') || text.includes('टमाटर') || text.includes('कचालू') || text.includes('नाच')) {
        this.playBoingJump();
      } else if (text.includes('तारे') || text.includes('star') || text.includes('चंदा') || text.includes('twinkle')) {
        this.playNightCrickets();
      } else if (text.includes('तितली') || text.includes('चिड़िया') || text.includes('मोरनी') || text.includes('फूल')) {
        this.playBirdChirp();
      } else {
        this.playClapSound();
      }
      return;
    }

    // Story Mode Scene SFX
    if (text.includes('शेर') || text.includes('lion')) {
      if (text.includes('दहाड़') || text.includes('गुस्सा') || text.includes('आंख खुली')) {
        this.playLionRoar();
      } else {
        this.playPawFootstep();
      }
    } else if (text.includes('चूहा') || text.includes('mouse') || text.includes('चीकू')) {
      if (text.includes('दौड़') || text.includes('भाग') || text.includes('उछल') || text.includes('आ पहुंचा')) {
        this.playPitterPatter();
      } else {
        this.playMouseSqueak();
      }
    } else if (text.includes('नदी') || text.includes('पानी') || text.includes('पुल') || text.includes('कुआं') || text.includes('छलांग')) {
      this.playWaterBubbles();
    } else if (text.includes('जंगल') || text.includes('पेड़') || text.includes('चिड़िया') || text.includes('सवेरा')) {
      this.playBirdChirp();
    } else if (text.includes('अकबर') || text.includes('दरबार') || text.includes('बीरबल') || text.includes('शहंशाह')) {
      this.playShehnaiNote(523.25, 0.4);
    } else if (text.includes('खरगोश') || text.includes('दौड़') || text.includes('कछुआ')) {
      this.playPitterPatter();
    } else if (text.includes('बिल्ली') || text.includes('cat')) {
      this.playCatMeow();
    } else {
      this.playBirdChirp();
    }
  }

  // Start Sound FX / Background loop by story/music sound type
  public startThemeSoundFx(soundType: SoundFxType = 'birds', volume?: number) {
    this.stopAllAmbientOnly();
    const ctx = this.initCtx();
    if (!ctx) return;

    this.isSynthesizing = true;
    if (volume !== undefined) this.currentBgVolume = volume;

    this.bgGainNode = ctx.createGain();
    this.bgGainNode.gain.setValueAtTime(this.currentBgVolume, ctx.currentTime);
    this.bgGainNode.connect(ctx.destination);

    // Setup delay echo node if lori
    if (soundType === 'lori_sleep') {
      this.echoDelayNode = ctx.createDelay();
      this.echoDelayNode.delayTime.setValueAtTime(0.4, ctx.currentTime);
      this.echoFeedbackNode = ctx.createGain();
      this.echoFeedbackNode.gain.setValueAtTime(0.35, ctx.currentTime);

      this.echoDelayNode.connect(this.echoFeedbackNode);
      this.echoFeedbackNode.connect(this.echoDelayNode);
      this.echoDelayNode.connect(this.bgGainNode);
    }

    let intervalMs = 600;
    let step = 0;

    const tick = () => {
      if (!this.isSynthesizing || !this.audioCtx || !this.bgGainNode) return;
      step++;

      if (soundType === 'sher') {
        // Jungle birds + occasional lion growl or mouse squeak
        const notes = [523.25, 659.25, 783.99, 880.0, 1046.5];
        const freq = notes[step % notes.length];
        this.playPluckNote(freq, 'sine', 0.6);
        if (step % 14 === 0) {
          this.playLionRoar();
        } else if (step % 7 === 0) {
          this.playMouseSqueak();
        }
      } else if (soundType === 'shehnai') {
        // Shehnai raag Bhupali notes: Sa Re Ga Pa Dha (C4, D4, E4, G4, A4)
        const raag = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 440.0, 392.0];
        const freq = raag[step % raag.length];
        this.playShehnaiNote(freq, 0.7);
      } else if (soundType === 'cat_mouse') {
        // Kitchen woodblock + cat meow + scurrying
        const notes = [329.63, 392.0, 440.0, 523.25];
        this.playPluckNote(notes[step % notes.length], 'triangle', 0.3);
        if (step % 10 === 0) this.playCatMeow();
        if (step % 5 === 0) this.playMouseSqueak();
      } else if (soundType === 'race_wind') {
        // Gallop beat + wind swoosh
        this.playHorseTrot();
      } else if (soundType === 'horse_trot') {
        this.playHorseTrot();
        if (step % 4 === 0) {
          this.playPluckNote(392.0, 'triangle', 0.4);
        }
      } else if (soundType === 'dholak_piano') {
        // Light, happy kids nursery rhymes background music (Twinkle Twinkle / Nursery style)
        // Soft joyful toy piano chords + light glockenspiel bells without loud beats
        const happyChords = [261.63, 329.63, 392.0, 523.25, 440.0, 392.0, 329.63, 293.66, 261.63, 392.0];
        const freq = happyChords[step % happyChords.length];
        this.playPluckNote(freq, 'sine', 0.45);
        if (step % 2 === 0) {
          // Soft bell chime / glockenspiel on high harmonic
          this.playPluckNote(freq * 1.5, 'triangle', 0.2);
        }
      } else if (soundType === 'lori_sleep') {
        // 60 BPM gentle hypnotic lullaby (1000ms interval) with celestial piano & light twinkling bells
        // Very soft, slow, peaceful - no loud beats
        const loriScale = [261.63, 329.63, 392.0, 440.0, 523.25, 440.0, 392.0, 329.63, 293.66, 261.63];
        const freq = loriScale[step % loriScale.length];
        this.playLoriBell(freq);
        if (step % 2 === 0) {
          this.playPluckNote(freq / 2, 'sine', 1.4);
        }
      } else {
        // Default warm story harp
        const storyNotes = [174.61, 220.0, 261.63, 329.63, 392.0, 523.25, 392.0, 261.63];
        this.playPluckNote(storyNotes[step % storyNotes.length], 'sine', 0.8);
      }
    };

    if (soundType === 'lori_sleep') {
      intervalMs = 1000; // 60 BPM exactly as requested
    } else if (soundType === 'dholak_piano') {
      intervalMs = 460; // Light joyful kids tempo
    } else if (soundType === 'horse_trot') {
      intervalMs = 420;
    } else if (soundType === 'race_wind') {
      intervalMs = 500;
    } else {
      intervalMs = 700;
    }

    tick();
    this.bgTimer = window.setInterval(tick, intervalMs);
  }

  private playPluckNote(freq: number, type: OscillatorType = 'sine', duration: number = 0.5) {
    if (!this.audioCtx || !this.bgGainNode) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.bgGainNode);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  private playLoriBell(freq: number) {
    if (!this.audioCtx || !this.bgGainNode) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    osc.connect(gain);
    gain.connect(this.bgGainNode);
    if (this.echoDelayNode) {
      gain.connect(this.echoDelayNode);
    }

    osc.start(now);
    osc.stop(now + 1.9);
  }

  // ==========================================
  // MOTHER'S VOICE SELECTION & AUTO-TUNE HARMONY
  // ==========================================

  // Select sweet Mother's Voice ("Maa Ki Meethi Awaaz") for ANY language
  public selectMotherVoice(langCode: string = 'hi', mode: 'poem' | 'lori' = 'poem'): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = this.activeVoices.length > 0 ? this.activeVoices : window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const cleanLang = (langCode || 'hi').toLowerCase();

    // Map each language to known sweet mother/female voice names
    const languageMotherVoiceMap: Record<string, string[]> = {
      ta: ['valluvar', 'pallavi', 'latha', 'tamil female', 'google தமிழ்', 'ta-in'],
      te: ['chitra', 'telugu female', 'google తెలుగు', 'te-in', 'kavya'],
      mr: ['aarohi', 'marathi female', 'google मराठी', 'mr-in', 'swara'],
      bn: ['tanisha', 'bengali female', 'bangla female', 'google বাংলা', 'bn-in'],
      gu: ['dhwani', 'gujarati female', 'google ગુજરાતી', 'gu-in'],
      kn: ['sapna', 'kannada female', 'google ಕನ್ನಡ', 'kn-in'],
      ml: ['sobhana', 'malayalam female', 'google മലയാളം', 'ml-in'],
      pa: ['harpreet', 'punjabi female', 'google ਪੰਜਾਬੀ', 'pa-in'],
      or: ['odia female', 'oriya female', 'or-in'],
      as: ['assamese female', 'as-in'],
      ur: ['uzma', 'urdu female', 'google اردو', 'ur-pk', 'ur-in'],
      en: ['neerja', 'heera', 'samantha', 'victoria', 'karen', 'zira', 'female', 'natural'],
      hi: ['swara', 'kalpana', 'lekha', 'google हिन्दी', 'hindi female', 'veena', 'aditi', 'geeta', 'kavya', 'ananya', 'priya', 'shruti']
    };

    const targetKeywords = languageMotherVoiceMap[cleanLang] || [];

    // 1. First priority: Target language female voice matching specific mother voice names
    for (const keyword of targetKeywords) {
      const match = voices.find(v => {
        const vName = v.name.toLowerCase();
        const vLang = v.lang.toLowerCase();
        return (vName.includes(keyword) || vLang.includes(keyword)) && (vLang.startsWith(cleanLang) || vLang.includes(cleanLang));
      });
      if (match) return match;
    }

    // 2. Second priority: Any female voice for the target language
    const langFemale = voices.find(v => {
      const vName = v.name.toLowerCase();
      const vLang = v.lang.toLowerCase();
      const matchesLang = vLang.startsWith(cleanLang) || vLang.includes(`${cleanLang}-`);
      const isFemale = vName.includes('female') || vName.includes('woman') || vName.includes('girl') ||
                       (!vName.includes('male') && !vName.includes('david') && !vName.includes('george') && !vName.includes('ravi'));
      return matchesLang && isFemale;
    });
    if (langFemale) return langFemale;

    // 3. Third priority: Any voice for the target language
    const anyLangVoice = voices.find(v => {
      const vLang = v.lang.toLowerCase();
      return vLang.startsWith(cleanLang) || vLang.includes(`${cleanLang}-`);
    });
    if (anyLangVoice) return anyLangVoice;

    // 4. Fourth priority: If regional Indian language voice not locally installed on device,
    // fallback to warm Indian female voice (hi-IN / en-IN female) so accent remains naturally Indian
    const indianMotherVoices = [
      'swara', 'kalpana', 'lekha', 'google हिन्दी', 'neerja', 'heera', 'veena', 'aditi', 'geeta', 'kavya'
    ];
    for (const kw of indianMotherVoices) {
      const match = voices.find(v => v.name.toLowerCase().includes(kw));
      if (match) return match;
    }

    // 5. Fifth priority: General smooth female voice
    const naturalFemale = voices.find(v => {
      const vName = v.name.toLowerCase();
      return (vName.includes('female') || vName.includes('woman') || vName.includes('samantha') || vName.includes('victoria') || vName.includes('zira')) && !vName.includes('male');
    });

    return naturalFemale || voices[0] || null;
  }

  // Synchronous musical auto-tune harmonic accompaniment for Poems (Rhymes)
  // Plays a joyful 4-note acoustic bell & toy piano phrase on the rhyme's beat
  public playPoemSingingAccompaniment(lineIndex: number = 0) {
    const ctx = this.initCtx();
    if (!ctx || !this.bgGainNode) return;
    const now = ctx.currentTime;

    // Cheerful nursery pentatonic scale: Sa Re Ga Pa Dha (C4, D4, E4, G4, A4, C5)
    // Twinkle Twinkle & Happy Kids Rhymes song melodic contour:
    const melodicPhrases = [
      [261.63, 329.63, 392.00, 523.25], // C4, E4, G4, C5 (Rising Sa-Ga-Pa-Sa)
      [392.00, 440.00, 523.25, 440.00], // G4, A4, C5, A4 (Antara Pa-Dha-Sa-Dha)
      [349.23, 329.63, 293.66, 329.63], // F4, E4, D4, E4 (Playful Ma-Ga-Re-Ga)
      [293.66, 392.00, 261.63, 261.63]  // D4, G4, C4, C4 (Cadence Re-Pa-Sa-Sa)
    ];

    const notes = melodicPhrases[lineIndex % melodicPhrases.length];
    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.22;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle'; // Sweet chime / toy piano timbre
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.08, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.38);

      osc.connect(gain);
      gain.connect(this.bgGainNode!);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  // Synchronous warm lullaby acoustic chords & twinkling star chimes for Loriyan
  // Mother's soothing lullaby chords: soft piano + twinkling celesta with warm decay
  public playLoriSingingAccompaniment(lineIndex: number = 0) {
    const ctx = this.initCtx();
    if (!ctx || !this.bgGainNode) return;
    const now = ctx.currentTime;

    // Calming 60 BPM lullaby progression (C Major 7, A Minor, F Major, G)
    const lullabyChords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7 (Very dreamy and cozy)
      [220.00, 261.63, 329.63, 440.00], // Am (Tender maternal warmth)
      [174.61, 261.63, 349.23, 440.00], // Fmaj (Soft cradle rocking)
      [196.00, 246.94, 293.66, 392.00]  // G (Peaceful night resolve)
    ];

    const chord = lullabyChords[lineIndex % lullabyChords.length];
    chord.forEach((freq, idx) => {
      const startTime = now + idx * 0.32;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine'; // Soft, pure, warm tone
      osc.frequency.setValueAtTime(freq, startTime);

      // Very gentle, sleepy envelope with long decay
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.06, startTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

      osc.connect(gain);
      gain.connect(this.bgGainNode!);

      if (this.echoDelayNode) {
        gain.connect(this.echoDelayNode);
      }

      osc.start(startTime);
      osc.stop(startTime + 1.9);
    });
  }

  // ==========================================
  // VOICE SPEECH NARRATION & SONG ENGINE
  // ==========================================

  public speakLine({
    text,
    langCode = 'hi',
    mode = 'story',
    lineIndex = 0,
    rate,
    pitch,
    volume = 1.0,
    onEnd
  }: {
    text: string;
    langCode?: string;
    mode?: 'story' | 'poem' | 'lori';
    lineIndex?: number;
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
  }) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    // Only cancel if actively speaking or pending, then immediately resume queue
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const cleanText = text.replace(/[*_#`|]/g, ' ').trim();
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    // Auto-tune musical scale & cadence calculation for Song / Lullaby:
    let effectiveRate = rate;
    let effectivePitch = pitch;

    if (mode === 'poem') {
      // SUNG in proper lay/tal/sur like kids rhymes song (Twinkle Twinkle style)
      // Melodic cadence: Sa -> Pa -> Ga -> Sa resolve
      const poemSurScale = [1.16, 1.28, 1.22, 1.10];
      if (effectivePitch === undefined) {
        effectivePitch = poemSurScale[lineIndex % poemSurScale.length];
      }
      if (effectiveRate === undefined) {
        effectiveRate = 0.86; // Lyrical singing lay
      }
      // Trigger synchronous acoustic auto-tune harmonic accompaniment
      this.playPoemSingingAccompaniment(lineIndex);
    } else if (mode === 'lori') {
      // SUNG as a very soft, slow lullaby in sleepy "Maa ki sula dene wali awaaz"
      // Very gentle maternal low pitch + slow swaying rhythm
      const loriSurScale = [0.84, 0.88, 0.82, 0.86];
      if (effectivePitch === undefined) {
        effectivePitch = loriSurScale[lineIndex % loriSurScale.length];
      }
      if (effectiveRate === undefined) {
        effectiveRate = 0.62; // Very slow, calm, sleepy
      }
      // Trigger synchronous warm lullaby chords + twinkling celesta
      this.playLoriSingingAccompaniment(lineIndex);
    } else {
      if (effectiveRate === undefined) effectiveRate = 0.75;
      if (effectivePitch === undefined) effectivePitch = 0.95;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = effectiveRate;
    utterance.pitch = effectivePitch;
    utterance.volume = volume;

    const langMap: Record<string, string> = {
      hi: 'hi-IN',
      en: 'en-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      mr: 'mr-IN',
      bn: 'bn-IN',
      gu: 'gu-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      pa: 'pa-IN',
      or: 'or-IN',
      as: 'as-IN',
      ur: 'ur-PK',
      fr: 'fr-FR',
      es: 'es-ES',
      de: 'de-DE',
      ar: 'ar-SA',
      zh: 'zh-CN',
      ru: 'ru-RU'
    };

    utterance.lang = langMap[langCode] || `${langCode}-IN`;

    const voices = this.activeVoices.length > 0 ? this.activeVoices : window.speechSynthesis.getVoices();
    
    // Voice selection: prioritize Mother's Voice ("Maa Ki Awaaz") in the selected language
    const motherVoice = this.selectMotherVoice(langCode, mode === 'lori' ? 'lori' : 'poem');
    if (motherVoice) {
      utterance.voice = motherVoice;
    } else {
      const matchedVoice = voices.find(v =>
        v.lang.toLowerCase().startsWith(langCode.toLowerCase()) ||
        v.lang.toLowerCase().includes(langCode.toLowerCase())
      ) || voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    // Audio ducking: ensure background music stays soft (15%) while speech is active
    utterance.onstart = () => {
      this.setDucking(true);
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    };

    utterance.onend = () => {
      this.setDucking(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.setDucking(false);
      if (onEnd) onEnd();
    };

    // Immediate execution with zero delay
    window.speechSynthesis.speak(utterance);
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }

  // Legacy method compatibility
  public speakText(text: string, langCode: string = 'hi', onEnd?: () => void) {
    this.speakLine({ text, langCode, rate: 0.8, pitch: 1.0, onEnd });
  }

  public startAmbientBgMusic(mode: 'lori' | 'poem' | 'story' = 'lori', volume: number = 0.15) {
    const soundType: SoundFxType =
      mode === 'lori' ? 'lori_sleep' : mode === 'poem' ? 'dholak_piano' : 'birds';
    this.startThemeSoundFx(soundType, volume);
  }

  public playVoiceAndMusic({
    text,
    langCode = 'hi',
    mode = 'story',
    onEnd
  }: {
    text: string;
    langCode?: string;
    mode?: 'lori' | 'poem' | 'story';
    onEnd?: () => void;
  }) {
    this.stopAll();
    const soundType: SoundFxType =
      mode === 'lori' ? 'lori_sleep' : mode === 'poem' ? 'dholak_piano' : 'birds';

    // Start background music at soft volume (15%)
    this.startThemeSoundFx(soundType, 0.15);

    // Auto-tuned singing parameters for mother's voice:
    const rate = mode === 'lori' ? 0.62 : mode === 'poem' ? 0.86 : 0.75;
    const pitch = mode === 'lori' ? 0.84 : mode === 'poem' ? 1.18 : 0.95;

    // Immediately start speech so both voice and music start together with 0 delay
    this.speakLine({
      text,
      langCode,
      mode,
      lineIndex: 0,
      rate,
      pitch,
      onEnd: () => {
        this.stopAll();
        if (onEnd) onEnd();
      }
    });
  }

  public playLoriMelody() {
    this.startThemeSoundFx('lori_sleep', 0.3);
  }

  public playPoemMelody() {
    this.startThemeSoundFx('dholak_piano', 0.3);
  }
}

export const kidzeeAudio = new KidzeeAudioPlayer();

export const playVoiceAndMusic = (params: {
  text: string;
  langCode?: string;
  mode?: 'lori' | 'poem' | 'story';
  onEnd?: () => void;
}) => kidzeeAudio.playVoiceAndMusic(params);

export const playLullabyMelody = () => kidzeeAudio.playLoriMelody();
export const playNurseryMelody = () => kidzeeAudio.playPoemMelody();
export const stopAllAudio = () => kidzeeAudio.stopAll();
export const speakHindiText = (text: string, onEnd?: () => void) => kidzeeAudio.speakText(text, 'hi', onEnd);
export const speakLangText = (
  text: string,
  langCode: string = 'hi',
  rateOrOnEnd?: number | (() => void),
  callback?: () => void
) => {
  const rate = typeof rateOrOnEnd === 'number' ? rateOrOnEnd : 0.8;
  const onEnd = typeof rateOrOnEnd === 'function' ? rateOrOnEnd : callback;
  kidzeeAudio.speakLine({ text, langCode, rate, onEnd });
};
export const isSpeechSpeaking = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking;
