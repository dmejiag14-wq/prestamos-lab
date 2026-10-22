
# Préstamos Lab — 0902-23-15690

## Descripción

Aplicación web desarrollada para administrar el inventario de equipos y controlar los préstamos y las devoluciones de una institución.

**Estudiante:** DANIEL ESAU MEJIA GARCIA  
**Carné:** 0902-23-15690

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- JSON Server
- CSS

## Requisitos

- Node.js y npm instalados.
- Git para clonar el repositorio.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/dmejiag14-wq/prestamos-lab.git
```

Ingresar a la carpeta e instalar las dependencias:

```bash
cd prestamos-lab
npm install
```

Crear un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
VITE_API_URL=http://localhost:3001
```

## Ejecutar el proyecto

**1. Iniciar la API**

Abrir una terminal y ejecutar:

```bash
npm run api
```

La API estará disponible en `http://localhost:3001`.

**2. Iniciar la aplicación**

Abrir una segunda terminal y ejecutar:

```bash
npm run dev
```

Abrir en el navegador la dirección indicada por Vite, normalmente `http://localhost:5173`.

## Funcionalidades

- Visualizar el inventario de equipos.
- Filtrar equipos por categoría y disponibilidad.
- Registrar préstamos mediante un formulario validado.
- Consultar préstamos activos ordenados por fecha límite.
- Identificar préstamos vencidos.
- Registrar devoluciones y actualizar la disponibilidad.
- Mostrar mensajes de error y permitir reintentar la carga de datos.

## Reglas del sistema

- Se administran laptops, proyectores y routers.
- El nombre del solicitante debe tener al menos cinco caracteres.
- El carné debe cumplir el formato `0000-00-00000`.
- La fecha del préstamo no puede ser anterior al día actual.
- La duración máxima del préstamo es de tres días.
- Cada estudiante puede tener como máximo un préstamo activo.
- Al devolver un equipo, su disponibilidad se actualiza.
- Los préstamos vencidos se resaltan en la tabla.

## Endpoints de la API

| Método | Endpoint | Función |
|
| GET | `/equipos` | Consultar equipos |
| GET | `/prestamos?devuelto=false` | Consultar préstamos |
| POST | `/prestamos` | Registrar un préstamo |
| PATCH | `/equipos/:id` | Actualizar disponibilidad |
| PATCH | `/prestamos/:id` | Actualizar devolución |


