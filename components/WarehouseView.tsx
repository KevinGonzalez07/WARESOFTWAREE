'use client';

import { WarehouseList } from "@/components/WarehouseList";
import { WarehouseDescription } from "@/components/WarehouseDescription";
import { useState } from "react";

type Producto = {
  id_producto: number;
  nombre: string;
  descripcion: string;
  existencia: number;
  imagen: string;
  proveedor: {
    nombre: string;
    direccion: string;
    telefono: string;
  } | null;
};

type Props = {
  nombreAlmacen: string;
  descripcionAlmacen: string;
  productos: Producto[];
};

export default function WarehouseView({ nombreAlmacen, descripcionAlmacen, productos }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = productos[selectedIndex];

  return (
    <section className="flex flex-row gap-6 p-6 ml-[120px]">
      <WarehouseList
        title={nombreAlmacen}
        description={descripcionAlmacen}
        items={productos.map((p) => ({
          id: p.id_producto,
          name: p.nombre,
          existencia: p.existencia
        }))}
        onItemClick={(id) => {
          const i = productos.findIndex((p) => p.id_producto === id);
          setSelectedIndex(i);
        }}
      />

      <WarehouseDescription
        itemName={selected?.nombre ?? "Sin nombre"}
        description={selected?.descripcion ?? "Sin descripción"}
        units={selected?.existencia ?? 0}
        supplier={selected?.proveedor?.nombre ?? "Sin proveedor"}
        supplierAddress={selected?.proveedor?.direccion ?? "No disponible"}
        supplierPhone={selected?.proveedor?.telefono ?? "No disponible"}
        imageSrc={selected?.imagen ?? "/placeholder.png"}
      />
    </section>
  );
}
