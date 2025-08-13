import React from "react";
import { getClient } from "../mqtt";

const CortinaQuarto = () => {
  const mqttClient = getClient();
  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h5 className="card-title">🪟 Cortina do Quarto</h5>
      <div className="btn-group">
        <button className="btn btn-primary" onClick={() => mqttClient.publish("aninha/quarto/cortina/set", "OPEN")}>Abrir</button>
        <button className="btn btn-secondary" onClick={() => mqttClient.publish("aninha/quarto/cortina/set", "CLOSE")}>Fechar</button>
      </div>
    </div>
  );
};

export default CortinaQuarto;
