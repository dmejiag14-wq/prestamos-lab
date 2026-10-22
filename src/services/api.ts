
import type { Equipo, Prestamo } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function obtenerEquipos(): Promise<Equipo[]> {
  const respuesta = await fetch(`${API_URL}/equipos`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los equipos.");
  }

  return respuesta.json();
}

export async function obtenerPrestamos(): Promise<Prestamo[]> {
  const respuesta = await fetch(`${API_URL}/prestamos`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los préstamos.");
  }

  return respuesta.json();
}

export async function crearPrestamo(
  prestamo: Omit<Prestamo, "id">
): Promise<Prestamo> {
  const respuesta = await fetch(`${API_URL}/prestamos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prestamo)
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo registrar el préstamo.");
  }

  return respuesta.json();
}

export async function actualizarEquipo(
  id: number,
  disponible: boolean
): Promise<Equipo> {
  const respuesta = await fetch(`${API_URL}/equipos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ disponible })
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo actualizar el equipo.");
  }

  return respuesta.json();
}



export async function actualizarPrestamo(
  id: string | number,
  devuelto: boolean
): Promise<Prestamo> {
  const respuesta = await fetch(`${API_URL}/prestamos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ devuelto })
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo actualizar el préstamo.");
  }

  return respuesta.json();
}


