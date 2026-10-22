
import { useState, useEffect } from "react";
import Encabezado from "./components/Encabezado";
import ListaEquipos from "./components/ListaEquipos";
import FormularioPrestamo from "./components/FormularioPrestamo";
import TablaPrestamos from "./components/TablaPrestamos";
import useEquipos from "./hooks/useEquipos";
import {
  crearPrestamo,
  actualizarEquipo,
  obtenerPrestamos,
  actualizarPrestamo
} from "./services/api";
import type { Prestamo } from "./types";
import "./App.css";

function App() {
  const { equipos, cargando, error, recargar } = useEquipos();

  const [categoria, setCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [equipoSeleccionado, setEquipoSeleccionado] =
    useState<number | undefined>(undefined);
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [errorPrestamos, setErrorPrestamos] = useState("");
  const [cargandoPrestamos, setCargandoPrestamos] = useState(true);

  async function cargarPrestamos() {
    try {
      setCargandoPrestamos(true);
      setErrorPrestamos("");
      const datos = await obtenerPrestamos();
      setPrestamos(datos);
    } catch {
      setErrorPrestamos("No se pudieron cargar los préstamos.");
    } finally {
      setCargandoPrestamos(false);
    }
  }

  useEffect(() => {
    cargarPrestamos();
  }, []);

  const disponibles = equipos.filter(
    equipo => equipo.disponible
  ).length;

  const equiposFiltrados = equipos.filter(equipo => {
    const coincideCategoria =
      categoria === "Todas" || equipo.categoria === categoria;

    const coincideNombre = equipo.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    return coincideCategoria && coincideNombre;
  });

  async function prestarEquipo(
    equipoId: number,
    solicitante: string,
    carne: string,
    fechaPrestamo: string,
    fechaLimite: string
  ) {
    const equipo = equipos.find(
      item => Number(item.id) === equipoId
    );

    if (!equipo || !equipo.disponible) {
      throw new Error("El equipo ya no está disponible.");
    }

    const prestamosActuales = await obtenerPrestamos();

    const tienePrestamoActivo = prestamosActuales.some(
      prestamo =>
        String(prestamo.carne).trim() === carne.trim() &&
        !prestamo.devuelto
    );

    if (tienePrestamoActivo) {
      throw new Error("Este carné ya tiene un préstamo activo.");
    }

    await crearPrestamo({
      equipoId,
      solicitante,
      carne,
      fechaPrestamo,
      fechaLimite,
      devuelto: false
    });

    await actualizarEquipo(equipoId, false);

    setMensaje("Préstamo registrado correctamente.");
    setEquipoSeleccionado(undefined);

    await Promise.all([recargar(), cargarPrestamos()]);
  }

 


async function devolverPrestamo(prestamo: Prestamo) {
  try {
    setMensaje("");

    await actualizarPrestamo(prestamo.id, true);
    await actualizarEquipo(Number(prestamo.equipoId), true);

    setMensaje("Equipo devuelto correctamente.");

    await recargar();
    await cargarPrestamos();
  } catch (error) {
    setMensaje(
      error instanceof Error
        ? error.message
        : "No se pudo devolver el equipo."
    );
  }
}




  return (
    <div className="app">
      <Encabezado
        disponibles={disponibles}
        total={equipos.length}
      />

      <main className="contenido">
        <h2>Inventario de equipos</h2>

        {cargando && <p>Cargando equipos...</p>}

        {error && (
          <div>
            <p>{error}</p>
            <button onClick={recargar}>Reintentar</button>
          </div>
        )}

        {!cargando && !error && (
          <>
            <div className="filtros">
              <div>
                <label htmlFor="categoria">
                  Filtrar por categoría
                </label>

                <select
                  id="categoria"
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
                >
                  <option value="Todas">Todas las categorías</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Proyector">Proyector</option>
                  <option value="Router">Router</option>
                </select>
              </div>

              <div>
                <label htmlFor="busqueda">Buscar por nombre</label>

                <input
                  id="busqueda"
                  value={busqueda}
                  onChange={e => setBusqueda(e.target.value)}
                  placeholder="Ej. Laptop Lenovo"
                />
              </div>
            </div>

            {equiposFiltrados.length > 0 ? (
              <ListaEquipos
                equipos={equiposFiltrados}
                onPrestar={id => {
                  setEquipoSeleccionado(id);
                  setMensaje("");
                  setCategoria("Todas");
                  setBusqueda("");
                }}
              />
            ) : (
              <p>No se encontraron equipos.</p>
            )}

            {mensaje && <p className="disponible">{mensaje}</p>}

            <FormularioPrestamo
              equipos={equipos}
              equipoSeleccionado={equipoSeleccionado}
              onGuardar={prestarEquipo}
            />

            <section>
              {cargandoPrestamos && <p>Cargando préstamos...</p>}

              {errorPrestamos && (
                <div>
                  <p>{errorPrestamos}</p>
                  <button onClick={cargarPrestamos}>Reintentar</button>
                </div>
              )}

              {!cargandoPrestamos && !errorPrestamos && (
                <TablaPrestamos
                  prestamos={prestamos}
                  equipos={equipos}
                  onDevolver={devolverPrestamo}
                />
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
