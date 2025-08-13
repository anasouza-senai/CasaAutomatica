import { useEffect, useState } from "react";
import { getClient } from "../mqtt";

function LuzSala() {
  const [status, setStatus] = useState("OFF");
  const mqttClient = getClient();

  useEffect(() => {
    mqttClient.subscribe("aninha/sala/light/status");
    const handleMessage = (topic, message) => {
      if (topic === "aninha/sala/light/status") setStatus(message.toString());
    };
    mqttClient.on("message", handleMessage);
    return () => mqttClient.removeListener("message", handleMessage);
  }, []);

  const ligar = () => mqttClient.publish("aninha/sala/light/set", "ON");
  const desligar = () => mqttClient.publish("aninha/sala/light/set", "OFF");

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h5 className="card-title">💡 Luz da Sala</h5>
      <p>
        Status: <strong>{status}</strong>
      </p>
      <div className="btn-group">
        <button className="btn btn-success" onClick={ligar}>
          Ligar
        </button>
        <button className="btn btn-danger" onClick={desligar}>
          Desligar
        </button>
      </div>
    </div>
  );
}

export default LuzSala;
