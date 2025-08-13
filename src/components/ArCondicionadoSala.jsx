import React, { useState, useEffect } from "react";
import { getClient } from "../mqtt";

const ArCondicionadoSala = () => {
  const [status, setStatus] = useState("OFF");
  const mqttClient = getClient();

  useEffect(() => {
    mqttClient.subscribe("aninha/sala/ar/status");
    const handleMessage = (topic, message) => {
      if (topic === "aninha/sala/ar/status") setStatus(message.toString());
    };
    mqttClient.on("message", handleMessage);
    return () => mqttClient.removeListener("message", handleMessage);
  }, []);

  const toggleManual = () => {
    const newStatus = status === "ON" ? "OFF" : "ON";
    mqttClient.publish("aninha/sala/ar/set", newStatus);
  };

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h5 className="card-title">❄️ Ar-Condicionado da Sala</h5>
      <p>
        Status atual: <strong>{status}</strong>
      </p>
      <button
        className={`btn ${status === "ON" ? "btn-danger" : "btn-primary"}`}
        onClick={toggleManual}
      >
        {status === "ON" ? "Desligar manualmente" : "Ligar manualmente"}
      </button>
    </div>
  );
};

export default ArCondicionadoSala;
