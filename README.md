
# Préstamos Lab — 0902-23-15690

## Descripción
Aplicación web para administrar el inventario de equipos y registrar préstamos y devoluciones.

## Tecnologías
- React
- TypeScript
- Vite
- JSON Server

## Requisitos
- Node.js y npm instalados.

## Instalación
1. Clonar o descargar el repositorio.
2. Abrir una terminal en la carpeta del proyecto.
3. Ejecutar:

```bash
npm install
```

## Ejecutar la API
En una terminal:

```bash
npm run api
```

La API estará disponible en http://localhost:3001.

## Ejecutar la aplicación
En otra terminal:

```bash
npm run dev
```

Abrir en el navegador la dirección que muestre Vite, normalmente http://localhost:5173.

## Endpoints de la API
- GET `/equipos`: consultar equipos.
- GET `/prestamos?devuelto=false`: consultar préstamos activos.
- POST `/prestamos`: registrar un préstamo.
- PATCH `/equipos/:id`: actualizar disponibilidad del equipo.
- PATCH `/prestamos/:id`: actualizar el estado de devolución.

## Reglas del sistema
- El nombre del solicitante debe tener al menos 5 caracteres.
- El carné debe tener formato `0000-00-00000`.
- El préstamo no puede durar más de 3 días.
- Un estudiante no puede tener más de un préstamo activo.
- Al devolver un equipo, vuelve a estar disponible.
- Los préstamos vencidos se resaltan en la tabla.
