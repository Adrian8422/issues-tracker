# Issue Tracker App

Una aplicación de seguimiento de incidencias desarrollada con Node.js, Express, MongoDB, React y TypeScript.

## 📋 Características

- **Backend**: Node.js + Express + MongoDB + TypeScript
- **Frontend**: React + TypeScript (próximamente)
- **Autenticación**: JWT
- **Base de datos**: MongoDB
- **Containerización**: Docker

## 🚀 Instalación y Ejecución

### Opción 1: Con Docker (Recomendado)

```bash
# 1. Clonar y navegar al proyecto
cd issue-tracker

# 2. Levantar todos los servicios
docker-compose up --build

# 3. En otra terminal, ejecutar el seed para crear datos de prueba
docker-compose exec backend npm run seed
```

### Opción 2: Instalación Manual

#### Paso 1: Levantar MongoDB
```bash
# Desde la carpeta issue-tracker
docker-compose up mongodb -d
```

#### Paso 2: Configurar Backend
```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env (copiar desde .env.example)
cp .env.example .env

# Ejecutar seed para crear datos de prueba
npm run seed

# Levantar el servidor en modo desarrollo
npm run dev
```

## 🔑 Credenciales de Prueba

Después de ejecutar el seed, usa estas credenciales:

- **Email**: `admin@test.com`
- **Password**: `123456`

## 🧪 Probar la Autenticación

### 1. Login (POST)
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "123456"
  }'
```

**Respuesta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "admin@test.com"
  }
}
```

### 2. Listar Issues (GET)
```bash
# Usar el token obtenido del login
curl -X GET http://localhost:3001/api/issues \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### 3. Crear Issue (POST)
```bash
curl -X POST http://localhost:3001/api/issues \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "title": "Nuevo issue de prueba",
    "description": "Descripción del issue",
    "priority": "high",
    "status": "open"
  }'
```

## 📁 Estructura del Proyecto

```
issue-tracker/
├── backend/
│   ├── src/
│   │   ├── models/          # Modelos de MongoDB
│   │   ├── routes/          # Rutas de la API
│   │   ├── middleware/      # Middleware de autenticación
│   │   ├── scripts/         # Scripts de seed
│   │   └── index.ts         # Punto de entrada
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── frontend/                # (Próximamente)
├── docker-compose.yml
└── README.md
```

## 🔧 Scripts Disponibles

### Backend
```bash
cd backend

# Desarrollo
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar en producción
npm start

# Crear datos de prueba
npm run seed
```

## 🌐 Endpoints de la API

### Autenticación
- `POST /api/auth/login` - Iniciar sesión

### Issues
- `GET /api/issues` - Listar issues (con filtros y paginación)
- `POST /api/issues` - Crear issue
- `GET /api/issues/:id` - Obtener issue específico
- `PUT /api/issues/:id` - Actualizar issue
- `DELETE /api/issues/:id` - Eliminar issue

### Parámetros de filtrado (GET /api/issues)
- `page` - Número de página (default: 1)
- `limit` - Elementos por página (default: 10)
- `status` - Filtrar por estado: `open`, `in_progress`, `closed`
- `priority` - Filtrar por prioridad: `low`, `medium`, `high`
- `search` - Buscar en título y descripción

**Ejemplo:**
```
GET /api/issues?page=1&limit=5&status=open&priority=high&search=login
```

## 🐛 Solución de Problemas

### Error: "service backend is not running"
```bash
# Verificar servicios
docker-compose ps

# Levantar servicios
docker-compose up --build
```

### Error: "Invalid credentials"
```bash
# Asegúrate de ejecutar el seed
npm run seed

# Verificar credenciales:
# Email: admin@test.com
# Password: 123456
```

### Error de conexión a MongoDB
```bash
# Verificar que MongoDB esté corriendo
docker-compose up mongodb -d

# Verificar logs
docker-compose logs mongodb
```

## 📝 Variables de Entorno

Crear archivo `.env` en la carpeta `backend/`:

```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://mongodb:27017/issue_tracker
JWT_SECRET=your-super-secret-jwt-key-here
```

## ✅ Estado del Proyecto

- [x] Backend API completa
- [x] Autenticación JWT
- [x] CRUD de Issues
- [x] Filtros y paginación
- [x] Seed de datos de prueba
- [x] Docker setup
- [ ] Frontend React (próximamente)
- [ ] Tests unitarios (opcional)