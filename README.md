# API Productos

API RESTful con Node.js, Express, Mongoose, autenticación JWT & Refresh Token, roles de usuario y CRUD completo para "productos".

## Características
- Registro e inicio de sesión de usuario.
- Autenticación JWT y refresh token.
- CRUD de productos.
- Roles: `admin` y `user` (solo admin puede crear/editar/eliminar productos, ambos pueden ver/listar).
- Protección de rutas vía middlewares.

---

## Instalación

1. Clona el repo y accede al directorio
```
git clone https://github.com/usuario/api-Productos.git
cd api-Productos
```
2. Instala dependencias:
```
npm install
```
3. Configura el archivo `.env` con la URI de MongoDB y secretos JWT. Ejemplo:
```
MONGO_URI=mongodb://localhost:27017/api_productos
JWT_SECRET=supersecretjwtkey
REFRESH_SECRET=supersecretrefreshkey
PORT=3000
```
4. Inicia el servidor:
```
npm run dev
```

---

## Endpoints principales

- POST   `/api/auth/register`        → Registro de usuario
- POST   `/api/auth/login`           → Login, devuelve JWT y refresh token
- POST   `/api/auth/refresh`         → Renovar access token
- POST   `/api/auth/logout`          → Logout
- GET    `/api/products`             → Listar productos (**requiere token**)
- GET    `/api/products/:id`         → Ver un producto (**requiere token**)
- POST   `/api/products`             → Crear producto (**admin**)
- PUT    `/api/products/:id`         → Editar producto (**admin**)
- DELETE `/api/products/:id`         → Eliminar producto (**admin**)


### Ejemplo de login y uso de token:

1. Login:
    ```json
    POST /api/auth/login
    { "username": "admin", "password": "password" }
    Respuesta: { "accessToken": "...", "refreshToken": "..." }
    ```
2. Usar el access token:
    En los headers de tus requests protegidas:
    ```
    Authorization: Bearer TU_ACCESS_TOKEN
    ```

### Crear primer usuario admin
Por defecto el registro crea usuarios con rol "user". Para promover a "admin", actualiza en MongoDB manualmente el documento:

```
db.users.updateOne({username: "admin"}, {$set: {role: "admin"}})
```

---

## Scripts
- `npm run dev`   Ejecuta con nodemon
- `npm start`     Ejecuta normalmente


