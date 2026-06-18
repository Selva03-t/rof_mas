import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { Heart, Play, Pause, Sparkles, Gem, Camera, MapPin, Stars, MoveRight } from "lucide-react";
import confetti from "canvas-confetti";

// --- Background Particles Animation ---
const FloatingParticles = () => {
  const [particles, setParticles] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 20,
      size: 4 + Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-[-10%] bg-rose-300 rounded-full blur-[2px]"
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          initial={{ y: "0vh", x: 0, opacity: 0 }}
          animate={{
            y: "-120vh",
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [0, 0.6, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

// --- Section 1: Hero ---
const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      <motion.div 
        className="absolute inset-0 z-0 opacity-60"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <img 
          src="https://images.unsplash.com/photo-1519750783826-e2420f4d687f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGJva2VoJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3ODE3NjgwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Romantic Bokeh" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/40 via-black/60 to-black"></div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
          className="mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]"
          >
            <Heart size={72} fill="currentColor" />
          </motion.div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif italic tracking-tight mb-6 drop-shadow-lg"
        >
          My Beautiful Girl...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="text-xl md:text-3xl text-rose-200 max-w-2xl mb-16 font-light drop-shadow-md"
        >
          I made this just for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 4 }}
          className="flex flex-col items-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-rose-400 mb-6 font-bold">Begin Our Journey</p>
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-24 bg-gradient-to-b from-rose-500 via-rose-300 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

// --- Section 2: Timeline of Us ---
const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const milestones = [
    { year: "The Beginning", title: "When Our Eyes Met", desc: "The universe stopped for a second." },
    { year: "The Middle", title: "Falling Deeply", desc: "Late night calls and endless laughter." },
    { year: "The Present", title: "Inseparable", desc: "Two souls perfectly intertwined." }
  ];

  return (
    <section className="py-32 bg-black text-white relative z-10" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <MapPin className="mx-auto text-rose-500 mb-4" size={32} />
          <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-4">How We Got Here</h2>
          <p className="text-rose-300/60 max-w-xl mx-auto">Every step led me straight to you.</p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-900 via-rose-500 to-rose-900 transform md:-translate-x-1/2"></div>

          <div className="space-y-20 relative z-10">
            {milestones.map((milestone, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: i * 0.3 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-1/2"></div>
                
                {/* Glowing Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-rose-500 transform -translate-x-1/2 md:translate-x-[-50%] shadow-[0_0_20px_rgba(244,63,94,1)]"></div>

                <div className={`md:w-1/2 flex flex-col pl-12 md:pl-0 ${i % 2 === 0 ? 'md:items-end md:text-right md:pr-12' : 'md:items-start md:text-left md:pl-12'}`}>
                  <div className="bg-zinc-900/50 backdrop-blur-sm border border-rose-500/20 p-8 rounded-3xl hover:bg-zinc-900 hover:border-rose-500/50 transition-all w-full group">
                    <span className="text-rose-500 font-bold tracking-widest uppercase text-sm mb-2 block group-hover:text-rose-400">{milestone.year}</span>
                    <h3 className="text-2xl font-serif italic mb-3">{milestone.title}</h3>
                    <p className="text-zinc-400">{milestone.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 3: Polaroid Gallery ---
const Polaroids = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const photos = [
    { src: "https://images.unsplash.com/photo-1651005985573-cfbd0da9e01e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMGh1Z2dpbmclMjBzdW5zZXR8ZW58MXx8fHwxNzgxNzY4MDM0fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "Safe in my arms", rot: "-rotate-6" },
    { src: "https://images.unsplash.com/photo-1501901609772-df0848060b33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMGxhdWdoaW5nfGVufDF8fHx8MTc4MTc2ODAzOXww&ixlib=rb-4.1.0&q=80&w=1080", caption: "Your laugh is magic", rot: "rotate-3" },
    { src: "https://images.unsplash.com/photo-1495345679747-53991aedf9c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB3YWxraW5nJTIwaG9sZGluZyUyMGhhbmRzfGVufDF8fHx8MTc4MTc2ODAzOXww&ixlib=rb-4.1.0&q=80&w=1080", caption: "Walking together forever", rot: "-rotate-2" },
  ];

  return (
    <section className="py-32 bg-stone-100 relative z-10 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Camera className="mx-auto text-stone-400 mb-4" size={32} />
          <h2 className="text-4xl md:text-5xl font-serif italic text-stone-800 mb-4">Moments I Cherish</h2>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8 flex-wrap max-w-6xl mx-auto">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 50, rotate: 0 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0, rotate: photo.rot } : { opacity: 0, scale: 0.8, y: 50, rotate: 0 }}
              whileHover={{ scale: 1.1, rotate: "0deg", zIndex: 30, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white p-4 pb-12 shadow-xl rounded-sm border border-stone-200 w-72 md:w-80 relative z-10 transition-transform origin-center"
            >
              <div className="aspect-square bg-stone-100 mb-6 overflow-hidden rounded-sm">
                <img src={photo.src} alt="Us" className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500" />
              </div>
              <p className="text-center text-stone-600 font-mono text-sm handwriting-font">{photo.caption}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Section 4: 6 Flowers & Personality ---
const FlowersPersonality = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const flowers = [
    { name: "Rose", img: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjByZWQlMjByb3NlJTIwZmxvd2VyfGVufDF8fHx8MTc4MTc2NzY1NXww&ixlib=rb-4.1.0&q=80&w=1080", trait: "Passionate", desc: "Your heart loves deeply, fiercely, and unconditionally." },
    { name: "Sunflower", img: "https://images.unsplash.com/photo-1540039906769-84cf3d448bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBzdW5mbG93ZXIlMjBmaWVsZHxlbnwxfHx8fDE3ODE3Njc2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080", trait: "Radiant", desc: "You bring pure sunshine and warmth to everyone around you." },
    { name: "Tulip", img: "https://images.unsplash.com/photo-1520763185298-1b434c919102?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwdHVsaXAlMjBmbG93ZXJ8ZW58MXx8fHwxNzgxNzY3NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080", trait: "Graceful", desc: "There is a natural elegance in everything you do." },
    { name: "Lily", img: "https://images.unsplash.com/photo-1486102515046-44130769cb25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGxpbHklMjBmbG93ZXJ8ZW58MXx8fHwxNzgxNzY3NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080", trait: "Pure", desc: "Your intentions and kindness are incredibly genuine and sweet." },
    { name: "Daisy", img: "https://images.unsplash.com/photo-1695897706183-5295269554b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGRhaXN5JTIwZmxvd2VyfGVufDF8fHx8MTc4MTYxMjYxMHww&ixlib=rb-4.1.0&q=80&w=1080", trait: "Cheerful", desc: "Your joy and laughter give life to my world." },
    { name: "Orchid", img: "https://images.unsplash.com/photo-1605996370592-b6f7a81e382e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBvcmNoaWQlMjBmbG93ZXJ8ZW58MXx8fHwxNzgxNzY3NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080", trait: "Unique", desc: "Rare, breathtakingly beautiful, and utterly one of a kind." },
  ];

  return (
    <section className="py-32 bg-[#fffcfb] relative z-10" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Sparkles className="mx-auto text-rose-400 mb-4" size={32} />
          <h2 className="text-4xl md:text-5xl font-serif italic text-rose-950 mb-4">The Garden of You</h2>
          <p className="text-rose-600/70 max-w-2xl mx-auto">Hover over the flowers to see the many beautiful pieces that make up your personality.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {flowers.map((flower, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative h-[420px] w-full rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <img src={flower.img} alt={flower.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90" />
              
              <div className="absolute bottom-8 left-8 right-8 text-left transform transition-transform duration-500 group-hover:-translate-y-6">
                <h3 className="text-3xl font-serif text-white mb-1">{flower.name}</h3>
                <p className="text-rose-300 uppercase tracking-widest text-xs font-bold opacity-100 group-hover:opacity-0 transition-opacity duration-300">{flower.trait}</p>
              </div>

              <div className="absolute inset-0 bg-rose-950/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-8 text-center border-2 border-rose-400/30 rounded-3xl">
                <Heart className="text-rose-400 mb-4" size={32} fill="currentColor" />
                <h4 className="text-3xl font-serif italic text-white mb-4">{flower.trait}</h4>
                <p className="text-rose-200 leading-relaxed font-light text-lg">{flower.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Section 5: The Love Letter & Song ---
const LoveLetter = () => {
  const ref = useRef(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const songUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"; 

  const toggleLetter = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section className="py-40 bg-gradient-to-br from-rose-50 to-orange-50 relative z-10 overflow-hidden" ref={ref}>
      <audio ref={audioRef} src={songUrl} loop />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif italic text-rose-950 mb-4">A Letter For You</h2>
          <p className="text-rose-700/80 text-lg">Tap the envelope to read and listen.</p>
        </motion.div>

        <div className="relative w-full max-w-3xl min-h-[600px] flex items-center justify-center perspective-1000">
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                key="envelope"
                exit={{ y: -50, rotateX: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8 }}
                onClick={toggleLetter}
                className="cursor-pointer group flex flex-col items-center relative z-20"
              >
                <div className="w-80 h-56 bg-[#fdfaf6] rounded-xl shadow-2xl relative overflow-hidden border border-rose-100 flex items-center justify-center transform transition-transform hover:scale-105">
                  <div className="absolute top-0 w-full h-[55%] bg-[#faede6] shadow-sm transform -skew-y-[15deg] origin-top-left -translate-y-2 z-10 border-b border-rose-200/50"></div>
                  <div className="absolute top-0 w-full h-[55%] bg-[#f5e1d9] shadow-sm transform skew-y-[15deg] origin-top-right -translate-y-2 z-0 border-b border-rose-200/50"></div>
                  
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 0px rgba(244,63,94,0)", "0 0 20px rgba(244,63,94,0.4)", "0 0 0px rgba(244,63,94,0)"] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="z-30 mt-12 bg-rose-500 text-white p-4 rounded-full shadow-xl"
                  >
                    <Heart size={32} fill="currentColor" />
                  </motion.div>
                </div>
                <p className="mt-8 text-rose-600 font-bold tracking-[0.2em] uppercase group-hover:text-rose-500 transition-colors animate-pulse">Tap to Open</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="letter"
                initial={{ opacity: 0, scale: 0.9, y: 100, rotateX: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.3 }}
                className="w-full bg-[#fffff8] p-10 md:p-16 rounded-xl shadow-2xl relative z-10 border border-stone-200 max-w-3xl mx-auto"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}
              >
                <div className="absolute -top-6 -right-6 z-20">
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleLetter(); }}
                    className="w-14 h-14 rounded-full bg-rose-500 text-white shadow-xl flex items-center justify-center hover:bg-rose-600 transition-transform hover:scale-110"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                  </button>
                </div>

                <div className="prose prose-rose font-serif text-xl md:text-2xl leading-relaxed text-stone-800">
                  <p className="text-3xl text-rose-500 italic mb-8">My Love,</p>
                  <p>
                    From the very moment you walked into my life, everything changed. Suddenly, the colors were brighter, the music sounded sweeter, and my heart felt entirely full.
                  </p>
                  <p className="mt-6">
                    I cherish every memory we've made, every laugh we've shared, and every silent moment where just holding your hand was enough to make me the happiest person in the world. You are my dream come true.
                  </p>
                  <p className="mt-6">
                    As you read this, listening to our favorite melody, I want you to know that my love for you grows deeper with every passing second. You are my today, my tomorrow, and my forever.
                  </p>
                  <div className="mt-12 text-right">
                    <p className="italic text-rose-500 text-3xl">Forever Yours,</p>
                    <p className="font-bold text-lg mt-2 uppercase tracking-widest text-stone-400">Me</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// --- Section 6: The Virtual Ring Fitting (UPGRADED) ---
const VirtualRing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [countdown, setCountdown] = useState(5);

  const startScan = () => {
    if (scanState === 'idle') {
      setScanState('scanning');
      setCountdown(5);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (scanState === 'scanning') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      } else {
        setScanState('complete');
      }
    }
    return () => clearTimeout(timer);
  }, [scanState, countdown]);

  return (
    <section className="py-40 bg-zinc-950 text-white relative overflow-hidden z-10" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif italic mb-6">Let's try something on...</h2>
          <p className="text-zinc-400 text-lg md:text-xl">Place your left hand on the screen when you're ready.</p>
        </motion.div>

        <div className="relative w-full max-w-lg h-[500px] flex items-center justify-center border border-white/10 rounded-[3rem] bg-zinc-900/40 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
          
          <AnimatePresence mode="wait">
            {scanState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                onClick={startScan}
              >
                <motion.div 
                  animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0px rgba(99,102,241,0)", "0 0 40px rgba(99,102,241,0.4)", "0 0 0px rgba(99,102,241,0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-40 h-40 rounded-full border-2 border-dashed border-indigo-500/50 flex flex-col items-center justify-center mb-8"
                >
                  <MoveRight size={32} className="text-indigo-400 mb-2 rotate-90" />
                  <span className="text-indigo-300 font-bold uppercase tracking-widest text-xs">Tap to Scan</span>
                </motion.div>
                <p className="text-zinc-500 text-sm">Click here to begin the fitting</p>
              </motion.div>
            )}

            {scanState === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center w-full h-full relative"
              >
                {/* Radar/Scanner Line */}
                <motion.div 
                  animate={{ y: ["-100%", "300%", "-100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,1)] z-20"
                />
                <h3 className="text-6xl font-serif italic text-indigo-400 mb-4 animate-pulse">{countdown}</h3>
                <p className="text-indigo-200/70 tracking-widest uppercase text-sm">Hold your hand still...</p>
              </motion.div>
            )}

            {scanState === 'complete' && (
              <motion.div
                key="complete"
                className="relative w-full h-full flex flex-col items-center justify-center"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50 z-0"></div>

                <motion.div
                  initial={{ y: -300, opacity: 0, scale: 2, rotateX: 45 }}
                  animate={{ y: -10, opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ type: "spring", bounce: 0.5, duration: 2.5 }}
                  className="relative z-20 mt-12 flex flex-col items-center"
                >
                  {/* High Quality CSS Ring */}
                  <div className="relative">
                    {/* The Diamond */}
                    <motion.div 
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20 flex justify-center"
                    >
                      {/* Diamond Glow */}
                      <div className="absolute inset-0 bg-cyan-200 blur-xl w-24 h-24 -translate-x-1/2 -translate-y-1/2 opacity-60 rounded-full"></div>
                      <Gem size={72} strokeWidth={1} className="text-cyan-100 drop-shadow-[0_0_10px_rgba(255,255,255,1)] relative z-10" />
                      {/* Sparkles */}
                      <motion.div animate={{ rotate: 180, scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-4 -right-6 text-white"><Sparkles size={24} /></motion.div>
                      <motion.div animate={{ rotate: -180, scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} className="absolute top-4 -left-8 text-white"><Sparkles size={16} /></motion.div>
                    </motion.div>
                    
                    {/* The Gold Band */}
                    <div className="w-32 h-16 border-[8px] border-amber-300 rounded-[100px] shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_-5px_10px_rgba(0,0,0,0.4)] bg-gradient-to-b from-transparent to-amber-900/30 relative z-10">
                      {/* Reflection on band */}
                      <div className="absolute top-0 left-4 w-4 h-full bg-white/40 blur-[2px] skew-x-12"></div>
                    </div>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 1 }}
                  className="absolute bottom-16 text-3xl font-serif italic text-white drop-shadow-lg"
                >
                  It's a perfect fit.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// --- Section 7: Future Promises ---
const FuturePromises = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const promises = [
    "I promise to always make you laugh, even when you're mad at me.",
    "I promise to hold your hand through every storm.",
    "I promise to look at you the same way I did the very first time."
  ];

  return (
    <section className="py-32 bg-rose-50 text-rose-950 relative z-10 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Stars className="mx-auto text-rose-400 mb-6" size={40} />
          <h2 className="text-4xl md:text-5xl font-serif italic mb-4">My Promises to You</h2>
        </motion.div>

        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {promises.map((promise, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.8, delay: i * 0.3 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-rose-100"
            >
              <p className="text-2xl md:text-3xl font-serif italic text-rose-800">"{promise}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Section 8: The Big Ask ---
const TheAsk = () => {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleNoHover = () => {
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 300 - 150;
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleYes = () => {
    setAccepted(true);
    
    const duration = 8000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 10,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#ffffff', '#ffd700']
      });
      confetti({
        particleCount: 10,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#ffffff', '#ffd700']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-20" ref={ref}>
      <motion.div 
        className="absolute inset-0 z-0 bg-black"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <img 
          src="https://images.unsplash.com/photo-1628498188904-036f5e25e93e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMHNreSUyMHN0YXJzJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3ODE3NjgwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Night Sky Stars" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 via-transparent to-black"></div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart className="mx-auto text-rose-500 mb-10 drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]" size={80} fill="currentColor" />
              </motion.div>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif italic text-white mb-16 drop-shadow-2xl tracking-tight leading-none">
                Will you <br/> marry me?
              </h2>

              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center h-40 relative max-w-2xl mx-auto mt-12">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleYes}
                  className="bg-rose-500 text-white px-16 py-6 rounded-full font-bold text-3xl hover:bg-rose-400 transition-colors shadow-[0_0_60px_rgba(244,63,94,1)] w-64 relative z-20 tracking-wider"
                >
                  YES! ❤️
                </motion.button>
                
                <motion.button
                  animate={noPosition}
                  onMouseEnter={handleNoHover}
                  onClick={handleNoHover}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="bg-white/10 backdrop-blur-md text-white/90 border border-white/30 px-16 py-6 rounded-full font-bold text-3xl w-64 absolute sm:relative z-10"
                >
                  No 😢
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-10"
              >
                <Gem className="text-cyan-300 drop-shadow-[0_0_40px_rgba(34,211,238,1)]" size={120} />
              </motion.div>
              <h2 className="text-6xl md:text-8xl font-serif italic text-white mb-8 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
                She said YES!
              </h2>
              <p className="text-3xl md:text-4xl text-rose-200 font-serif italic max-w-2xl mx-auto leading-relaxed">
                I can't wait to spend forever with you. ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// --- Main App ---
export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-rose-300/50">
      <FloatingParticles />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-600 origin-left z-50 shadow-[0_0_15px_rgba(244,63,94,0.8)]"
        style={{ scaleX }}
      />
      <Hero />
      <Timeline />
      <Polaroids />
      <FlowersPersonality />
      <LoveLetter />
      <VirtualRing />
      <FuturePromises />
      <TheAsk />
    </div>
  );
}
