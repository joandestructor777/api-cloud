# 📘 API REST – Libros & Autores  
Backend en Node.js + Express + PostgreSQL (Neon) desplegado en Render  
Actividad 8 – Computación en la Nube

---

## 📌 Descripción  
Este proyecto implementa una **API REST CRUD** para gestionar dos entidades:

- **Autores**
- **Libros**

La base de datos está alojada en **NeonDB** y el backend está desplegado en **Render**.

---

## 🚀 Tecnologías Usadas
- Node.js
- Express.js
- PostgreSQL (Neon)
- Render.com
- REST Client / Postman / Thunder Client

---

## 🌐 URL DEL API (PRODUCCIÓN)
```
https://api-cloud-zsmj.onrender.com

```
---
```
## Estructura del proyecto
mi-proyecto-api/
├── server.js
├── database/
│ └── database_connection.js
├── package.json
├── .env
├── README.md
└── requests.http
```


---

## 🔐 Variables de Entorno

Crea un archivo `.env`:

```env
PORT=3000
DATABASE_URL=postgresql://TU_URL_DE_NEON

```

---

## GET LIBROS (OBTIENE TODOS LOS LIBROS)
```
[
  {
    "id": 1,
    "titulo": "Cien años de soledad",
    "ano_publicacion": 1967,
    "id_autor": 1
  }
]
```

## CONSULTAS EN HTTP PARA APIREST

### Obtener todos los libros
GET http://localhost:3000/libros

### Obtener libro por ID
GET http://localhost:3000/libros/1

### Crear libro
POST http://localhost:3000/libros
Content-Type: application/json

{
  "titulo": "Prueba",
  "ano_publicacion": 2001,
  "id_autor": 1
}

### Actualizar libro
PUT http://localhost:3000/libros/1
Content-Type: application/json

{
  "titulo": "Libro actualizado",
  "ano_publicacion": 2020,
  "id_autor": 1
}

### Eliminar libro
DELETE http://localhost:3000/libros/1

![Imagen de la nube conectada](./foto.png)
