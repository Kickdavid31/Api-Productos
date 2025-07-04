# Api-Productos
Esta API RESTful permite gestionar usuarios y productos con autenticación segura mediante JWT y refresh tokens. Incluye control de roles (`admin` y `user`), operaciones CRUD protegidas por middleware de autenticación y autorización, y está estructurada de forma modular para facilitar el mantenimiento y escalabilidad.

## 🚀 Funcionalidades

- Registro e inicio de sesión de usuarios
- Generación y renovación de tokens JWT
- CRUD completo para productos
- Middleware de autenticación y autorización por rol
- Roles de usuario (`admin`, `user`)
- Estructura organizada por controladores, rutas, modelos y middlewares

## 📁 Estructura del Proyecto

```
src/
├── controllers/     # Lógica de negocio
│   ├── auth.controller.js
│   └── product.controller.js
├── middlewares/     # Verificación de JWT y roles
│   ├── auth.middleware.js
│   └── role.middleware.js
├── models/          # Modelos de Mongoose
│   ├── User.js
│   └── Product.js
├── routes/          # Rutas del API
│   ├── auth.routes.js
│   └── product.routes.js
├── utils/           # Funciones auxiliares
│   └── token.js
└── index.js         # Punto de entrada de la app
```

## 🧪 Requisitos

- Node.js >= 14
- MongoDB (local o en la nube)

## ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu_usuario/mi-api-rest.git
cd mi-api-rest
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto y agrega tus variables de entorno:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/mi_api
JWT_SECRET=tu_secreto_jwt
JWT_REFRESH_SECRET=tu_secreto_refresh
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

4. Ejecuta el proyecto:

```bash
npm run dev
```

## 📡 Endpoints Principales

### Autenticación

| Método | Ruta                | Descripción                  |
|--------|---------------------|------------------------------|
| POST   | /api/auth/register  | Registrar nuevo usuario      |
| POST   | /api/auth/login     | Iniciar sesión               |
| POST   | /api/auth/refresh   | Renovar tokens               |

### Productos (requiere JWT)

| Método | Ruta                  | Rol requerido | Descripción              |
|--------|-----------------------|---------------|--------------------------|
| GET    | /api/products         | user/admin    | Obtener todos los productos |
| GET    | /api/products/:id     | user/admin    | Obtener un producto por ID  |
| POST   | /api/products         | admin         | Crear un nuevo producto     |
| PUT    | /api/products/:id     | admin         | Actualizar producto         |
| DELETE | /api/products/:id     | admin         | Eliminar producto           |

## 👥 Roles

- `admin`: puede crear, leer, actualizar y eliminar productos.
- `user`: puede leer productos solamente.

## 🧩 Tecnologías Utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT (access + refresh tokens)
- Bcrypt.js
- Dotenv

## 🔐 Autenticación

Para acceder a rutas protegidas, se debe enviar el token de acceso en el header:

```
Authorization: Bearer <access_token>
