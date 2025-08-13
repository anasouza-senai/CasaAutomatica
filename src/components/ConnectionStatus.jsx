import { useState, useEffect } from "react";
import { getClient } from "../mqtt";

function ConnectionStatus() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const client = getClient();
    const handleConnect = () => setConnected(true);
    const handleClose = () => setConnected(false);

    client.on("connect", handleConnect);
    client.on("close", handleClose);

    return () => {
      client.off("connect", handleConnect);
      client.off("close", handleClose);
    };
  }, []);

  return (
    <div className={`alert ${connected ? "alert-success" : "alert-danger"}`}>
      Conexão MQTT: {connected ? "✅ Conectado" : "❌ Desconectado"}
    </div>
  );
}

export default ConnectionStatus;
