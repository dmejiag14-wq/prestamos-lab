
import type { Equipo, Prestamo } from "../types";

interface TablaPrestamosProps {
  prestamos: Prestamo[];
  equipos: Equipo[];
  onDevolver: (prestamo: Prestamo) => void;
}

function TablaPrestamos({
  prestamos,
  equipos,
  onDevolver
}: TablaPrestamosProps) {
  const activos = prestamos
    .filter(prestamo => !prestamo.devuelto)
    .sort((a, b) => a.fechaLimite.localeCompare(b.fechaLimite));

  function nombreEquipo(equipoId: number) {
    const equipo = equipos.find(
      item => Number(item.id) === Number(equipoId)
    );

    return equipo ? equipo.nombre : "Equipo desconocido";
  }

  const hoy = new Date().toLocaleDateString("en-CA");

  return (
    <section className="tabla-prestamos">
      <h2>Préstamos activos</h2>

      {activos.length === 0 ? (
        <p>No hay préstamos activos.</p>
      ) : (
        <div className="tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th>Equipo</th>
                <th>Solicitante</th>
                <th>Carné</th>
                <th>Fecha límite</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {activos.map(prestamo => {
                const vencido = prestamo.fechaLimite < hoy;

                return (
                  <tr
                    key={prestamo.id}
                    className={vencido ? "fila-vencida" : ""}
                  >
                    <td>{nombreEquipo(prestamo.equipoId)}</td>
                    <td>{prestamo.solicitante}</td>
                    <td>{prestamo.carne}</td>
                    <td>{prestamo.fechaLimite}</td>
                    <td>{vencido ? "Vencido" : "Activo"}</td>
                    <td>
                      <button onClick={() => onDevolver(prestamo)}>
                        Devolver
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default TablaPrestamos;
