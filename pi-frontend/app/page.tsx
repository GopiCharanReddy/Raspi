"use client";
import { useState } from "react";

export default function PiControl() {
  const [isOn, setIsOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const targetState = isOn ? "off" : "on";
    
    try {
      // Connects to the Go server running on the same Pi
      await fetch(`http://localhost:8080/toggle?state=${targetState}`);
      setIsOn(!isOn);
    } catch (error) {
      console.error("Failed to reach Go backend:", error);
      alert("Is the Go server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-8">Drone Light Controller</h1>
      
      <div 
        onClick={!loading ? handleToggle : undefined}
        className={`w-24 h-12 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          isOn ? "bg-green-500" : "bg-gray-600"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className={`bg-white w-10 h-10 rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-12" : ""
        }`} />
      </div>

      <p className="mt-4 text-slate-400">
        Status: <span className={isOn ? "text-green-400" : "text-red-400"}>
          {isOn ? "GLOWING" : "OFF"}
        </span>
      </p>
    </main>
  );
}
