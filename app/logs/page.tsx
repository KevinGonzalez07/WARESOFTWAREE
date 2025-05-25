import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import { WarehouseLogs } from "@/components/WarehouseLogs";
import { Space_Mono } from "next/font/google";
import UserState from "@/components/UserState";
import Link from "next/link";


const spaceMono = Space_Mono({
  weight: ["400", "700"], // o solo "400" si quieres solo regular
  subsets: ["latin"],
});

export default function logs() {
  return (
    <>
      <Head>
        <title>WareSoftware</title>
      </Head>
      <main className="h-screen">
        
        
        <div className="flex-1 bg-white h-screen">
          {/* Header */}
          <header className="flex justify-between items-center bg-gray-100 p-4">
            <h1 className={spaceMono.className} style={{color:"black", fontSize: 30, fontWeight: "bold"}}>
              &gt;WareSoftWare
              </h1>
            <UserState/>
          </header>
          
          <div style={{backgroundColor: "white"}}>
            <div style={{}}><Sidebar /></div>

          <div>
            {/* Warehouses section */}
            <section className=" rounded-3xl m-6 p-6 pl-10 " style={{marginLeft: "120px", backgroundRepeat: "repeat-y"}}>
            <h2 className="text-3xl font-bold font-lato bg-gray-300 rounded-full px-4 py-1 inline-block mb-4" style={{color:"black", fontSize: 30, fontWeight: "bold"}}>
              Logs
            </h2>

            <div className=" rounded-full h-12 w-12 top-30 right-20 absolute cursor-pointer">
            <Link href="/menu">
            <img
          src="/Regresar.png"
          alt="user"
            />
        </Link>
            </div>

            <div className="flex gap-4">
                <WarehouseLogs
                    title="Almacen 1"
                    color="#4fe2f6"
                    logs={[
                    {
                        date: "Jan/10/25",
                        entries: [
                        { time: "3:00 pm", action: "Added 2 x Screw" },
                        { time: "4:00 pm", action: "Edited Nail description" },
                        ],
                    },
                    {
                        date: "Jan/14/25",
                        entries: [
                        { time: "6:00 pm", action: "Removed 5 x Gear" },
                        { time: "8:00 pm", action: "Added image to Nail" },
                        ],
                    },
                    {
                        date: "Jan/18/25",
                        entries: [
                        { time: "9:00 pm", action: "Edited Gear description" },
                        { time: "9:30 pm", action: "Added 4 x Gear" },
                        ],
                    },
                    ]}
                />

                <WarehouseLogs
                    title="Almacen 2"
                    color="#c8ff63"
                    logs={[
                    {
                        date: "Apr/04/25",
                        entries: [
                        { time: "7:00 pm", action: "Added 1 x Engine" },
                        { time: "8:00 pm", action: "Added 2 x Jackhammer" },
                        ],
                    },
                    {
                        date: "Apr/05/25",
                        entries: [
                        { time: "6:00 pm", action: "Edited Generator image" },
                        { time: "9:00 pm", action: "Removed 1 x Furnace" },
                        { time: "10:00 pm", action: "Added image to Engine" },
                        ],
                    },

                    ]}
                />

                <WarehouseLogs
                    title="Almacen Chido"
                    color="#ff89d6"
                    logs={[
                    {
                        date: "Apr/08/25",
                        entries: [
                        { time: "6:00 am", action: "Added 2 x Nintendo Switch 2" },
                        { time: "7:30 am", action: "Added 1 x PS5" },
                        ],
                    }
                    ]}
                />

            </div>


          </section></div>
          
          </div>
          
          
        </div>
      </main>
    </>
  );
}