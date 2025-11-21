import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from './Icons';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 text-white">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-0" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4 flex justify-center">
            <span className="bg-india-saffron/90 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wider uppercase backdrop-blur-sm">
              Namaste India
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white drop-shadow-lg leading-tight">
            Discover the Soul of <span className="text-india-saffron">In</span>dia
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
            From the snow-capped Himalayas to the tropical backwaters of Kerala. 
            Let AI craft your perfect Indian journey tailored to your dreams.
          </p>
        
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 bg-white rounded-full overflow-hidden shadow-lg transition-all hover:bg-india-saffron hover:text-white ring-offset-2 ring-white"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className="relative flex items-center gap-2">
              Start Your Yatra <Icons.Compass className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Decorative Bottom Pattern */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 z-0 pointer-events-none"></div>
    </div>
  );
};
