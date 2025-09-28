# Issue Tracker App

Una aplicación completa de seguimiento de incidencias con **React + TypeScript** (Frontend) y **Node.js + Express + MongoDB** (Backend).

## 🚀 Inicio Rápido

### Opción 1: Docker (Recomendado - Todo en uno)

```bash
# 1. Clonar el repositorio
git clone <tu-repo>
cd issue-tracker

# 2. Levantar todos los servicios
docker-compose up --build

# 3. Crear datos de prueba (en otra terminal)
docker-compose exec backend npm run seed

# 4. Abrir la aplicación
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
```

### Opción 2: Desarrollo Local

#### Paso 1: Base de Datos
```bash
# Levantar solo MongoDB
docker-compose up mongodb -d
```

#### Paso 2: Backend
```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Crear datos de prueba
npm run seed

# Ejecutar en modo desarrollo
npm run dev
```

#### Paso 3: Frontend
```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

#### Paso 4: Abrir la aplicación
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 🔑 Credenciales de Prueba

```
Email: admin@test.com
Password: 123456
```

## ✨ Características

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Base de datos**: MongoDB
- **Autenticación**: JWT
- **CRUD completo**: Crear, leer, actualizar y eliminar issues
- **Filtros avanzados**: Por estado, prioridad y búsqueda de texto
- **Paginación inteligente**: Navegación automática entre páginas
- **Diseño responsive**: Funciona en móvil y desktop
- **Notificaciones**: Confirmación de acciones

## 📁 Estructura del Proyecto

```
issue-tracker/
├── frontend/                # React + TypeScript
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/          # Páginas principales
│   │   ├── services/       # Servicios API
│   │   └── types/          # Tipos TypeScript
│   └── package.json
├── backend/                 # Node.js + Express
│   ├── src/
│   │   ├── models/         # Modelos MongoDB
│   │   ├── routes/         # Rutas API
│   │   ├── middleware/     # Middleware JWT
│   │   └── scripts/        # Scripts de seed
│   └── package.json
├── docker-compose.yml       # Configuración Docker
└── README.md
```

## 🛠️ Scripts Disponibles

### Frontend
```bash
cd frontend
npm run dev      # Desarrollo
npm run build    # Compilar para producción
npm run preview  # Vista previa de producción
npm run lint     # Linter
```

### Backend
```bash
cd backend
npm run dev      # Desarrollo con nodemon
npm run build    # Compilar TypeScript
npm start        # Producción
npm run seed     # Crear datos de prueba
```

## 🌐 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión

### Issues
- `GET /api/issues` - Listar issues (con filtros)
- `POST /api/issues` - Crear issue
- `GET /api/issues/:id` - Obtener issue específico
- `PUT /api/issues/:id` - Actualizar issue
- `DELETE /api/issues/:id` - Eliminar issue

### Filtros disponibles
```
?page=1&limit=10&status=open&priority=high&search=texto
```

## 🐛 Solución de Problemas

### "No se puede conectar al frontend"
```bash
# Verificar que el frontend esté corriendo en puerto 3000
cd frontend && npm run dev
```

### "Error de autenticación"
```bash
# Ejecutar el seed para crear el usuario de prueba
cd backend && npm run seed
```

### "Error de conexión a MongoDB"
```bash
# Verificar que MongoDB esté corriendo
docker-compose up mongodb -d
```

### "Puerto ocupado"
```bash
# Cambiar puertos en docker-compose.yml si es necesario
# Frontend: puerto 3000
# Backend: puerto 3001
# MongoDB: puerto 27017
```

## 📝 Variables de Entorno

Crear archivo `backend/.env`:

```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://mongodb:27017/issue_tracker
JWT_SECRET=your-super-secret-jwt-key-here
```

## ✅ Estado del Proyecto

- [x] Backend API completa con TypeScript
- [x] Frontend React + TypeScript
- [x] Autenticación JWT
- [x] CRUD completo de issues
- [x] Filtros y paginación
- [x] Modales y formularios
- [x] Notificaciones de usuario
- [x] Diseño responsive
- [x] Docker setup completo
- [ ] Tests unitarios (próximamente)
- [ ] Tests de integración (próximamente)

---

**¿Necesitas ayuda?** Revisa la sección de solución de problemas o crea un issue en el repositorio.
