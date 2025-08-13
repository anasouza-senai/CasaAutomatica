import { useEffect, useState } from "react";
import { getClient } from "../mqtt";

function UmidificadorSala() {
  const [status, setStatus] = useState("Desconhecido");
  const mqttClient = getClient();

  useEffect(() => {
    mqttClient.subscribe("aninha/sala/umidificador/status");

    const handleMessage = (topic, message) => {
      if (topic === "aninha/sala/umidificador/status") setStatus(message.toString());
    };

    mqttClient.on("message", handleMessage);
    return () => mqttClient.removeListener("message", handleMessage);
  }, []);

  const ligar = () => mqttClient.publish("aninha/sala/umidificador/set", "ON");
  const desligar = () => mqttClient.publish("aninha/sala/umidificador/set", "OFF");

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h5 className="card-title">💧 Umidificador da Sala</h5>
      <p>Status: <strong>{status}</strong></p>
      <div className="btn-group">
        <button className="btn btn-success" onClick={ligar}>Ligar</button>
        <button className="btn btn-danger" onClick={desligar}>Desligar</button>
      </div>
    </div>
  );
}

export default UmidificadorSala;
