import React, { useState, useEffect } from 'react';
import { UserProfile, FeedPost } from '../types';
import { User, MapPin, Heart, UserPlus, Check, Send, Sparkles, BookOpen, LogIn } from 'lucide-react';

const INITIAL_POSTS: FeedPost[] = [
  {
    id: "post_1",
    uid: "teacher_1",
    name: "Dr. Alok Kumar (Maths Mentor)",
    dp: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    address: "Prayagraj, UP",
    text: "💡 NCERT Class 10th Math Tip: त्रिकोणमिति (Trigonometry) के sin²θ + cos²θ = 1 सूत्र से 80% आइडेंटिटी सवाल सीधे हल होते हैं। रोज़ 30 मिनट अभ्यास जरूर करें!",
    time: Date.now() - 1000 * 60 * 45,
    likes: 24,
    isLiked: false,
    isFollowing: false
  },
  {
    id: "post_2",
    uid: "student_2",
    name: "Sneha Reddy (UPSC Aspirant)",
    dp: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    address: "Hyderabad, Telangana",
    text: "🇮🇳 आधुनिक भारतीय इतिहास के 1857 से 1947 तक के महत्वपूर्ण वायसराय और उनके प्रमुख सुधारों का 1-पेज फ्लोचार्ट आज पूरा किया। निरंतरता ही सफलता की कुंजी है!",
    time: Date.now() - 1000 * 60 * 120,
    likes: 42,
    isLiked: false,
    isFollowing: true
  },
  {
    id: "post_3",
    uid: "parent_3",
    name: "Sunil Meena (Science Teacher)",
    dp: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    address: "Jaipur, Rajasthan",
    text: "🌈 Kidzee सेक्शन में 'पानी का चक्र' (Water cycle) और 'शेर और चूहा' कहानी बच्चों को प्रकृति और दयालुता सिखाने के लिए बहुत ही शानदार है।",
    time: Date.now() - 1000 * 60 * 360,
    likes: 19,
    isLiked: false,
    isFollowing: false
  }
];

export const EducationFeed: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('zq_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      name: "विद्यार्थी (Student)",
      bio: "NCERT & Competitive Exam Learner",
      address: "New Delhi, India",
      dp: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      followersCount: 12,
      followingCount: 5,
      isLoggedIn: true
    };
  });

  const [posts, setPosts] = useState<FeedPost[]>(() => {
    const saved = localStorage.getItem('zq_feed_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_POSTS;
  });

  const [newPostText, setNewPostText] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  useEffect(() => {
    localStorage.setItem('zq_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('zq_feed_posts', JSON.stringify(posts));
  }, [posts]);

  const handleLogin = () => {
    // Simulated smooth Google Gmail Sign-in
    setProfile(prev => ({
      ...prev,
      name: "Medizings Scholar",
      bio: "UPSC & Board Exam Preparation",
      address: "Delhi / Patna, India",
      dp: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      isLoggedIn: true
    }));
  };

  const handleSaveProfile = () => {
    setSaveSuccessMsg(true);
    setIsEditingProfile(false);
    setTimeout(() => setSaveSuccessMsg(false), 2500);
  };

  const handleCreatePost = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: FeedPost = {
      id: "post_" + Date.now(),
      uid: "user_me",
      name: profile.name,
      dp: profile.dp,
      address: profile.address,
      text: newPostText.trim(),
      time: Date.now(),
      likes: 0,
      isLiked: false,
      isFollowing: false
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: isLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
  };

  const toggleFollow = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const nextState = !p.isFollowing;
        setProfile(prev => ({
          ...prev,
          followingCount: nextState ? prev.followingCount + 1 : Math.max(0, prev.followingCount - 1)
        }));
        return { ...p, isFollowing: nextState };
      }
      return p;
    }));
  };

  return (
    <div className="m-3 bg-white rounded-3xl p-4 shadow-md border-2 border-blue-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-blue-100">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-blue-100 text-blue-700 rounded-xl">
            <BookOpen className="w-5 h-5" />
          </span>
          <div>
            <h2 className="font-extrabold text-sm sm:text-base text-blue-900 leading-tight">
              📚 Education Feed (अध्ययन समुदाय)
            </h2>
            <p className="text-[10px] text-slate-500">
              ज्ञान साझा करें, सहपाठियों से जुड़ें और फॉलो करें
            </p>
          </div>
        </div>

        {!profile.isLoggedIn ? (
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Gmail Login</span>
          </button>
        ) : (
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200"
          >
            {isEditingProfile ? "प्रोफ़ाइल देखें" : "✏️ प्रोफ़ाइल बदलें"}
          </button>
        )}
      </div>

      {/* Profile Card */}
      {profile.isLoggedIn && (
        <div className="mt-3 bg-gradient-to-r from-blue-50/70 to-indigo-50/50 p-3 rounded-2xl border border-blue-100">
          <div className="flex items-start gap-3">
            <img
              src={profile.dp}
              alt={profile.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              {isEditingProfile ? (
                <div className="space-y-1.5">
                  <input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="आपका नाम (Name)"
                    className="w-full border-b border-blue-300 bg-transparent text-xs font-bold text-slate-900 focus:outline-none pb-0.5"
                  />
                  <input
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="बायो (e.g. Class 10th / UPSC Aspirant)"
                    className="w-full border-b border-blue-200 bg-transparent text-[11px] text-slate-700 focus:outline-none pb-0.5"
                  />
                  <input
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    placeholder="शहर / पता (Address)"
                    className="w-full border-b border-blue-200 bg-transparent text-[11px] text-slate-700 focus:outline-none pb-0.5"
                  />
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs active:scale-95"
                    >
                      Save
                    </button>
                    {saveSuccessMsg && (
                      <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> सुरक्षित हो गया!
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 truncate">{profile.name}</h3>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                      सत्यापित विद्यार्थी
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 truncate mt-0.5">{profile.bio}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5" /> {profile.address}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-blue-100/80 flex items-center justify-between text-[11px] text-slate-600 font-semibold">
            <span id="fCnt">
              फॉलोअर्स: <b className="text-blue-800">{profile.followersCount}</b> &nbsp;|&nbsp; 
              फॉलोइंग: <b className="text-blue-800">{profile.followingCount}</b>
            </span>
            <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              ⚡ एक्टिव लर्नर
            </span>
          </div>
        </div>
      )}

      {/* Post Box */}
      <div className="mt-3">
        <textarea
          id="pText"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          placeholder="Education Feed Post - पढ़ाई से संबंधित कोई प्रश्न, फॉर्मूला या नोट्स साझा करें..."
          className="w-full border border-blue-200 rounded-2xl p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[56px] resize-none bg-slate-50/50"
        />
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex gap-1 overflow-x-auto text-[10px] text-blue-700 py-0.5">
            <span
              onClick={() => setNewPostText(prev => prev + " #NCERT ")}
              className="bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-full cursor-pointer border border-blue-200"
            >
              #NCERT
            </span>
            <span
              onClick={() => setNewPostText(prev => prev + " #MathsTrick ")}
              className="bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-full cursor-pointer border border-blue-200"
            >
              #MathsTrick
            </span>
            <span
              onClick={() => setNewPostText(prev => prev + " #UPSC ")}
              className="bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-full cursor-pointer border border-blue-200"
            >
              #UPSC
            </span>
          </div>

          <button
            onClick={() => handleCreatePost()}
            className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xs flex items-center gap-1 transition-transform shrink-0"
          >
            <Send className="w-3 h-3" /> Post
          </button>
        </div>
      </div>

      {/* Feed Stream */}
      <div id="feed" className="mt-3 space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
        {posts.map((p) => {
          const isMe = p.uid === "user_me";
          return (
            <div
              key={p.id}
              className="bg-slate-50/90 hover:bg-blue-50/40 p-2.5 rounded-2xl border border-slate-200 flex gap-2.5 transition-colors"
            >
              <img
                src={p.dp}
                alt={p.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="truncate">
                    <b className="text-xs text-slate-900 truncate block">{p.name}</b>
                    <span className="text-[9px] text-slate-500 flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5" /> {p.address}
                    </span>
                  </div>
                  {!isMe && (
                    <button
                      onClick={() => toggleFollow(p.id)}
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full h-fit flex items-center gap-1 transition-all ${
                        p.isFollowing
                          ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                      }`}
                    >
                      {p.isFollowing ? (
                        <>
                          <Check className="w-2.5 h-2.5" /> Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-2.5 h-2.5" /> Follow
                        </>
                      )}
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-slate-800 mt-1 leading-relaxed whitespace-pre-line">
                  {p.text}
                </p>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/60 text-[10px] text-slate-500">
                  <span>{new Date(p.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <button
                    onClick={() => toggleLike(p.id)}
                    className={`flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full transition-colors ${
                      p.isLiked ? "text-rose-600 bg-rose-50 font-bold" : "text-slate-500 hover:text-rose-500"
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${p.isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                    <span>{p.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
