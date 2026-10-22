
interface EncabezadoProps {
  disponibles: number;
  total: number;
}

function Encabezado({ disponibles, total }: EncabezadoProps) {
  return (
    <header className="encabezado">
      <h1>Préstamos Lab — 0902-23-15690</h1>
      <p>{disponibles} de {total} equipos disponibles</p>
    </header>
  );
}

export default Encabezado;
