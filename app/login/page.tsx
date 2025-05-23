"use client";

import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        nombre: email,
        clave: pin,
      });

      if (response.status === 200){
        localStorage.removeItem("id_usuario");
        const usuario = response.data.usuario;
        localStorage.setItem('nombre', usuario.nombre);
        localStorage.setItem('id_usuario', usuario.id_usuario);
        localStorage.setItem('imagen', usuario.imagen);
        alert('Bienvenido!');
        router.push('/menu');
      }
    } catch (error) {
      if (axios.isAxiosError(error)){
        alert(error.response?.data?.error || 'Error de autentificación');
      }else{
        alert ('Error desconocido');
      }
      console.error(error);
    }

  };

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) setPin(pin + num);
  };

  const handleClear = () => {
    setPin('');
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  
  return (
    <div className="min-h-screen flex">
      
      {/* Left side: login form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12 bg-white relative">

        <form onSubmit={handleLogin} className="w-full max-w-sm">
        <h1 className="font-lato mb-3 text-black font-bold mt-12 text-2xl">Welcome</h1>

          <div className="mb-4">
            <label className="block text-sm font-lato font-semibold  text-gray-700 mb-1" htmlFor="email">
              Username
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-200 text-center border border-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-lato font-semibold text-gray-700 mb-1" htmlFor="password">
              4-Pin Code
            </label>
            <input
              id="password"
              type="password"
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-200 text-center border border-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              type="button"
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="p-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full shadow text-xl"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={handleBackspace}
            className="p-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full shadow text-xl"
          >
            ⌫
          </button>
          <button
            type="button"
            onClick={() => handleNumberClick('0')}
            className="p-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full shadow text-xl"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="p-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full shadow text-xl"
          >
            ✕
          </button>
        </div>


          <div className="flex items-center justify-between text-sm mb-6">
            <a href="/forgot-password" className="text-blue-600 hover:underline font-lato">
              Forgot my 4-Pin Code
            </a>
          </div>

          <button
            type="submit"
            onClick={handleLogin}
            className="w-full font-lato bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600 mt-6 font-lato">
            Newbie? Need a new account.{' '}
            <a href="/register" className="text-blue-600 hover:underline font-lato">
              Register
            </a>
          </p>
        </form>

        {/* Additional text on the right */}
        <h1 className="absolute top-5 left-5 font-bold text-3xl font-space-mono text-black">
          {">"}WareSoftWare
        </h1>
      </div>

      {/* Right side: illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gray-200 justify-center items-center relative">
      <Image 
      src="/login_warehouse2.png" 
      alt="Login Illustration" 
      layout="fill" 
      objectFit="cover" 
      />
      </div>
    </div>
  );
}
