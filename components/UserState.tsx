"use client";

import { useEffect, useState } from "react";
import { actualizarDatos } from "@/app/funciones/actualizadDatos";
import { cambiarPin } from "@/app/funciones/cambiarContraseña";
import { useRouter } from "next/navigation";



export default function UserState() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "pin">("profile");

  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const router = useRouter();

    const handleLogout = () => {
    localStorage.removeItem("nombre");
    localStorage.removeItem("id_usuario");
    localStorage.removeItem("imagen");

    alert("Sesión cerrada");
    router.push("/login");
  };

  useEffect(() => {
    const nombre = localStorage.getItem("nombre");
    const imagen = localStorage.getItem("imagen");

    if (nombre) setUsername(nombre);
    setProfileImage(imagen && imagen.trim() !== "" ? imagen : "Perfil.jpg");
  }, []);

  return (
    <>
      {/* Menu Button */}
      <div className="flex items-center gap-2">
        <img
          src="/menu.png"
          alt="menu"
          className="w-8 h-8 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
        <span className="font-bold font-lato text-black">
          {username || "Usuario"}
        </span>
        <img src={profileImage || "Perfil.jpg"} alt="user" className="w-8 h-8 rounded-full" />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-gray-300 p-6 rounded-lg shadow-2xl w-[320px]">
            {/* Toggle Buttons */}
            <div className="flex justify-between mb-4">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-3 py-1 rounded-l ${
                  activeTab === "profile"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400 text-white"
                }`}
              >
                Edit Profile
              </button>
              <button
                onClick={() => setActiveTab("pin")}
                className={`px-3 py-1 rounded-r ${
                  activeTab === "pin"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400 text-white"
                }`}
              >
                Change 4-Pin
              </button>
            </div>

            {/* Profile Form */}
            {activeTab === "profile" && (
              <>
                <label className="block mb-2 text-black">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border text-black bg-white border-gray-300 rounded mb-4"
                />

                <label className="block mb-2 text-black">
                  Profile Image
                </label>

                <label
                    htmlFor="file-upload"
                    className="inline-block cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4"
                  >
                    Subir Imagen
                  </label>
                  
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProfileImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
              </>
            )}

            {/* 4-Pin Form */}
            {activeTab === "pin" && (
              <>
                <label className="block mb-2 text-black">Old Pin</label>
                <input
                  type="password"
                  value={oldPin}
                  onChange={(e) => setOldPin(e.target.value)}
                  className="w-full p-2 border text-black bg-white border-gray-300 rounded mb-4"
                />

                <label className="block mb-2 text-black">New Pin</label>
                <input
                  type="password"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  className="w-full p-2 border text-black bg-white border-gray-300 rounded mb-4"
                />

                <label className="block mb-2 text-black">Confirm Pin</label>
                <input
                  type="password"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  className="w-full p-2 border text-black bg-white border-gray-300 rounded mb-4"
                />
              </>
            )}

            {/* Footer Buttons */}
            <div className="flex justify-end gap-2">
              <button
                  onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Logout
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-400 rounded text-white hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (activeTab === "profile") {
                    actualizarDatos(username, profileImage);
                  } else if (activeTab === "pin"){
                    cambiarPin(oldPin, newPin, confirmPin, () => {
                     setOldPin("");
                     setNewPin("");
                     setConfirmPin("");
                     setIsOpen(false); 
                    });
                  }
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
