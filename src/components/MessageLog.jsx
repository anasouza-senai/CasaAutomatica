import React, { useState, useEffect } from "react";
import { getClient } from "../mqtt";

const MessageLog = () => {
  const [logs, setLogs] = useState([]);
  const mqttClient = getClient();

  useEffect(() => {
    const handleMessage = (topic, message) => {
      const newLog = `${topic}: ${message.toString()}`;
      setLogs(prev => {
        const updated = [...prev, newLog];
        return updated.length > 50 ? updated.slice(-50) : updated;
      });
    };
    mqttClient.on("message", handleMessage);
    return () => mqttClient.removeListener("message", handleMessage);
  }, []);

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h5 className="card-title">📋 Logs MQTT</h5>
      <button className="btn btn-outline-secondary mb-3" onClick={() => setLogs([])}>Limpar Logs</button>
      <ul className="list-group">
        {logs.map((log, i) => <li key={i} className="list-group-item">{log}</li>)}
      </ul>
    </div>
  );
};

export default MessageLog;
