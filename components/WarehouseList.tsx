"use client";
import React, { useState } from 'react';

type Item = {
  id: number;
  name: string;
  existencia: number;
};

type WarehouseListProps = {
  title: string;
  description?: string;
  items?: Item[];
  onItemClick: (id: number) => void;
};

export const WarehouseList = ({ title, description, items = [], onItemClick }: WarehouseListProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="rounded-2xl p-4 w-128 text-black">
      <h2 className="font-bold font-lato text-4xl mb-2">{title}</h2>
      {description && <p className="text-xl font-mono mb-4">{description}</p>}

      <ul className="font-mono text-2xl space-y-2">
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              onClick={() => {
                setSelected(i);
                onItemClick(item.id);
              }}
              className={`px-4 py-2 rounded-xl w-80 transition-all duration-200
                ${selected === i
                  ? 'bg-gray-400 shadow-inner'
                  : 'bg-gray-100 hover:bg-gray-300'}`}
            >
              {item.name} x {item.existencia.toLocaleString()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
