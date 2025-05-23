'use client'
import { useRouter } from 'next/navigation'

export const NavMenu = () => {
    const router = useRouter()
  
    return (
      <button
        onClick={() => router.push('/menu')}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ir al Menú
      </button>
    )
  }
  