# 🎯 Issue Tracker App

Aplicación de seguimiento de incidencias con **React + TypeScript** y **Node.js + Express + MongoDB**.

---

## ⚡ Ejecutar en 30 segundos

```bash
# 1. Clonar
git clone https://github.com/Adrian8422/issues-tracker.git
cd issues-tracker

# 2. Levantar todo con Docker
docker-compose up --build

# 3. Crear datos de prueba (nueva terminal)
docker-compose exec backend npm run seed
```

**✅ Listo!** 
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001

---

## � Login

```
Email: admin@test.com
Password: 123456
```

---

## 🛠️ Sin Docker (Manual)

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### MongoDB
```bash
docker-compose up mongodb -d
```

---

## ✅ Funcionalidades

- ✅ **Login** con JWT
- ✅ **CRUD Issues** (crear, ver, editar, eliminar)
- ✅ **Filtros** por estado y prioridad
- ✅ **Búsqueda** en título/descripción
- ✅ **Paginación**
- ✅ **Validaciones** y manejo de errores
- ✅ **TypeScript** en frontend y backend
- ✅ **Tests** automatizados
- ✅ **Docker** setup completo

---

## 🧪 Tests

```bash
# Frontend
cd frontend && npm test

# Backend
cd backend && npm test
```

---

## 📋 API Endpoints

```http
POST /api/auth/login
GET  /api/issues?page=1&limit=10&status=open&priority=high&search=bug
POST /api/issues
PUT  /api/issues/:id
DELETE /api/issues/:id
```

---

## 🐛 Problemas?

```bash
# Verificar servicios
docker ps

# Recrear todo
docker-compose down
docker-compose up --build

# Datos de prueba
docker-compose exec backend npm run seed
```

---

## 📁 Estructura

```
├── backend/     # Node.js + Express + MongoDB
├── frontend/    # React + TypeScript + Vite
└── docker-compose.yml
```

**¡Eso es todo!** 🚀
