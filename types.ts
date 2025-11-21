export interface TripRequest {
  destination: string;
  duration: number; // in days
  budget: 'Budget' | 'Mid-range' | 'Luxury';
  interest: 'Adventure' | 'Spiritual' | 'Relaxing' | 'Heritage' | 'Foodie' | 'Nature';
  travelers: string;
}

export interface Activity {
  time: string;
  activityName: string;
  description: string;
  location: string;
  estimatedCost: string;
  type: 'Food' | 'Sightseeing' | 'Travel' | 'Activity' | 'Relaxation';
}

export interface DayPlan {
  dayNumber: number;
  theme: string;
  activities: Activity[];
}

export interface TripItinerary {
  tripTitle: string;
  summary: string;
  days: DayPlan[];
  packingList: string[];
  culturalTips: string[];
  localFoodMustTry: string[];
}
