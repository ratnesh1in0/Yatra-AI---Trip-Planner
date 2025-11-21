import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TripRequest, TripItinerary } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const itinerarySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    tripTitle: { type: Type.STRING, description: "A catchy title for the trip" },
    summary: { type: Type.STRING, description: "A brief summary of what to expect" },
    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          dayNumber: { type: Type.INTEGER },
          theme: { type: Type.STRING, description: "Theme for the day, e.g., 'Historical Walk'" },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "e.g., '09:00 AM' or 'Morning'" },
                activityName: { type: Type.STRING },
                description: { type: Type.STRING },
                location: { type: Type.STRING },
                estimatedCost: { type: Type.STRING, description: "Cost estimate in INR" },
                type: { type: Type.STRING, enum: ['Food', 'Sightseeing', 'Travel', 'Activity', 'Relaxation'] }
              },
              required: ["time", "activityName", "description", "location", "type", "estimatedCost"]
            }
          }
        },
        required: ["dayNumber", "theme", "activities"]
      }
    },
    packingList: { type: Type.ARRAY, items: { type: Type.STRING } },
    culturalTips: { type: Type.ARRAY, items: { type: Type.STRING } },
    localFoodMustTry: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["tripTitle", "summary", "days", "packingList", "culturalTips", "localFoodMustTry"]
};

export const generateTripItinerary = async (request: TripRequest): Promise<TripItinerary> => {
  const modelId = "gemini-2.5-flash"; // Using structured output capable model
  
  const prompt = `
    Plan a detailed ${request.duration}-day trip to ${request.destination}, India.
    Budget Level: ${request.budget}.
    Traveler Group: ${request.travelers}.
    Primary Interest: ${request.interest}.
    
    Provide a day-by-day itinerary. Be specific about locations in ${request.destination}.
    Include a packing list relevant to the weather and culture.
    Include specific cultural tips for this region of India.
    Include must-try local food items.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
        systemInstruction: "You are an expert travel guide for India known for creating deeply culturally immersive and practical itineraries. You know hidden gems and logistic realities."
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as TripItinerary;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate itinerary. Please try again.");
  }
};
