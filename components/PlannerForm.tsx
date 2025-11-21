import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icons } from './Icons';
import { TripRequest } from '../types';

interface PlannerFormProps {
  onSubmit: (data: TripRequest) => void;
  onBack: () => void;
}

export const PlannerForm: React.FC<PlannerFormProps> = ({ onSubmit, onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TripRequest>({
    destination: '',
    duration: 3,
    budget: 'Mid-range',
    interest: 'Heritage',
    travelers: 'Couple'
  });

  const handleChange = (field: keyof TripRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onSubmit(formData);
  };

  const isNextDisabled = () => {
    if (step === 1 && !formData.destination) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-india-saffron/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-india-green/10 rounded-full blur-3xl pointer-events-none"></div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden relative z-10"
        >
            <div className="h-2 bg-slate-100 w-full">
                <motion.div 
                    className="h-full bg-gradient-to-r from-india-saffron to-pink-600"
                    initial={{ width: '33%' }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.4 }}
                />
            </div>

            <div className="p-8 md:p-12">
                <button onClick={onBack} className="text-slate-400 hover:text-slate-600 mb-6 flex items-center gap-1 text-sm">
                    ← Back to Home
                </button>

                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="step1"
                    >
                        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Where to?</h2>
                        <p className="text-slate-500 mb-8">Enter a city, region, or state in India.</p>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Destination</label>
                                <div className="relative">
                                    <Icons.MapPin className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                                    <input 
                                        type="text"
                                        value={formData.destination}
                                        onChange={(e) => handleChange('destination', e.target.value)}
                                        placeholder="e.g., Jaipur, Goa, Kerala"
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-india-saffron focus:border-transparent outline-none transition-all text-lg"
                                        autoFocus
                                    />
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {['Ladakh', 'Varanasi', 'Udaipur', 'Goa'].map(place => (
                                        <button 
                                            key={place}
                                            onClick={() => handleChange('destination', place)}
                                            className="text-xs px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
                                        >
                                            {place}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="step2"
                    >
                        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Trip Details</h2>
                        <p className="text-slate-500 mb-8">How long and who with?</p>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Duration (Days)</label>
                                <div className="flex items-center gap-4">
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="15" 
                                        value={formData.duration} 
                                        onChange={(e) => handleChange('duration', parseInt(e.target.value))}
                                        className="w-full accent-india-saffron h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="text-2xl font-bold text-slate-800 w-12 text-center">{formData.duration}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Who is traveling?</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Solo', 'Couple', 'Family', 'Friends'].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => handleChange('travelers', t)}
                                            className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                                                formData.travelers === t 
                                                ? 'border-india-saffron bg-india-saffron/5 text-india-saffron font-semibold' 
                                                : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                            }`}
                                        >
                                            {t === 'Solo' && <Icons.Users className="w-4 h-4" />}
                                            {t === 'Couple' && <Icons.Users className="w-4 h-4" />}
                                            {t === 'Family' && <Icons.Users className="w-4 h-4" />}
                                            {t === 'Friends' && <Icons.Users className="w-4 h-4" />}
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="step3"
                    >
                        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Preferences</h2>
                        <p className="text-slate-500 mb-8">Set your style and budget.</p>
                        
                        <div className="space-y-6">
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Budget Level</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['Budget', 'Mid-range', 'Luxury'].map((b) => (
                                        <button
                                            key={b}
                                            onClick={() => handleChange('budget', b)}
                                            className={`py-3 px-2 rounded-xl border text-sm transition-all ${
                                                formData.budget === b 
                                                ? 'border-india-green bg-india-green/5 text-india-green font-semibold' 
                                                : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                            }`}
                                        >
                                            {b === 'Budget' && '₹ Economy'}
                                            {b === 'Mid-range' && '₹₹ Comfort'}
                                            {b === 'Luxury' && '₹₹₹ Lavish'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Primary Vibe</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {['Adventure', 'Spiritual', 'Relaxing', 'Heritage', 'Foodie', 'Nature'].map((i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleChange('interest', i)}
                                            className={`py-3 px-2 rounded-xl border text-sm transition-all flex flex-col items-center gap-1 ${
                                                formData.interest === i 
                                                ? 'border-india-blue bg-india-blue/5 text-india-blue font-semibold shadow-sm' 
                                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                        >
                                            {/* Minimal icons for vibe */}
                                            {i}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="mt-10 flex justify-end">
                    <button
                        onClick={handleNext}
                        disabled={isNextDisabled()}
                        className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                            isNextDisabled()
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl'
                        }`}
                    >
                        {step === 3 ? 'Generate Plan' : 'Next Step'}
                        {!isNextDisabled() && <Icons.CheckCircle className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </motion.div>
    </div>
  );
};
