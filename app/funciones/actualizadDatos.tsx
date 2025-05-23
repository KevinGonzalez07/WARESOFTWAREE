import axios from "axios";

export const actualizarDatos = async (username: string, imagen: string) => {
    const id_usuario = localStorage.getItem("id_usuario");
    if (!id_usuario) {
      alert("ID de usuario no encontrado");
      return;
    }

    try {
      const response = await axios.put(`/api/usuarios/${id_usuario}`, {
        nombre: username,
        imagenPerfil: imagen,
      });

      if (response.status === 200) {
        alert("Nombre actualizado exitosamente");
        localStorage.setItem("nombre", username);
      } else {
        alert("Error al actualizar el nombre");
      }
    } catch (error) {
      console.error("Error al actualizar el nombre:", error);
      alert("Hubo un error al actualizar el nombre");
    }
  };
