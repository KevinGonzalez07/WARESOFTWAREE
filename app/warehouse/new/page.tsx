'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CrearAlmacen = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    color: '',
    id_usuario: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/almacenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          color: parseInt(form.color),
          id_usuario: parseInt(form.id_usuario),
        }),
      })

      if (res.ok) {
        router.push('/menu')
      } else {
        const errorData = await res.json()
        alert(`Error: ${errorData.error || 'Error al crear el almacén'}`)
        console.error("Detalles:", errorData.detalles || 'No hay más información')
      }
    } catch (error) {
      alert('Error inesperado al enviar el formulario')
      console.error("Catch error:", error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-6 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-bold mb-4">Crear nuevo almacén</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded"
          required
        />
        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded"
          required
        />
        <input
          name="color"
          type="number"
          placeholder="Color (ej: 16711680)"
          value={form.color}
          onChange={handleChange}
          className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded"
          required
        />
        <input
          name="id_usuario"
          type="number"
          placeholder="ID Usuario"
          value={form.id_usuario}
          onChange={handleChange}
          className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crear
        </button>
      </form>
    </div>
  )
}

export default CrearAlmacen
