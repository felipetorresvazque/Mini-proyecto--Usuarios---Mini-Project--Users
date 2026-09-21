# Mini proyecto: Usuarios / Mini Project: Users
# por felipe torres vazque (felipesonic) 

### Descripción

Mini aplicación web para gestionar usuarios desde una interfaz HTML. La aplicación utiliza SQLite en el navegador mediante [`sql.js`](https://github.com/sql-js/sql.js), por lo que no necesita un servidor backend ni una base de datos externa para funcionar.

### Cualidades principales

- **CRUD completo:** permite agregar, consultar, modificar y eliminar usuarios.
- **Persistencia inicial mediante SQL:** carga la estructura y los datos de ejemplo desde `sql/usuario.sql`.
- **Base de datos en el navegador:** ejecuta SQLite de forma local usando WebAssembly y `sql.js`.
- **Interfaz sencilla:** incluye campos para `id`, `nombre` y `email`, además de una tabla para visualizar los registros.
- **Selección directa:** al hacer clic en una fila, sus datos se copian al formulario para facilitar la modificación o eliminación.
- **Validación básica:** comprueba que los campos obligatorios estén completos y limita el campo `id` a números.
- **Consultas parametrizadas:** utiliza parámetros en las operaciones `INSERT`, `UPDATE` y `DELETE` para evitar construir consultas con texto ingresado directamente.
- **Diseño responsive:** aprovecha los estilos de W3.CSS y una tabla adaptable para distintos tamaños de pantalla.
- **Código separado por responsabilidades:** HTML, estilos, lógica JavaScript y datos SQL están organizados en archivos independientes.
- **Ordenamiento de registros:** los usuarios se muestran ordenados por `id`.

### Estructura

```text
.
├── index.html
├── README.md
├── css/
│   ├── footer.css
│   └── resulucion.css
├── js/
│   └── sql.js
└── sql/
    └── usuario.sql
```

### Cómo ejecutarlo

1. Abre el proyecto con un servidor local. Por ejemplo, puedes usar **Live Server** en VS Code.
2. Abre `index.html` desde la dirección local proporcionada por el servidor.
3. La aplicación cargará `sql/usuario.sql` y mostrará los usuarios iniciales.

Abrir el archivo directamente con `file://` puede impedir que el navegador cargue el archivo SQL mediante `fetch`.

### Nota sobre los datos

La base de datos se crea en memoria cada vez que se carga la página. Los cambios realizados desde la interfaz se pierden al recargarla, salvo que se implemente una opción adicional de exportación o almacenamiento persistente.

---

## English

### Description

A small web application for managing users through an HTML interface. It uses SQLite in the browser through [`sql.js`](https://github.com/sql-js/sql.js), so it does not require a backend server or an external database to run.

### Main qualities

- **Complete CRUD:** users can be added, viewed, updated, and deleted.
- **SQL-based initial data:** the database schema and sample records are loaded from `sql/usuario.sql`.
- **Browser-based database:** SQLite runs locally through WebAssembly and `sql.js`.
- **Simple interface:** includes fields for `id`, `name`, and `email`, plus a table for displaying records.
- **Direct row selection:** clicking a row copies its data into the form, making updates and deletions easier.
- **Basic validation:** checks that required fields are filled and restricts the `id` field to numeric values.
- **Parameterized queries:** parameters are used for `INSERT`, `UPDATE`, and `DELETE` operations instead of directly concatenating user input into SQL statements.
- **Responsive layout:** uses W3.CSS styles and a responsive table for different screen sizes.
- **Separated responsibilities:** HTML, styles, JavaScript logic, and SQL data are organized into independent files.
- **Record ordering:** users are displayed in `id` order.

### Structure

```text
.
├── index.html
├── README.md
├── css/
│   ├── footer.css
│   └── resulucion.css
├── js/
│   └── sql.js
└── sql/
    └── usuario.sql
```

### How to run it

1. Open the project with a local server. For example, you can use **Live Server** in VS Code.
2. Open `index.html` through the local address provided by the server.
3. The application will load `sql/usuario.sql` and display the initial users.

Opening the file directly with `file://` may prevent the browser from loading the SQL file through `fetch`.

### Data note

The database is created in memory every time the page loads. Changes made through the interface are lost after a reload unless an additional export or persistent storage feature is implemented.
