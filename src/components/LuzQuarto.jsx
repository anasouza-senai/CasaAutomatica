import React, { useState, useEffect } from "react";
import { getClient } from "../mqtt";

const LuzQuarto = () => {
  const [status, setStatus] = useState("OFF");
  const mqttClient = getClient();

  useEffect(() => {
    mqttClient.subscribe("aninha/quarto/light/status");
    const handleMessage = (topic, message) => {
      if (topic === "aninha/quarto/light/status") setStatus(message.toString());
    };
    mqttClient.on("message", handleMessage);
    return () => mqttClient.removeListener("message", handleMessage);
  }, []);

  const toggleLight = () => {
    mqttClient.publish("aninha/quarto/light/set", status === "ON" ? "OFF" : "ON");
  };

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h5 className="card-title">💡 Luz do Quarto</h5>
      <p>Status atual: <strong>{status}</strong></p>
      <button
        className={`btn ${status === "ON" ? "btn-danger" : "btn-success"}`}
        onClick={toggleLight}
      >
        {status === "ON" ? "Desligar" : "Ligar"}
      </button>
    </div>
  );
};

export default LuzQuarto;
