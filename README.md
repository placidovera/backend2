Entrega 3 - Backend Adoptions API

API REST desarrollada en Node.js + Express + MongoDB para la gestión de usuarios, mascotas y adopciones. Incluye autenticación con JWT, control de roles y documentación Swagger.

Tecnologías utilizadas

Node.js
Express
MongoDB + Mongoose
JWT (jsonwebtoken)
Passport JWT
bcrypt
Docker
Swagger
Winston (logger)

Arquitectura del proyecto

La aplicación está organizada en capas:

app.js → punto de entrada del servidor
routes/ → definición de endpoints
controller/ → lógica de respuesta HTTP
service/ → lógica de negocio
config/dao.js → acceso a base de datos
models/ → esquemas de MongoDB
middleware/ → autenticación y autorización
config/passport.config.js → estrategia JWT

Inicialización del servidor

El servidor se inicializa en app.js:

Carga variables de entorno (dotenv)
Conecta a MongoDB
Inicializa Express
Configura Passport JWT
Registra rutas
Levanta servidor en puerto definido
npm start

Autenticación

El sistema usa JWT:

Login genera token
Token se envía por:
Cookie HTTP-only o
Authorization: Bearer token
Passport valida el token en rutas protegidas

Usuarios Endpoints

POST /api/users/register
POST /api/auth/login
POST /api/auth/logout
GET /session/current

Mascotas (Pets)Endpoints

GET /api/pets
GET /api/pets/:pid
POST /api/pets
PUT /api/pets/:pid 
DELETE /api/pets/:pid

Adopciones Endpoints

POST /api/adoptions/:uid/:pid
GET /api/adoptions
GET /api/adoptions/:aid 

Al adoptar:

la mascota cambia a "adoptado"
se crea registro en Adoptions

Roles
user
admin

Controlado con middleware:

authorizeRole("admin")

Documentación Swagger

Disponible en:

http://localhost:8080/apidocs 

Docker Hub

La imagen del proyecto está disponible en:

https://hub.docker.com/r/placidomartin/entrega3

Ejecutar con Docker

docker pull placidomartin/entrega3:latest
docker run -p 8080:8080 placidomartin/entrega3:latest

Ejemplo de flujo

Register user
Login → obtener token
Crear o ver pets
Adoptar mascota
Ver sesión actual

Estado del proyecto

✔ Auth JWT funcionando
✔ CRUD Pets completo
✔ Sistema de adopciones
✔ Roles admin/user
✔ Swagger documentado
✔ Dockerized

API TESTS (AUTOMATIZADOS)

El proyecto incluye un script de tests manuales para validar todos los endpoints principales de la API.

Ubicación
src/tests/api-tests.js

Cómo ejecutar los tests

Primero levantar el servidor:

node src/app.js

En otra terminal ejecutar:

node src/tests/api-tests.js