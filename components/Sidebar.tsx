'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type Almacen = {
  id_almacen: number
  nombre: string
  descripcion: string
  color: number
}

const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [showModal, setShowModal] = useState(false)

  // Almacén form state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  // Producto form state
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [existencias, setExistencias] = useState(0)
  const [imagen, setImagen] = useState('')
  const [proveedorId, setProveedorId] = useState('')
  const [proveedores, setProveedores] = useState<{ id_proveedor: number, nombre: string }[]>([])

  // Editar modal states
  const [isEditing, setIsEditing] = useState(false)
  const [editStep, setEditStep] = useState(1)
  const [almacenes, setAlmacenes] = useState<Almacen[]>([])
  const [selectedAlmacen, setSelectedAlmacen] = useState<Almacen | null>(null)
  const [addOption, setAddOption] = useState<'producto' | 'proveedor' | null>(null);


  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteStep, setDeleteStep] = useState(1)
  const [selectedToDelete, setSelectedToDelete] = useState<Almacen | null>(null)
  const [pinCode, setPinCode] = useState('')
  const [editOption, setEditOption] = useState<'producto' | 'proveedor' | null>(null);
  const [productos, setProductos] = useState<any[]>([]);
  const [selectedProducto, setSelectedProducto] = useState<any | null>(null);
  const [selectedProveedor, setSelectedProveedor] = useState<any | null>(null);
  




  const colors = [
    { name: 'Blue', rgb: 'rgb(93, 120, 219)' },
    { name: 'Red', rgb: 'rgb(235, 71, 71)' },
    { name: 'Yellow', rgb: 'rgb(255, 204, 0)' },
    { name: 'Brown', rgb: 'rgb(153, 102, 51)' },
    { name: 'Aqua', rgb: 'rgb(0, 204, 255)' },
    { name: 'Green', rgb: 'rgb(40, 167, 69)' },
    { name: 'Orange', rgb: 'rgb(255, 145, 68)' },
    { name: 'Purple', rgb: 'rgb(111, 66, 193)' },
    { name: 'Pink', rgb: 'rgb(255, 99, 132)' },
    { name: 'Gray', rgb: 'rgb(108, 117, 125)' },
  ]

  useEffect(() => {
    if (pathname.startsWith('/warehouse')) {
      fetch('/api/proveedores')
        .then(res => res.json())
        .then(setProveedores)
        .catch(err => console.error('Error loading proveedores', err))
    }
  }, [pathname])

  useEffect(() => {
  if (pathname.startsWith('/warehouse') && editOption === 'producto' && editStep === 1) {
    const almacenId = Number(pathname.split('/').pop());
    if (!almacenId) return;

    fetch(`/api/productos?id_almacen=${almacenId}`)
      .then(res => res.json())
      .then(setProductos)
      .catch(() => alert('Error cargando productos'));
  }
}, [pathname, editOption, editStep]);


const handleAdd = async () => {
  if (pathname === '/menu') {
    // AGREGAR ALMACÉN
    const colorIndex = colors.findIndex(c => c.name === selectedColor) + 1;
    if (!name || !description || !selectedColor) return alert('Todos los campos son obligatorios');

    try {
      const id_usuario = localStorage.getItem("id_usuario");
      const res = await fetch('/api/almacenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: name,
          descripcion: description,
          color: colorIndex,
          id_usuario: Number(id_usuario),
        }),
      });

      if (!res.ok) throw new Error('Error al crear almacén');
      setShowModal(false);
      setName('');
      setDescription('');
      setSelectedColor('');
    } catch (err) {
      alert('Error al guardar el almacén');
    }
  } else if (addOption === 'producto') {
    // AGREGAR PRODUCTO
    const almacenId = Number(pathname.split('/').pop());
    try {
      const res = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: productName,
          descripcion: productDescription,
          existencia: existencias,
          imagen: imagen,
          id_almacen: almacenId,
          id_proveedor: parseInt(proveedorId),
        }),
      });

      if (!res.ok) throw new Error('Error al crear producto');
      setShowModal(false);
      setProductName('');
      setProductDescription('');
      setExistencias(0);
      setImagen('');
      setProveedorId('');
      setAddOption(null);
    } catch (err) {
      alert('Error al guardar el producto');
    }
} else if (addOption === 'proveedor') {
  // AGREGAR PROVEEDOR
  try {
    const res = await fetch('/api/proveedores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: productName,
        direccion: productDescription,
        telefono: imagen,
      }),
    });

    if (!res.ok) throw new Error('Error al crear proveedor');
    alert('Proveedor guardado correctamente');
    setShowModal(false);
    setProductName('');
    setProductDescription('');
    setImagen('');
    setAddOption(null);
  } catch (err) {
    alert('Error al guardar el proveedor');
  }
}

};


  const handleEditClick = async () => {
    try {
      const res = await fetch('/api/almacenes')
      const data = await res.json()
      setAlmacenes(data)
      setEditStep(1)
      setIsEditing(true)
    } catch {
      alert('Error cargando almacenes')
    }
  }

  return (
    <>
      <aside className="fixed top-0 left-0 h-full w-20 bg-gray-200 flex flex-col items-center py-6 space-y-6 shadow-lg z-50"
        style={{ height: "300px", alignItems: "center", justifyContent: "center", marginTop: "100px", marginLeft: "20px", borderRadius: "20px" }}
      >
        <button onClick={() => setShowModal(true)} className="w-8 h-8 cursor-pointer">
          <img src="/Agregar.png" alt="Agregar" style={{ width: "30px", height: "30px", marginBottom: "5px" }} />
        </button>

          <button
            onClick={async () => {
              if (pathname === '/menu') {
                // Editar almacenes (como ya lo haces)
                try {
                  const id_usuario = localStorage.getItem("id_usuario");
                  const res = await fetch(`/api/almacenes?id_usuario=${id_usuario}`);
                  const data = await res.json();
                  setAlmacenes(data);
                  setEditStep(1);
                  setIsEditing(true);
                } catch {
                  alert("Error cargando almacenes");
                }
              } else {
                // Mostrar opción: producto o proveedor
                setIsEditing(true);
                setEditStep(0);
              }
            }}
            className="w-8 h-8 cursor-pointer"
          >
            <img src="/Editar.png" alt="Editar" style={{ width: "37px", height: "37px", marginBottom: "1px" }} />
          </button>


<button
  className="w-8 h-8 cursor-pointer"
  onClick={async () => {
    const id_usuario = localStorage.getItem("id_usuario");
    if (!id_usuario) return alert("No se encontró el ID del usuario");

    if (pathname === "/menu") {
      const res = await fetch(`/api/almacenes?id_usuario=${id_usuario}`);
      const data = await res.json();
      if (!Array.isArray(data)) return alert("Error al cargar almacenes");
      setAlmacenes(data);
      setDeleteStep(1);
      setIsDeleting(true);
    } else {
      const almacenId = Number(pathname.split("/").pop());
      const res = await fetch(`/api/productos?id_almacen=${almacenId}`);
      const data = await res.json();
      if (!Array.isArray(data)) return alert("Error al cargar productos");
      setProductos(data);
      setDeleteStep(1);
      setIsDeleting(true);
    }
  }}
>
  <img src="/Eliminar.png" alt="Eliminar" style={{ width: "30px", height: "30px", marginBottom: "5px" }} />
</button>



        <button onClick={() => router.push('/logs')} className="w-8 h-8 cursor-pointer">
          <img src="/Registro.png" alt="Registro" style={{ width: "30px", height: "30px", marginBottom: "5px" }} />
        </button>
      </aside>

{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="bg-gray-300 p-6 shadow-2xl rounded-lg w-[90%] max-w-md text-black">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {pathname === '/menu' ? 'Agregar Almacén' : addOption === 'producto' ? 'Agregar Producto' : addOption === 'proveedor' ? 'Agregar Proveedor' : '¿Qué deseas agregar?'}
      </h2>

      {pathname === '/menu' ? (
        <>
          <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border bg-white border-gray-300 rounded mb-3" />
          <input type="text" placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border bg-white border-gray-300 rounded mb-3" />
          <div className="mb-2 font-semibold">Color</div>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {colors.map(({ name, rgb }) => (
              <div key={name} onClick={() => setSelectedColor(name)} 
              className={`w-8 h-8 rounded cursor-pointer border-4 ${selectedColor === name ? 'border-black' : 'border-transparent'}`} 
              style={{ backgroundColor: rgb }} title={name} />
            ))}
          </div>
        </>
      ) : addOption === null ? (
        <>
          <div className="flex justify-center gap-4">
            <button onClick={() => setAddOption('producto')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">Producto</button>
            <button onClick={() => setAddOption('proveedor')} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white">Proveedor</button>
          </div>
        </>
      ) : addOption === 'producto' ? (
        <>
          <input type="text" placeholder="Nombre del producto" value={productName} onChange={e => setProductName(e.target.value)} className="w-full p-2 border bg-white border-gray-300 rounded mb-3" />
          <input type="text" placeholder="Descripción" value={productDescription} onChange={e => setProductDescription(e.target.value)} className="w-full p-2 border bg-white border-gray-300 rounded mb-3" />
          <input type="number" placeholder="Existencias" value={existencias} onChange={e => setExistencias(Number(e.target.value))} className="w-full p-2 border bg-white border-gray-300 rounded mb-3" />

          <label htmlFor='file-upload' className="inline-block cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4">
            Imagen
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setImagen(reader.result as string);
                reader.readAsDataURL(file);
              }
            }}
            className="hidden"
          />

          <select value={proveedorId} onChange={e => setProveedorId(e.target.value)} className="w-full p-2 border bg-white border-gray-300 rounded mb-4">
            <option value="">Selecciona un proveedor</option>
            {proveedores.map(p => (
              <option key={p.id_proveedor} value={p.id_proveedor}>{p.nombre}</option>
            ))}
          </select>
        </>
      ) : (
        <>
          <input type="text" placeholder="Nombre del proveedor" value={productName} onChange={e => setProductName(e.target.value)} className="w-full p-2 border bg-white border-gray-300 rounded mb-3" />
          <input type="text" placeholder="Dirección del proveedor" value={productDescription} onChange={e => setProductDescription(e.target.value)} className="w-full p-2 border bg-white border-gray-300 rounded mb-3" />
          <input type="text" placeholder="Teléfono del proveedor" value={imagen} onChange={e => setImagen(e.target.value)} className="w-full p-2 border bg-white border-gray-300 rounded mb-4" />
        </>
      )}

{(pathname === '/menu' || addOption !== null) && (
  <div className="flex justify-end space-x-4 mt-4">
    <button onClick={() => {
      setShowModal(false);
      setAddOption(null);
    }} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded text-white">Cancelar</button>

    <button
      onClick={handleAdd}
      className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
    >
      Guardar
    </button>
  </div>
)}

    </div>
  </div>
)}


 {isEditing && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="bg-gray-300 p-6 shadow-2xl rounded-lg w-[90%] max-w-md text-black">

      {pathname === '/menu' ? (
        editStep === 1 ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">Selecciona un Almacén</h2>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {almacenes.map((a) => (
                <li key={a.id_almacen}>
                  <button className={`w-full text-left p-2 rounded border ${selectedAlmacen?.id_almacen === a.id_almacen ? 'bg-gray-400' : 'bg-white'}`} onClick={() => setSelectedAlmacen(a)}>
                    {a.nombre}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-400 border-gray-300 hover:bg-gray-500 rounded text-white">Cancelar</button>
              <button
                disabled={!selectedAlmacen}
                onClick={() => {
                  if (!selectedAlmacen) return;
                  setName(selectedAlmacen.nombre);
                  setDescription(selectedAlmacen.descripcion);
                  const colorName = colors[selectedAlmacen.color - 1]?.name;
                  setSelectedColor(colorName);
                  setEditStep(2);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center">Editar Almacén</h2>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" className="w-full p-2 border bg-white border-gray-300 rounded mb-3" />
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" className="w-full p-2 border bg-white border-gray-300 rounded mb-3" />
            <div className="mb-2 font-semibold">Color</div>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {colors.map(({ name, rgb }) => (
                <div key={name} onClick={() => setSelectedColor(name)} className={`w-8 h-8 rounded cursor-pointer border-4 ${selectedColor === name ? 'border-black' : 'border-transparent'}`} style={{ backgroundColor: rgb }} title={name} />
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded text-white">Cancelar</button>
              <button onClick={async () => {
                const colorIndex = colors.findIndex(c => c.name === selectedColor) + 1
                try {
                  if (!selectedAlmacen) return alert('Selecciona un almacén');
                  const res = await fetch(`/api/almacenes/${selectedAlmacen.id_almacen}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      nombre: name,
                      descripcion: description,
                      color: colorIndex,
                    }),
                  });
                  if (!res.ok) throw new Error();
                  alert('Almacén actualizado');
                  setIsEditing(false);
                } catch {
                  alert('Error al guardar los cambios');
                }
              }} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white">
                Guardar
              </button>
            </div>
          </>
        )
      ) : editStep === 0 ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">¿Qué deseas editar?</h2>
          <div className="flex justify-center gap-4">
            <button onClick={() => { setEditOption('producto'); setEditStep(1); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">Producto</button>
            <button onClick={() => { setEditOption('proveedor'); setEditStep(1); }} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white">Proveedor</button>
          </div>
        </>
      ) : editOption === 'producto' && editStep === 1 ? (
  <>
    <h2 className="text-xl font-semibold mb-4 text-center">Selecciona un Producto</h2>
    <ul className="space-y-2 max-h-64 overflow-y-auto">
      {productos.map((p) => (
        <li key={p.id_producto}>
          <button
            className={`w-full text-left p-2 rounded border ${selectedProducto?.id_producto === p.id_producto ? 'bg-gray-400' : 'bg-white'}`}
            onClick={() => setSelectedProducto(p)}
          >
            {p.nombre}
          </button>
        </li>
      ))}
    </ul>
    <div className="flex justify-end space-x-4 mt-4">
      <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded text-white">Cancelar</button>
      <button
        disabled={!selectedProducto}
        onClick={() => {
          if (!selectedProducto) return;
          setProductName(selectedProducto.nombre);
          setProductDescription(selectedProducto.descripcion);
          setExistencias(selectedProducto.existencia);
          setImagen(selectedProducto.imagen);
          setProveedorId(String(selectedProducto.id_proveedor));
          setEditStep(2);
        }}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  </>
) : editOption === 'producto' && editStep === 2 ? (
  <>
    <h2 className="text-xl font-semibold mb-4 text-center">Editar Producto</h2>
    <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Nombre" className="w-full p-2 border bg-white border-gray-300 rounded mb-3" />
    <input type="text" value={productDescription} onChange={e => setProductDescription(e.target.value)} placeholder="Descripción" className="w-full p-2 border bg-white border-gray-300 rounded mb-3" />
    <input type="number" value={existencias} onChange={e => setExistencias(Number(e.target.value))} placeholder="Existencias" className="w-full p-2 border bg-white border-gray-300 rounded mb-3" />

    <label htmlFor='file-upload-edit' className="inline-block cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4">Actualizar Imagen</label>
    <input
      type="file"
      id="file-upload-edit"
      accept="image/*"
      onChange={e => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setImagen(reader.result as string);
          reader.readAsDataURL(file);
        }
      }}
      className="hidden"
    />

    <select value={proveedorId} onChange={e => setProveedorId(e.target.value)} className="w-full p-2 border bg-white border-gray-300 rounded mb-4">
      <option value="">Selecciona un proveedor</option>
      {proveedores.map(p => (
        <option key={p.id_proveedor} value={p.id_proveedor}>{p.nombre}</option>
      ))}
    </select>

    <div className="flex justify-end space-x-4">
      <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded text-white">Cancelar</button>
      <button
        onClick={async () => {
          try {
            const res = await fetch(`/api/productos/${selectedProducto.id_producto}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                nombre: productName,
                descripcion: productDescription,
                existencia: existencias,
                imagen,
                id_proveedor: parseInt(proveedorId),
              }),
            });
            if (!res.ok) throw new Error();
            alert('Producto actualizado correctamente');
            setIsEditing(false);
          } catch {
            alert('Error al actualizar el producto');
          }
        }}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
      >
        Guardar
      </button>
    </div>
  </>
): editOption === 'proveedor' && editStep === 1 ? (
  <>
    {/* paso 1: seleccionar proveedor */}
    <h2 className="text-xl font-semibold mb-4 text-center">Selecciona un Proveedor</h2>
    <ul className="space-y-2 max-h-64 overflow-y-auto">
      {proveedores.map((p) => (
        <li key={p.id_proveedor}>
          <button
            className={`w-full text-left p-2 rounded border ${selectedProveedor?.id_proveedor === p.id_proveedor ? 'bg-gray-400' : 'bg-white'}`}
            onClick={() => setSelectedProveedor(p)}
          >
            {p.nombre}
          </button>
        </li>
      ))}
    </ul>
    <div className="flex justify-end space-x-4 mt-4">
      <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded text-white">Cancelar</button>
      <button
        disabled={!selectedProveedor}
        onClick={() => {
          if (!selectedProveedor) return;
          setProductName(selectedProveedor.nombre);
          setProductDescription(selectedProveedor.direccion);
          setImagen(selectedProveedor.telefono);
          setEditStep(2);
        }}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  </>
) : editOption === 'proveedor' && editStep === 2 ? (
  <>
    <h2 className="text-xl font-semibold mb-4 text-center">Editar Proveedor</h2>
    <input
      type="text"
      value={productName}
      onChange={e => setProductName(e.target.value)}
      placeholder="Nombre del proveedor"
      className="w-full p-2 border bg-white border-gray-300 rounded mb-3"
    />
    <input
      type="text"
      value={productDescription}
      onChange={e => setProductDescription(e.target.value)}
      placeholder="Dirección"
      className="w-full p-2 border bg-white border-gray-300 rounded mb-3"
    />
    <input
      type="text"
      value={imagen}
      onChange={e => setImagen(e.target.value)}
      placeholder="Teléfono"
      className="w-full p-2 border bg-white border-gray-300 rounded mb-4"
    />

    <div className="flex justify-end space-x-4">
      <button
        onClick={() => setIsEditing(false)}
        className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded text-white"
      >
        Cancelar
      </button>
      <button
        onClick={async () => {
          try {
            const res = await fetch(`/api/proveedores/${selectedProveedor.id_proveedor}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                nombre: productName,
                direccion: productDescription,
                telefono: imagen,
              }),
            });
            if (!res.ok) throw new Error();
            alert('Proveedor actualizado correctamente');
            setIsEditing(false);
          } catch {
            alert('Error al actualizar el proveedor');
          }
        }}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
      >
        Guardar
      </button>
    </div>
  </>
):null}
    </div>
  </div>
)}


      {isDeleting && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="bg-gray-300 p-6 shadow-2xl rounded-lg w-[90%] max-w-md text-black">
      {deleteStep === 1 ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">
            {pathname === '/menu' ? 'Selecciona un Almacén a eliminar' : 'Selecciona un Producto a eliminar'}
          </h2>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {(pathname === '/menu' ? almacenes : productos).map((item) => (
              <li key={pathname === '/menu' ? item.id_almacen : item.id_producto}>
                <button
                  className={`w-full text-left p-2 rounded border ${
                    (pathname === '/menu' ? selectedToDelete?.id_almacen : selectedProducto?.id_producto) === (pathname === '/menu' ? item.id_almacen : item.id_producto)
                      ? 'bg-red-400'
                      : 'bg-white'
                  }`}
                  onClick={() => {
                    if (pathname === '/menu') setSelectedToDelete(item);
                    else setSelectedProducto(item);
                  }}
                >
                  {item.nombre}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-end space-x-4 mt-4">
            <button onClick={() => setIsDeleting(false)} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded text-white">Cancelar</button>
            <button disabled={!(pathname === '/menu' ? selectedToDelete : selectedProducto)} onClick={() => setDeleteStep(2)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white disabled:opacity-50">Siguiente</button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4 text-center text-red-700">¡Advertencia!</h2>
          <p className="mb-2 text-center font-semibold">
            ¿Estás seguro de que deseas eliminar este {pathname === '/menu' ? 'almacén' : 'producto'}?
          </p>
          {pathname === '/menu' && (
            <p className="mb-4 text-center text-sm text-red-600">
              Esto también eliminará todos los productos dentro de él.
            </p>
          )}
          <p className="mb-2 text-sm">Introduce tu PIN de 4 dígitos para confirmar:</p>
          <input
            type="password"
            maxLength={4}
            pattern="\d*"
            inputMode="numeric"
            value={pinCode}
            onChange={e => setPinCode(e.target.value.replace(/\D/g, ''))}
            className="w-full p-2 border bg-white border-gray-300 rounded mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button onClick={() => setIsDeleting(false)} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded text-white">Cancelar</button>
            <button
              onClick={async () => {
                try {
                  const id_usuario = localStorage.getItem("id_usuario");
                  if (!id_usuario) return alert("No se encontró el ID del usuario");

                  const userRes = await fetch(`/api/usuarios/${id_usuario}`);
                  const user = await userRes.json();

                  if (String(user.clave) !== pinCode) {
                    alert("PIN incorrecto");
                    return;
                  }

                  if (pathname === '/menu') {
                    if (!selectedToDelete) return alert("Selecciona un almacén");
                    const res = await fetch(`/api/almacenes/${selectedToDelete.id_almacen}`, {
                      method: 'DELETE',
                    });
                    if (!res.ok) throw new Error();
                    alert("Almacén eliminado correctamente");
                  } else {
                    if (!selectedProducto) return alert("Selecciona un producto");
                    const res = await fetch(`/api/productos/${selectedProducto.id_producto}`, {
                      method: 'DELETE',
                    });
                    if (!res.ok) throw new Error();
                    alert("Producto eliminado correctamente");
                  }

                  setIsDeleting(false);
                  setPinCode('');
                } catch {
                  alert(`Error al eliminar el ${pathname === '/menu' ? 'almacén' : 'producto'}`);
                }
              }}
              className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded text-white"
            >
              Eliminar
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}

    </>
  )
}

export default Sidebar