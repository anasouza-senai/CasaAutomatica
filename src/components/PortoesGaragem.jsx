import { useEffect, useState } from "react";
import { getClient } from "../mqtt";

function PortoesGaragem() {
  const [statusSocial, setStatusSocial] = useState("Desconhecido");
  const [statusBasc, setStatusBasc] = useState("Desconhecido");
  const mqttClient = getClient();

  useEffect(() => {
    mqttClient.subscribe("aninha/garagem/portao_social/status");
    mqttClient.subscribe("aninha/garagem/portao_basc/status");

    const handleMessage = (topic, message) => {
      const msg = message.toString();
      if (topic === "aninha/garagem/portao_social/status") setStatusSocial(msg);
      if (topic === "aninha/garagem/portao_basc/status") setStatusBasc(msg);
    };

    mqttClient.on("message", handleMessage);
    return () => mqttClient.removeListener("message", handleMessage);
  }, []);

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h5 className="card-title">🚪 Portões da Garagem</h5>

      <div className="mb-3">
        <p>Porta Social: <strong>{statusSocial}</strong></p>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => mqttClient.publish("aninha/garagem/portao_social/set", "OPEN")}>Abrir</button>
          <button className="btn btn-secondary" onClick={() => mqttClient.publish("aninha/garagem/portao_social/set", "CLOSE")}>Fechar</button>
        </div>
      </div>

      <div>
        <p>Porta Basculante: <strong>{statusBasc}</strong></p>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => mqttClient.publish("aninha/garagem/portao_basc/set", "OPEN")}>Abrir</button>
          <button className="btn btn-secondary" onClick={() => mqttClient.publish("aninha/garagem/portao_basc/set", "CLOSE")}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default PortoesGaragem;
