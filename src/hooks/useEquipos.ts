
import { useEffect, useState } from "react";
import type { Equipo } from "../types";
import { obtenerEquipos } from "../services/api";

function useEquipos() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  async function cargarEquipos() {
    try {
      setCargando(true);
      setError("");

      const datos = await obtenerEquipos();
      setEquipos(datos);
    } catch {
      setError("No se pudieron cargar los equipos.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarEquipos();
  }, []);

  return {
    equipos,
    cargando,
    error,
    recargar: cargarEquipos
  };
}

export default useEquipos;
