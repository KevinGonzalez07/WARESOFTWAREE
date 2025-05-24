// app/product/[id]/page.tsx

import { notFound } from 'next/navigation';
import prisma from '@/app/api/backend/prisma';
import Sidebar from '@/components/Sidebar';
import UserState from '@/components/UserState';
import { Space_Mono } from 'next/font/google';
import Link from 'next/link';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) notFound();

  const producto = await prisma.producto.findUnique({
    where: { id_producto: id },
    include: {
      proveedor: true,
      almacen: true,
    },
  });

  if (!producto) notFound();

  return (
    <main className="flex h-screen">
      <div className="flex-1 bg-white">
        <header className="flex justify-between items-center bg-gray-100 p-4">
          <h1
            className={spaceMono.className}
            style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}
          >
            &gt;WareSoftWare
          </h1>
          <UserState />
        </header>

        <div className="flex">
          <Sidebar />
          <section
            className="rounded-3xl m-6 p-6 pl-10"
            style={{ marginLeft: '120px' }}
          >
            <h2
              className="text-3xl font-bold bg-gray-300 rounded-full px-4 py-1 inline-block mb-4"
              style={{ color: 'black', fontSize: 30 }}
            >
              Detalles del Producto
            </h2>

            <h3 className="text-2xl font-semibold text-black">{producto.nombre}</h3>
            <p className="text-xl mb-6 text-black">{producto.descripcion}</p>

            <div className="mb-6">
              <strong className="text-lg text-black">Existencia:</strong>
              <p className="text-xl text-black">{producto.existencia} unidades</p>
            </div>

            <div className="mb-6">
              <strong className="text-lg text-black">Almacén:</strong>
              <p className="text-xl text-black">{producto.almacen.nombre}</p>
            </div>

            <div className="mb-6">
              <strong className="text-lg text-black">Proveedor:</strong>
              <p className="text-xl text-black">
                {producto.proveedor?.nombre || 'Sin proveedor'}
              </p>
              <p className="text-sm text-gray-600">
                {producto.proveedor?.direccion || 'Sin dirección'}
              </p>
              <p className="text-sm text-gray-600">
                {producto.proveedor?.telefono || 'Sin teléfono'}
              </p>
            </div>

            <div className="mb-6">
              <strong className="text-lg text-black">Imagen:</strong>
              {producto.imagen ? (
              <img
              src={producto.imagen}
              alt={producto.nombre}
             className="max-w-sm rounded-lg border shadow-md"
             />
             ) : (
               <p className="text-gray-600">Sin imagen disponible</p>
          )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
