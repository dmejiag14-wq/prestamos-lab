
import { useEffect, useState } from "react";
import type { Equipo } from "../types";

interface FormularioPrestamoProps {
  equipos: Equipo[];
  equipoSeleccionado?: number;
  onGuardar: (
    equipoId: number,
    solicitante: string,
    carne: string,
    fechaPrestamo: string,
    fechaLimite: string
  ) => Promise<void>;
}

function FormularioPrestamo({
  equipos,
  equipoSeleccionado,
  onGuardar,
}: FormularioPrestamoProps) {
  const [equipoId, setEquipoId] = useState("");
  const [solicitante, setSolicitante] = useState("");
  const [carne, setCarne] = useState("");
  const [fechaPrestamo, setFechaPrestamo] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  const hoy = new Date().toLocaleDateString("en-CA");

  useEffect(() => {
    if (equipoSeleccionado !== undefined) {
      setEquipoId(String(equipoSeleccionado));
    }
  }, [equipoSeleccionado]);

  async function manejarEnvio(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (solicitante.trim().length < 5) {
      setError("El nombre debe tener al menos 5 caracteres.");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{5}$/.test(carne)) {
      setError("El carné debe tener el formato 0000-00-00000.");
      return;
    }

    if (!fechaPrestamo || fechaPrestamo < hoy) {
      setError("La fecha del préstamo no puede ser anterior a hoy.");
      return;
    }

    if (!fechaLimite || fechaLimite < fechaPrestamo) {
      setError("La fecha límite debe ser igual o posterior al préstamo.");
      return;
    }

    const diferencia =
      (new Date(fechaLimite + "T00:00:00").getTime() -
        new Date(fechaPrestamo + "T00:00:00").getTime()) /
      (1000 * 60 * 60 * 24);

    if (diferencia > 3) {
      setError("El préstamo no puede superar los 3 días.");
      return;
    }

    if (!equipoId) {
      setError("Selecciona un equipo.");
      return;
    }

    try {
      setGuardando(true);

      await onGuardar(
        Number(equipoId),
        solicitante.trim(),
        carne,
        fechaPrestamo,
        fechaLimite
      );

      setEquipoId("");
      setSolicitante("");
      setCarne("");
      setFechaPrestamo("");
      setFechaLimite("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo registrar el préstamo."
      );
    } finally {
      setGuardando(false);
    }
  }

  const equiposDisponibles = equipos.filter(
    (equipo) => equipo.disponible
  );

  return (
    <section className="formulario">
      <h2>Registrar préstamo</h2>

      <form onSubmit={manejarEnvio}>
        <label htmlFor="equipo">Equipo</label>
        <select
          id="equipo"
          value={equipoId}
          onChange={(e) => setEquipoId(e.target.value)}
          required
        >
          <option value="">Selecciona un equipo</option>
          {equiposDisponibles.map((equipo) => (
            <option key={equipo.id} value={equipo.id}>
              {equipo.nombre}
            </option>
          ))}
        </select>

        <label htmlFor="solicitante">Nombre del solicitante</label>
        <input
          id="solicitante"
          value={solicitante}
          onChange={(e) => setSolicitante(e.target.value)}
          placeholder="Nombre completo"
          required
        />

        <label htmlFor="carne">Carné</label>
        <input
          id="carne"
          value={carne}
          onChange={(e) => setCarne(e.target.value)}
          placeholder="0000-00-00000"
          required
        />

        <label htmlFor="fechaPrestamo">Fecha del préstamo</label>
        <input
          id="fechaPrestamo"
          type="date"
          min={hoy}
          value={fechaPrestamo}
          onChange={(e) => setFechaPrestamo(e.target.value)}
          required
        />

        <label htmlFor="fechaLimite">Fecha límite de devolución</label>
        <input
          id="fechaLimite"
          type="date"
          min={fechaPrestamo || hoy}
          value={fechaLimite}
          onChange={(e) => setFechaLimite(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={guardando}>
          {guardando ? "Guardando..." : "Registrar préstamo"}
        </button>
      </form>
    </section>
  );
}

export default FormularioPrestamo;
