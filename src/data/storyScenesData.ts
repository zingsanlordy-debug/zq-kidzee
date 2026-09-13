// Scene-by-scene cartoon visual matching for Kidzee Stories
// Each story line maps to an exact cute cartoon illustration prompt

export interface StoryScene {
  text: string;
  img: string; // descriptive cartoon prompt
  bgStyle?: string;
  characterEmoji?: string;
}

// Pre-defined detailed scenes for popular stories
export const STORY_SCENES_MAPPING: Record<string, StoryScene[]> = {
  // Sher Aur Chuha (Lion & Mouse)
  "Sher Aur Chuha": [
    { text: "एक विशाल और सुंदर जंगल में केसरी नाम का शेर रहता था।", img: "majestic friendly lion sitting peacefully in lush vibrant ghibli style jungle with big trees" },
    { text: "दोपहर की धूप में शेर एक घने पेड़ की छांव में सो रहा था।", img: "cute lion sleeping peacefully under huge green banyan tree warm sunlight rays" },
    { text: "तभी चीकू नाम का नटखट चूहा खेलता-कूदता वहां आ पहुंचा।", img: "tiny adorable playful mouse running on mossy jungle grass smiling cute cartoon" },
    { text: "चूहा शेर की पीठ पर उछल-कूद करने लगा।", img: "cute tiny mouse jumping joyfully on back of giant sleeping furry lion cartoon" },
    { text: "शेर की आंख खुल गई और उसने गुस्से में दहाड़ लगाई!", img: "lion waking up with funny surprised angry expression opening eyes cartoon" },
    { text: "शेर ने अपने भारी पंजे में चूहे को पकड़ लिया।", img: "big furry lion paw gently catching tiny frightened mouse close up cartoon" },
    { text: "चूहे ने हाथ जोड़कर कहा: 'महाराज! मुझे माफ कर दीजिए, मैं कभी आपके काम आऊंगा।'", img: "cute tiny mouse with hands folded together begging politely to big lion" },
    { text: "शेर हंसा और उसने दया करके नन्हे चूहे को छोड़ दिया।", img: "friendly lion laughing heartily with kind eyes letting tiny mouse go free" },
    { text: "कुछ दिनों बाद जंगल में एक चालाक शिकारी आया।", img: "sneaky cartoon hunter in jungle hiding behind bushes with ropes" },
    { text: "शिकारी ने शेर को पकड़ने के लिए मजबूत रस्सियों का जाल बिछाया।", img: "big rope trap net spread on ground in green forest cartoon" },
    { text: "बेचारा शेर उस फंदे में बुरी तरह फंस गया और दहाड़ने लगा।", img: "brave lion trapped inside strong rope net calling for help in jungle" },
    { text: "चूहे ने शेर की दर्दभरी आवाज सुनी और तुरंत दौड़कर आया।", img: "little brave mouse sprinting fast through jungle grass to help his friend" },
    { text: "चूहे ने अपने नुकीले दांतों से रस्सियों को कुतरना शुरू किया।", img: "close up cute mouse chewing through thick rope net with sharp teeth" },
    { text: "देखते ही देखते जाल कट गया और शेर आज़ाद हो गया!", img: "broken rope net and happy mighty lion standing free in sunlight" },
    { text: "शेर ने चूहे को गले लगाया और सदा के लिए पक्के मित्र बन गए।", img: "big friendly lion and tiny cute mouse hugging happily best friends forever in jungle" }
  ],

  // Akbar Birbal
  "Akbar Birbal - Sabse Bada Sawal": [
    { text: "मुगल शहंशाह अकबर का भव्य दरबार सजा हुआ था।", img: "grand royal mughal palace golden darbar pillars colorful chandeliers cartoon" },
    { text: "दरबार में सभी मंत्री और बुद्धिमान बीरबल उपस्थित थे।", img: "emperor akbar sitting on golden throne with clever birbal standing beside" },
    { text: "बादशाह अकबर ने एक गहरा सवाल पूछा।", img: "emperor akbar stroke beard thoughtfully asking a riddle to ministers" },
    { text: "उन्होंने पूछा: 'बताओ दुनिया में सबसे मीठी और सबसे कड़वी चीज क्या है?'", img: "royal ministers thinking deeply scratching head in darbar hall" },
    { text: "किसी दरबारी ने शहद कहा तो किसी ने मीठा आम।", img: "courtier offering golden pot of honey and ripe mango to king" },
    { text: "बीरबल मुस्कुराए और आगे बढ़े।", img: "wise cheerful birbal smiling with folded hands stepping forward" },
    { text: "बीरबल ने कहा: 'जहांपनाह! सबसे मीठी चीज मनुष्य की मधुर वाणी है।'", img: "birbal speaking eloquently with polite hand gestures in court" },
    { text: "और सबसे कड़वी चीज अपमान और कटु वचन हैं।", img: "emperor akbar nodding in deep appreciation and amazement" },
    { text: "अकबर बीरबल की बुद्धिमत्ता से अत्यंत प्रसन्न हुए।", img: "smiling emperor akbar gifting shining royal pearl necklace to birbal" },
    { text: "पूरे दरबार ने बीरबल की जय-जयकार की।", img: "grand royal darbar clapping cheering for wise birbal celebration" }
  ],

  // Chatur Khargosh
  "Chatur Khargosh": [
    { text: "जंगल में भासुरक नाम का एक क्रूर और अहंकारी शेर रहता था।", img: "fierce angry lion walking through dark forest scaring animals" },
    { text: "वह रोज जंगल के बेकसूर जानवरों का शिकार करता था।", img: "worried cute forest animals deer rabbits gathering for a secret meeting" },
    { text: "एक दिन एक नन्हे चतुर खरगोश की बारी आई।", img: "small smart fluffy white rabbit thinking with finger on chin" },
    { text: "खरगोश जानबूझकर शेर के पास बहुत देर से पहुंचा।", img: "little rabbit walking very slowly smelling flowers on sunny forest path" },
    { text: "शेर भूख से तड़प रहा था और गुस्से से लाल हो गया।", img: "hungry furious lion roaring on high rock stomping ground" },
    { text: "खरगोश ने कहा: 'रास्ते में मुझे दूसरा शेर मिला जिसने मुझे रोक लिया!'", img: "cute rabbit talking calmly and cleverly to giant furious lion" },
    { text: "शेर क्रोध में बोला: 'मुझे दिखाओ वह दूसरा शेर कहां छुपा है!'", img: "angry lion marching forward followed by clever hopping white rabbit" },
    { text: "खरगोश शेर को एक पुराने और गहरे पत्थर के कुएं के पास ले गया।", img: "ancient stone water well in middle of green woods with flowers" },
    { text: "खरगोश ने कहा: 'महाराज! वह दुष्ट शेर इस कुएं के अंदर बैठा है।'", img: "rabbit pointing towards the open water well with confidence" },
    { text: "शेर ने कुएं में झांका तो उसे पानी में अपनी ही परछाईं दिखी।", img: "reflection of roaring lion in clear water inside stone well" },
    { text: "शेर ने उसे दूसरा शेर समझकर कुएं में छलांग लगा दी!", img: "lion jumping into deep water well splashing water everywhere cartoon" },
    { text: "शेर का अंत हो गया और पूरे जंगल में खुशियों की लहर दौड़ गई!", img: "happy cute animals celebrating in colorful forest lifting little rabbit like hero" }
  ],

  // Lalchi Kutta
  "Lalchi Kutta": [
    { text: "एक भूखा कुत्ता खाने की तलाश में गांव की गलियों में भटक रहा था।", img: "cute stray brown dog searching for food in colorful village street" },
    { text: "उसे रास्ते में एक स्वादिष्ट और बड़ी हड्डी मिली।", img: "happy dog finding a big clean bone in front of a bakery" },
    { text: "कुत्ता हड्डी मुंह में दबाकर जंगल की ओर जाने लगा।", img: "dog trotting cheerfully holding bone in mouth tail wagging" },
    { text: "रास्ते में साफ बहती नदी पर एक संकरा लकड़ी का पुल था।", img: "wooden rustic bridge over sparkling blue stream forest landscape" },
    { text: "पुल पार करते समय कुत्ते ने नीचे पानी में देखा।", img: "dog looking down from wooden bridge railing into clear stream" },
    { text: "पानी में उसे अपनी ही परछाईं दिखाई दी।", img: "reflection of dog holding bone visible in crystal clear stream" },
    { text: "मूर्ख कुत्ते ने सोचा कि नीचे कोई दूसरा कुत्ता है जिसके पास भी हड्डी है।", img: "greedy dog thinking with thought bubble imagining two delicious bones" },
    { text: "उसने वह हड्डी भी छीनने के लिए जोर से 'भौंकने' का फैसला किया।", img: "dog opening wide mouth to bark angrily at the water reflection" },
    { text: "जैसे ही उसने मुंह खोला, उसकी अपनी हड्डी छपाक से पानी में गिर गई!", img: "bone falling into splashing water ripples as dog looks shocked" },
    { text: "हड्डी बह गई और लालची कुत्ता पछताते हुए खाली पेट घर लौटा।", img: "sad weeping dog with hanging ears sitting by river bank learning lesson" }
  ],

  // Kauwa Aur Lomdi
  "Kauwa Aur Lomdi": [
    { text: "एक काले कौवे को एक स्वादिष्ट पूरी का टुकड़ा मिला।", img: "cute black crow holding tasty round bread in beak sitting on branch" },
    { text: "वह पेड़ की ऊंची डाल पर बैठकर आराम से खाने जा रहा था।", img: "crow perched proudly on green leafy oak tree branch" },
    { text: "तभी वहां एक चालाक भूखी लोमड़ी आ पहुंची।", img: "clever orange fox walking slyly under tree smelling food" },
    { text: "लोमड़ी ने कौवे के मुंह में रोटी देखी तो उसके मुंह में पानी आ गया।", img: "fox looking up with crafty greedy smile licking lips" },
    { text: "लोमड़ी बोली: 'अरे कौवे भैया! आप कितने सुंदर हैं और आपके पंख कितने चमकदार हैं!'", img: "orange fox flattering looking up talking sweet to the crow" },
    { text: "लोमड़ी ने आगे कहा: 'आपकी आवाज कोयल से भी मीठी है, मुझे एक गाना सुनाइए ना!'", img: "crow puffing chest feeling proud and flattered on tree" },
    { text: "मूर्ख कौवा अपनी झूठी तारीफ सुनकर फूला न समाया।", img: "crow closing eyes proudly preparing to sing musical notes" },
    { text: "जैसे ही उसने 'कां-कां' किया, रोटी चोंच से नीचे गिर गई!", img: "piece of bread falling from opened crow beak in mid-air" },
    { text: "चालाक लोमड़ी ने रोटी लपकी और खुशी-खुशी जंगल में भाग गई।", img: "clever fox catching bread in mouth running away into woods" },
    { text: "कौवा डाल पर बैठकर पछताता रह गया।", img: "sad embarrassed crow scratching head on branch moral learning" }
  ],

  // Thirsty Crow
  "Ek Kauwa Pyasa Tha": [
    { text: "तेज धूप और गर्मी में एक कौवा पानी की तलाश में उड़ रहा था।", img: "thirsty black crow flying tired under hot blazing golden sun" },
    { text: "चारों ओर दूर-दूर तक कहीं पानी नजर नहीं आ रहा था।", img: "dry sunny landscape with lonely tree and flying bird" },
    { text: "उसे एक बगीचे में एक मिट्टी का पुराना घड़ा दिखाई दिया।", img: "crow spotting an earthen terracotta pot in green garden" },
    { text: "कौवे ने घड़े में देखा, लेकिन पानी बहुत नीचे था।", img: "crow looking down inside tall narrow clay pot with low water level" },
    { text: "उसकी छोटी चोंच पानी तक नहीं पहुंच सकी।", img: "crow trying to reach water inside pot beak just touching air" },
    { text: "कौवे ने हिम्मत नहीं हारी और आसपास नजर दौड़ाई।", img: "smart crow noticing small pebbles lying on gravel garden path" },
    { text: "उसे जमीन पर छोटे-छोटे कंकड़ पड़े दिखाई दिए।", img: "pile of smooth colorful pebbles on grass close up cartoon" },
    { text: "कौवे ने अपनी चोंच से एक-एक कंकड़ उठाकर घड़े में डालना शुरू किया।", img: "crow dropping small stones into clay pot water level rising" },
    { text: "कंकड़ डालने से धीरे-धीरे पानी घड़े के मुंह तक आ गया!", img: "water reaching top rim of terracotta pitcher crystal clear" },
    { text: "कौवे ने तृप्त होकर जी भर के ठंडा पानी पिया और खुशी से उड़ गया!", img: "happy refreshed crow drinking water and flying joyfully into blue sky" }
  ]
};

// Intelligent dynamic scene prompt generator for ANY story line in ANY of the 50+ stories
export function getScenePromptForLine(storyTitle: string, lineText: string, lineIndex: number, totalLines: number): string {
  // Check explicit mapping first
  const cleanTitle = storyTitle.trim();
  for (const [key, scenes] of Object.entries(STORY_SCENES_MAPPING)) {
    if (cleanTitle.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(cleanTitle.toLowerCase())) {
      if (scenes[lineIndex]) {
        return scenes[lineIndex].img;
      }
      // If line index is higher, match by content or wrap
      const matched = scenes.find(s => lineText.includes(s.text.slice(0, 10)) || s.text.includes(lineText.slice(0, 10)));
      if (matched) return matched.img;
    }
  }

  // Semantic keyword-driven generator for any story
  const t = lineText.toLowerCase();

  if (t.includes('शेर') || t.includes('sher') || t.includes('lion')) {
    if (t.includes('सो') || t.includes('sleep') || t.includes('छांव')) {
      return "cute fluffy lion sleeping peacefully under lush green banyan tree warm sunlight ghibli style";
    }
    if (t.includes('दहाड़') || t.includes('roar') || t.includes('गुस्से') || t.includes('angry')) {
      return "cute cartoon lion roaring with wide open mouth standing on rock in jungle vibrant anime";
    }
    if (t.includes('जाल') || t.includes('फंसा') || t.includes('trapped')) {
      return "friendly cartoon lion trapped in hunter net calling for help in green forest";
    }
    return "majestic friendly cartoon king lion in colorful fairytale jungle ghibli style";
  }

  if (t.includes('चूहा') || t.includes('chuha') || t.includes('mouse')) {
    return "tiny adorable baby mouse running joyfully with sparkling eyes cute anime style";
  }

  if (t.includes('अकबर') || t.includes('बादशाह') || t.includes('बीरबल') || t.includes('दरबार') || t.includes('महल')) {
    return "grand royal indian mughal palace golden throne room emperor akbar and wise birbal kids cartoon 4k";
  }

  if (t.includes('खरगोश') || t.includes('rabbit')) {
    return "cute fluffy white bunny rabbit hopping happily on flower meadow bright anime ghibli";
  }

  if (t.includes('कछुआ') || t.includes('tortoise')) {
    return "cute friendly green tortoise with decorated shell walking determinedly on forest road cartoon";
  }

  if (t.includes('हाथी') || t.includes('elephant')) {
    return "gentle giant baby elephant spraying water with trunk in river sunny jungle cartoon";
  }

  if (t.includes('बंदर') || t.includes('monkey')) {
    return "naughty cute little monkey swinging from tree vines eating banana cartoon";
  }

  if (t.includes('कुत्ता') || t.includes('dog')) {
    return "playful cute puppy dog running in green village garden sunny day cartoon";
  }

  if (t.includes('लोमड़ी') || t.includes('fox')) {
    return "clever handsome orange fox with bushy tail smiling slyly in autumn forest cartoon";
  }

  if (t.includes('कौवा') || t.includes('crow') || t.includes('चिड़िया') || t.includes('bird')) {
    return "cute smart cartoon crow perched on tree branch drinking water under blue sky";
  }

  if (t.includes('पानी') || t.includes('नदी') || t.includes('river') || t.includes('तालाब')) {
    return "crystal clear sparkling river stream flowing through lush enchanted forest cartoon";
  }

  if (t.includes('सूरज') || t.includes('sun') || t.includes('चांद') || t.includes('आसमान') || t.includes('तारे')) {
    return "magical night sky with smiling glowing moon and thousands of twinkling colorful stars cartoon";
  }

  if (t.includes('किसान') || t.includes('kisan') || t.includes('खेत') || t.includes('गाँव')) {
    return "beautiful golden wheat field with peaceful indian village houses and smiling farmer cartoon";
  }

  if (t.includes('मित्र') || t.includes('दोस्त') || t.includes('hug') || t.includes('खुश')) {
    return "cute animal friends hugging and celebrating together with colorful confetti in forest cartoon";
  }

  // Fallback progression across story (Beginning, Middle, Climax, Resolution)
  const ratio = lineIndex / Math.max(1, totalLines);
  if (ratio < 0.25) {
    return `peaceful storybook beginning landscape with cute characters ${cleanTitle} colorful ghibli cartoon`;
  } else if (ratio < 0.6) {
    return `exciting adventurous fairy tale scene ${cleanTitle} rich colorful scenery kids ghibli art`;
  } else if (ratio < 0.85) {
    return `dramatic climax moment fairytale story scene ${cleanTitle} magical vibrant lighting cartoon`;
  } else {
    return `happy joyful moral ending celebration characters smiling together ${cleanTitle} sunset ghibli`;
  }
}

export function getStorySceneForLine(
  storyTitleOrId: string | number,
  lineText: string,
  lineIndex: number,
  totalLines: number = 15
): { prompt: string; imgUrl: string } {
  const title = String(storyTitleOrId || '');
  const prompt = getScenePromptForLine(title, lineText, lineIndex, totalLines);
  const encoded = encodeURIComponent(`${prompt}, vibrant kids ghibli cartoon, colorful, 4k`);
  return {
    prompt,
    imgUrl: `https://image.pollinations.ai/prompt/${encoded}`
  };
}
