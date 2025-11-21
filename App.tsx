import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { PlannerForm } from './components/PlannerForm';
import { Loading } from './components/Loading';
import { ItineraryView } from './components/ItineraryView';
import { TripRequest, TripItinerary } from './types';
import { generateTripItinerary } from './services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

enum View {
  HERO,
  FORM,
  LOADING,
  RESULT,
  ERROR
}

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.HERO);
  const [itinerary, setItinerary] = useState<TripItinerary | null>(null);

  const handleStart = () => setView(View.FORM);

  const handleFormSubmit = async (data: TripRequest) => {
    setView(View.LOADING);
    try {
      const result = await generateTripItinerary(data);
      setItinerary(result);
      setView(View.RESULT);
    } catch (error) {
      console.error(error);
      setView(View.ERROR); // In a real app, handle error gracefully
      alert("Failed to plan trip. Please try again."); // Simple fallback
      setView(View.FORM);
    }
  };

  const handleReset = () => {
    setItinerary(null);
    setView(View.HERO);
  };

  const handleBackToHero = () => {
    setView(View.HERO);
  }

  return (
    <div className="font-sans text-slate-900">
      <AnimatePresence mode="wait">
        {view === View.HERO && (
          <motion.div key="hero" exit={{ opacity: 0 }}>
            <Hero onStart={handleStart} />
          </motion.div>
        )}
        
        {view === View.FORM && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PlannerForm onSubmit={handleFormSubmit} onBack={handleBackToHero} />
          </motion.div>
        )}

        {view === View.LOADING && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Loading />
          </motion.div>
        )}

        {view === View.RESULT && itinerary && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ItineraryView itinerary={itinerary} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
