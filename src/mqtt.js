import mqtt from "mqtt";

let client = null;

export function getClient() {
  if (client) return client;

  const brokerUrl = "ws://broker.hivemq.com:8000/mqtt";
  const options = {
    clientId: "dashboard_" + Math.random().toString(16).substr(2, 8),
    keepalive: 60,
    clean: true,
  };

  client = mqtt.connect(brokerUrl, options);

  client.on("connect", () => {
    console.log("✅ Conectado ao broker MQTT");
  });

  client.on("error", (err) => {
    console.error("❌ Erro na conexão MQTT:", err);
  });

  return client;
}
