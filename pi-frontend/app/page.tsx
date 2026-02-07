"use client";
import { useState } from "react";

export default function DroneGCS() {
  const [lightActive, setLightActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const sendCommand = async () => {
    setIsConnecting(true);
    const nextState = lightActive ? "off" : "on";
    
    try {
      // Logic: Connects to Go Backend
      const res = await fetch(`http://localhost:8080/toggle?state=${nextState}`);
      if (res.ok) setLightActive(!lightActive);
    } catch (err) {
      alert("Backend unreachable. Ensure the Go server is jrunning!");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-500 font-mono p-4">
      <div className="border-2 border-green-900 p-8 rounded-lg bg-gray-900 shadow-2xl w-full max-w-md">
        <h1 className="text-xl text-center mb-6 border-b border-green-900 pb-2">
          SYSTEM_CONTROL_v1.0
        </h1>

        <div className="flex flex-col items-center gap-6">
          {/* Status Indicator */}
          <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
            lightActive ? "bg-green-500/20 border-green-400 shadow-[0_0_30px_#4ade80]" : "bg-red-900/10 border-red-900"
          }`}>
            <span className={lightActive ? "text-green-400" : "text-red-900"}>
              {lightActive ? "GLOWING" : "STANDBY"}
            </span>
          </div>

          {/* Toggle Switch */}
          <button
            disabled={isConnecting}
            onClick={sendCommand}
            className={`px-8 py-3 rounded border-2 font-bold transition-all ${
              lightActive 
                ? "bg-green-500 text-black border-green-500 hover:bg-black hover:text-green-500" 
                : "bg-transparent border-green-900 hover:border-green-500"
            }`}
          >
            {isConnecting ? "SENDING..." : lightActive ? "CMD: DEACTIVATE" : "CMD: ACTIVATE"}
          </button>
        </div>

        <div className="mt-8 text-xs text-green-800">
          <p>{`> PIN_OUT: GPIO_18`}</p>
          <p>{`> PROTOCOL: HTTP/JSON`}</p>
          <p>{`> STATUS: ${lightActive ? "HARDWARE_ACTIVE" : "HARDWARE_IDLE"}`}</p>
        </div>
      </div>
    </div>
  );
}
