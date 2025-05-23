"use client";

import React from 'react';

type WarehouseDescriptionProps = {
  itemName: string;
  description: string;
  units: number;
  supplier: string;
  supplierAddress: string;
  supplierPhone: string;
  imageSrc: string; 
};

export const WarehouseDescription = ({
  itemName,
  description,
  units,
  supplier,
  supplierAddress,
  supplierPhone,
  imageSrc,
}: WarehouseDescriptionProps) => {
  return (
    <div className="text-black rounded-2xl p-6 w-150 font-mono text-lg shadow-2xl">
      <div className="px-4 py-2 rounded-full text-center mb-4">
        <h2 className="font-bold font-lato text-4xl">{itemName}</h2>
      </div>

      <div className="flex justify-center mb-4">
        <img
            src={imageSrc || "/placeholder.png"}
            alt={`${itemName} icon`}
            className="w-24 h-24 object-contain rounded-md p-2"
          />
      </div>

      <p><span className="font-semibold font-lato text-2xl">Item Name:</span> “{itemName}”</p><br />
      <p><span className="font-semibold font-lato text-2xl">Description:</span> “{description}”</p><br />
      <p><span className="font-semibold font-lato text-2xl">Units:</span> {units.toLocaleString()}</p><br />
      <p><span className="font-semibold font-lato text-2xl">Supplier:</span> “{supplier}”</p><br />
      <p><span className="font-semibold font-lato text-2xl">Supplier Addr.:</span> “{supplierAddress}”</p><br />
      <p><span className="font-semibold font-lato text-2xl">Supplier #:</span> {supplierPhone}</p><br />
    </div>
  );
};
