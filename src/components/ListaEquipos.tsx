
import type { Equipo } from "../types";
import TarjetaEquipo from "./TarjetaEquipo";

interface ListaEquiposProps {
  equipos: Equipo[];
  onPrestar: (id: number) => void;
}

function ListaEquipos({ equipos, onPrestar }: ListaEquiposProps) {
  return (
    <section className="lista-equipos">
      {equipos.map((equipo) => (
        <TarjetaEquipo
          key={equipo.id}
          equipo={equipo}
          onPrestar={onPrestar}
        />
      ))}
    </section>
  );
}

export default ListaEquipos;
