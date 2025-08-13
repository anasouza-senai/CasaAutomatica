import { useEffect, useState } from "react";
import { getClient } from "../mqtt";

function SensorPanel() {
  const [temp, setTemp] = useState(null);
  const [hum, setHum] = useState(null);
  const mqttClient = getClient();

  useEffect(() => {
    mqttClient.subscribe("aninha/sala/temp");
    const handleMessage = (topic, message) => {
      if (topic === "aninha/sala/temp") {
        try {
          const data = JSON.parse(message.toString());
          setTemp(data.t);
          setHum(data.h);
        } catch (err) {
          console.error("Erro ao interpretar JSON:", err);
        }
      }
    };
    mqttClient.on("message", handleMessage);
    return () => mqttClient.removeListener("message", handleMessage);
  }, []);

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h5 className="card-title">🌡️ Sensores da Sala</h5>
      <p>Temperatura: <strong>{temp ?? "--"} °C</strong></p>
      <p>Umidade: <strong>{hum ?? "--"} %</strong></p>
    </div>
  );
}

export default SensorPanel;
