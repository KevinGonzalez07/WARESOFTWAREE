'use client';

import { useState } from 'react';

export default function RegisterPad() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) setPin(pin + num);
  };

  const handleClear = () => {
    setPin('');
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleRegister = async () => {
    if (username && pin.length === 4) {
      try {
        const response = await fetch('/api/usuarios', {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: username,
            clave: parseInt(pin),
            rol: false,
          }),
        });
        const data = await response.json();

        if(response.ok){
          alert(`Usuario registrado con exito ;) ${data.usuario.nombre}`);
        }else{
          alert(`Erro: ${data.error}`);
        }
      }  catch (error){
        console.error(error);
        alert('Error al conectar con el servidro')
      }
    } else {
      alert('Please enter a username and a 4-digit PIN.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">
        <span className="text-black">&gt;</span>
        <span className="text-black font-extrabold">WareSoftWare</span>
      </h1>

      <div className="w-full max-w-xs flex flex-col gap-4">
        <div>
          <label className="font-semibold block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-300 text-center"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">4-Pin Code</label>
          <input
            type="password"
            value={pin}
            disabled
            className="w-full p-2 rounded-md bg-gray-300 text-center tracking-widest"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="p-4 bg-gray-400 rounded-full text-xl font-bold"
            >
              {num}
            </button>
          ))}
          <button onClick={handleBackspace} className="p-4 bg-gray-400 rounded-full text-xl font-bold">
            ⌫
          </button>
          <button onClick={() => handleNumberClick('0')} className="p-4 bg-gray-400 rounded-full text-xl font-bold">
            0
          </button>
          <button onClick={handleClear} className="p-4 bg-gray-400 rounded-full text-xl font-bold">
            ✕
          </button>
        </div>

        <button
          onClick={handleRegister}
          className="mt-6 bg-gray-600 text-white py-2 rounded-md font-semibold"
        >
          Register
        </button>
      </div>
    </div>
  );
}
