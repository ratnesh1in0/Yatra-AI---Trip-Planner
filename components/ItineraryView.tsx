import React from 'react';
import { TripItinerary, Activity } from '../types';
import { Icons } from './Icons';
import { motion } from 'framer-motion';

interface ItineraryViewProps {
  itinerary: TripItinerary;
  onReset: () => void;
}

const ActivityCard: React.FC<{ activity: Activity, index: number }> = ({ activity, index }) => {
    const getIcon = (type: string) => {
        switch(type) {
            case 'Food': return <Icons.Utensils className="w-4 h-4 text-orange-500" />;
            case 'Sightseeing': return <Icons.Camera className="w-4 h-4 text-blue-500" />;
            case 'Travel': return <Icons.Bus className="w-4 h-4 text-gray-500" />;
            case 'Relaxation': return <Icons.Sun className="w-4 h-4 text-yellow-500" />;
            default: return <Icons.MapPin className="w-4 h-4 text-green-500" />;
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 mb-6 relative group"
        >
             {/* Timeline Line */}
            <div className="absolute left-[19px] top-8 bottom-[-24px] w-0.5 bg-slate-200 group-last:hidden"></div>
            
            <div className="mt-1 flex-shrink-0 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                   {getIcon(activity.type)}
                </div>
            </div>
            
            <div className="flex-grow bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold tracking-wide text-slate-400 uppercase">{activity.time}</span>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{activity.estimatedCost}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-1">{activity.activityName}</h4>
                <p className="text-slate-600 text-sm mb-3 leading-relaxed">{activity.description}</p>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Icons.MapPin className="w-3 h-3" />
                    {activity.location}
                </div>
            </div>
        </motion.div>
    );
};

export const ItineraryView: React.FC<ItineraryViewProps> = ({ itinerary, onReset }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Image */}
      <div className="h-64 md:h-80 relative overflow-hidden">
        <img 
            src={`https://picsum.photos/seed/${itinerary.tripTitle.replace(/\s/g, '')}/1200/600`} 
            alt="Destination" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
            <div className="max-w-5xl mx-auto">
                <button onClick={onReset} className="text-sm text-white/80 hover:text-white mb-4 flex items-center gap-1">← Plan Another Trip</button>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">{itinerary.tripTitle}</h1>
                <p className="text-lg text-white/90 max-w-2xl">{itinerary.summary}</p>
            </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Itinerary Column */}
        <div className="lg:col-span-2 space-y-12">
            {itinerary.days.map((day, dayIndex) => (
                <div key={day.dayNumber} className="relative">
                    <div className="sticky top-4 z-20 bg-slate-50/95 backdrop-blur-sm py-2 mb-4 border-b border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                            <span className="bg-slate-900 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-serif">
                                {day.dayNumber}
                            </span>
                            {day.theme}
                        </h3>
                    </div>
                    <div>
                        {day.activities.map((activity, idx) => (
                            <ActivityCard key={idx} activity={activity} index={idx} />
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
            {/* Food Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Icons.Utensils className="w-5 h-5 text-india-saffron" /> Local Delicacies
                </h3>
                <ul className="space-y-2">
                    {itinerary.localFoodMustTry.map((food, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-india-saffron mt-1.5 flex-shrink-0"></span>
                            {food}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cultural Tips */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 shadow-sm border border-blue-100">
                <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                    <Icons.Info className="w-5 h-5 text-indigo-600" /> Cultural Tips
                </h3>
                <ul className="space-y-3">
                    {itinerary.culturalTips.map((tip, i) => (
                        <li key={i} className="text-sm text-indigo-800 italic">
                            "{tip}"
                        </li>
                    ))}
                </ul>
            </div>

            {/* Packing List */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Icons.Backpack className="w-5 h-5 text-slate-600" /> Packing Essentials
                </h3>
                <div className="flex flex-wrap gap-2">
                    {itinerary.packingList.map((item, i) => (
                        <span key={i} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>

      </div>

      <footer className="bg-slate-900 text-white py-8 mt-12 border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-4 text-center">
              <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
                Crafted with <span className="text-red-500 animate-pulse">❤️</span> by <span className="text-white font-bold">Ratnesh</span>
              </p>
              <p className="text-slate-600 text-xs mt-2">Powered by Gemini 2.5 Flash</p>
          </div>
      </footer>
    </div>
  );
};