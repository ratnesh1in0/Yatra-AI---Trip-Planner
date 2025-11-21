import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Loading = () => {
    const messages = [
        "Consulting the map...",
        "Brewing Chai...",
        "Asking the locals...",
        "Finding the best routes...",
        "Checking hotel availability...",
        "Adding a pinch of spice..."
    ];
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIndex(prev => (prev + 1) % messages.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="w-24 h-24 border-4 border-slate-200 border-t-india-saffron rounded-full mb-8"
            />
            <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2">Planning your Journey</h2>
            <motion.p 
                key={msgIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-slate-500 text-center min-h-[24px]"
            >
                {messages[msgIndex]}
            </motion.p>
        </div>
    );
};
