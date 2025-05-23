import axios from "axios";

export const cambiarPin = async (
  oldPin: string,
  newPin: string,
  confirmPin: string,
  onSuccess?: () => void
) => {
  const id_usuario = localStorage.getItem("id_usuario");
  if (!id_usuario) {
    alert("ID de usuario no encontrado");
    return;
  }

  
  if (newPin !== confirmPin) {
    alert("Los nuevos PIN no coinciden");
    return;
  }

  try {
    const response = await axios.put(`/api/usuarios/${id_usuario}/pin`, {
      oldPin,
      newPin,
    });

    if (response.status === 200) {
      alert("PIN actualizado exitosamente");
      if (onSuccess) onSuccess(); // para limpiar campos u otras acciones
    } else {
      alert("Error al actualizar el PIN");
    }
  } catch (error) {
    console.error("Error al actualizar el PIN:", error);
    alert("Hubo un error al actualizar el PIN");
  }
};
