"use client";

import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import { WarehouseList } from "@/components/WarehouseList";
import { WarehouseDescription } from "@/components/WarehouseDescription";
import { Space_Mono } from "next/font/google";
import UserState from "@/components/UserState";
import Link from "next/link";
import { useEffect, useState } from "react";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function WarehousePage() {
  const [almacenes, setAlmacenes] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  useEffect(() => {
    const fetchAlmacenes = async () => {
      try {
        const res = await fetch("/api/almacenes");
        if (!res.ok) throw new Error("Error al obtener almacenes");
        const data = await res.json();
        setAlmacenes(data);
      } catch (error) {
        console.error("Error al obtener almacenes:", error);
      }
    };

    fetchAlmacenes();
  }, []);

  const handleItemClick = async (id: number) => {
    try {
      const res = await fetch(`/api/almacenes/${id}`);
      if (!res.ok) throw new Error("No se pudo cargar el ítem");
      const data = await res.json();
      console.log("Almacén seleccionado:", data);
      setSelectedItem(data);
    } catch (error) {
      console.error("Error al obtener el ítem:", error);
    }
  };

  return (
    <>
      <Head>
        <title>WareSoftware</title>
      </Head>
      <main className="flex h-screen">
        <div className="flex-1 bg-white">
          <header className="flex justify-between items-center bg-gray-100 p-4">
            <h1
              className={spaceMono.className}
              style={{ color: "black", fontSize: 30, fontWeight: "bold" }}
            >
              &gt;WareSoftWare
            </h1>
            <UserState />
          </header>

          <div style={{ backgroundColor: "white" }}>
            <Sidebar />

            <section
              className="bg-[#4FE2F6] rounded-3xl m-6 p-6 pl-10"
              style={{ marginLeft: "120px" }}
            >
              <div className="flex gap-4">
                <WarehouseList
                  title="Almacén"
                  items={almacenes.map((a) => ({
                    id: a.id_almacen,
                    name: a.nombre,
                  }))}
                  onItemClick={handleItemClick}
                />

                {selectedItem && selectedItem.productos?.length > 0 && (
                  <WarehouseDescription
                    itemName={selectedItem.nombre}
                    description={selectedItem.descripcion}
                    units={selectedItem.productos.reduce((sum: number, p: any) => sum + p.existencia, 0)}
                    supplier={selectedItem.productos[0]?.proveedor?.nombre || "Desconocido"}
                    supplierAddress={selectedItem.productos[0]?.proveedor?.direccion || "-"}
                    supplierPhone={selectedItem.productos[0]?.proveedor?.telefono || "-"}
                    imageSrc={selectedItem.productos[0]?.imagen || "/Placeholder.png"}
                  />
                )}
              </div>
              <Link href="/menu">
                <img
                  src="/x.png"
                  alt="Cerrar"
                  className="w-10 h-10 cursor-pointer absolute top-35 right-16"
                />
              </Link>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
