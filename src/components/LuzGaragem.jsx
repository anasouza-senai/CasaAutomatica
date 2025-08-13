import { useEffect, useState } from "react";
import { getClient } from "../mqtt";

function LuzGaragem() {
  const [status, setStatus] = useState("OFF");
  const mqttClient = getClient();

  useEffect(() => {
    mqttClient.subscribe("aninha/garagem/led/status");
    const handleMessage = (topic, message) => {
      if (topic === "aninha/garagem/led/status") setStatus(message.toString());
    };
    mqttClient.on("message", handleMessage);
    return () => mqttClient.removeListener("message", handleMessage);
  }, []);

  const ligar = () => mqttClient.publish("aninha/garagem/led/set", "ON");
  const desligar = () => mqttClient.publish("aninha/garagem/led/set", "OFF");

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h5 className="card-title">💡 Luz da Garagem</h5>
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

export default LuzGaragem;
