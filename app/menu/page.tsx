"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import UserState from "@/components/UserState";
import { WarehouseCard } from "@/components/WarehouseCard";
import { Space_Mono } from "next/font/google";
import { useRouter } from "next/navigation";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const colorMap = [
  'rgb(93, 120, 219)',     // 1 Blue
  'rgb(235, 71, 71)',        // 2 Red
  'rgb(255, 204, 0)',      // 3 Yellow
  'rgb(153, 102, 51)',     // 4 Brown
  'rgb(0, 204, 255)',      // 5 Aqua
  'rgb(40, 167, 69)',      // 6 Green
  'rgb(255, 145, 68)',      // 7 Orange
  'rgb(111, 66, 193)',     // 8 Purple
  'rgb(255, 99, 132)',     // 9 Pink
  'rgb(108, 117, 125)',    // 10 Gray
];

export default function Menu() {
  const [userId, setUserId] = useState<number | null>(null);
  const [almacenes, setAlmacenes] = useState<any[]>([]);
  
  


  useEffect(() => {
    const id = parseInt(localStorage.getItem("id_usuario") || "0", 10);
    if (!id) {
      window.location.href = "/login";
    } else {
      setUserId(id);
      fetchAlmacenes(id);
    }
  }, []);

  const fetchAlmacenes = async (id: number) => {
    const res = await fetch(`/api/almacenes?id_usuario=${id}`);
    const data = await res.json();
    setAlmacenes(data);
  };

  if (!userId) return null; // Espera a tener el userId

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
              style={{
                color: "black",
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              &gt;WareSoftWare
            </h1>
            <UserState />
          </header>

          <div>
            <Sidebar />
            <section
              className="rounded-3xl m-6 p-6 pl-10"
              style={{ marginLeft: "120px" }}
            >
              <h2
                className="text-3xl font-bold font-lato bg-gray-300 rounded-full px-4 py-1 inline-block mb-4"
                style={{ color: "black", fontSize: 30 }}
              >
                Warehouses
              </h2>

              <div className="flex gap-4 flex-wrap">
                {almacenes.map((almacen, i) => (
                  <WarehouseCard
                    key={i}
                    id={almacen.id_almacen}
                    title={almacen.nombre}
                    color={colorMap[almacen.color - 1] || 'gray'}
                    items={almacen.productos || []}
                  />
                ))}
              </div>
               
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
