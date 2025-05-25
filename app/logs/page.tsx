import Sidebar from "@/components/Sidebar";
import { WarehouseLogs } from "@/components/WarehouseLogs";
import { Space_Mono } from "next/font/google";
import UserState from "@/components/UserState";
import Link from "next/link";

const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"] });

export const dynamic = "force-dynamic"; // para que no lo cache Vercel

async function getLogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Error al cargar logs");
    return [];
  }

  return res.json();
}

export default async function LogsPage() {
  const logs = await getLogs();

  // Agrupar logs por almacén
  const logsPorAlmacen: {
    [key: string]: {
      title: string;
      color: string;
      logs: { date: string; entries: { time: string; action: string }[] }[];
    };
  } = {};

  for (const log of logs) {
    const almacen = log.almacen?.nombre || "Sin nombre";
    const color = `#${(Math.random() * 0xffffff).toString(16).slice(0, 6)}`;
    const fecha = new Date(log.fecha_hora).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "2-digit",
    });

    const hora = new Date(log.fecha_hora).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    if (!logsPorAlmacen[almacen]) {
      logsPorAlmacen[almacen] = {
        title: almacen,
        color,
        logs: [],
      };
    }

    const existingDateLog = logsPorAlmacen[almacen].logs.find(l => l.date === fecha);
    if (existingDateLog) {
      existingDateLog.entries.push({ time: hora, action: log.accion });
    } else {
      logsPorAlmacen[almacen].logs.push({
        date: fecha,
        entries: [{ time: hora, action: log.accion }],
      });
    }
  }

  return (
    <main className="h-screen">
      <div className="flex-1 bg-white h-screen">
        <header className="flex justify-between items-center bg-gray-100 p-4">
          <h1
            className={spaceMono.className}
            style={{ color: "black", fontSize: 30, fontWeight: "bold" }}
          >
            &gt;WareSoftWare
          </h1>
          <UserState />
        </header>

        <div className="flex">
          <Sidebar />

          <section className="rounded-3xl m-6 p-6 pl-10 w-full" style={{ marginLeft: "120px" }}>
            <h2 className="text-3xl font-bold font-lato bg-gray-300 rounded-full px-4 py-1 inline-block mb-4" style={{ color: "black", fontSize: 30, fontWeight: "bold" }}>
              Logs
            </h2>

            <div className="rounded-full h-12 w-12 top-30 right-20 absolute cursor-pointer">
              <Link href="/menu">
                <img src="/Regresar.png" alt="user" />
              </Link>
            </div>

            <div className="flex gap-4 flex-wrap">
              {Object.values(logsPorAlmacen).map(({ title, color, logs }) => (
                <WarehouseLogs key={title} title={title} color={color} logs={logs} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
