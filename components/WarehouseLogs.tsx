"use client";
import React from "react";

type LogEntry = {
  time: string;
  action: string;
};

type LogGroup = {
  date: string;
  entries: LogEntry[];
};

type WarehouseLogsProps = {
  title: string;
  color: string;
  logs: LogGroup[];
};

export const WarehouseLogs = ({ title, logs, color }: WarehouseLogsProps) => {
  return (
    <div className="rounded-2xl p-4 w-120 text-black"style={{ backgroundColor: color }}>
      <div className=" rounded-xl px-6 py-2 text-center mb-6">
        <h2 className="text-3xl font-bold font-lato">{title}</h2>
      </div>
      <ul className="font-mono text-lg space-y-6">
        {logs.map((log, i) => (
          <li key={i}>
            <p className="font-bold mb-2">{log.date}</p>
            <ul className="space-y-1 ml-4">
              {log.entries.map((entry, j) => (
                <li key={j}>
                  {entry.time} - {entry.action}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
