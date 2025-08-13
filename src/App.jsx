import React from "react";
import ConnectionStatus from "./components/ConnectionStatus";
import TomadaQuarto from "./components/TomadaQuarto";
import UmidificadorSala from "./components/UmidificadorSala";
import LuzQuarto from "./components/LuzQuarto";
import LuzSala from "./components/LuzSala";
import LuzGaragem from "./components/LuzGaragem";
import ArCondicionadoSala from "./components/ArCondicionadoSala";
import CortinaQuarto from "./components/CortinaQuarto";
import PortoesGaragem from "./components/PortoesGaragem";
import SensorPanel from "./components/SensorPanel";
import MessageLog from "./components/MessageLog";
import "./App.css";

function App() {
  return (
    <div className="container my-4">
      <ConnectionStatus />

      {/* === Sensor separado no topo === */}
      <div className="cômodo-card sensor-card">
        <h4>🌡️ Sensores da Sala</h4>
        <SensorPanel />
      </div>

      {/* === Cards dos cômodos em uma "linha flexível" === */}
      <div className="cards-row">
        {/* Sala */}
        <div className="cômodo-card sala">
          <h4>🛋 Sala</h4>
          <ArCondicionadoSala />
          <LuzSala />
          <UmidificadorSala />
        </div>

        {/* Quarto */}
        <div className="cômodo-card quarto">
          <h4>🛏 Quarto</h4>
          <LuzQuarto />
          <CortinaQuarto />
          <TomadaQuarto />
        </div>

        {/* Garagem */}
        <div className="cômodo-card garagem">
          <h4>🚗 Garagem</h4>
          <LuzGaragem />
          <PortoesGaragem />
        </div>
      </div>

      {/* === Logs === */}
      <MessageLog />
    </div>
  );
}

export default App;
