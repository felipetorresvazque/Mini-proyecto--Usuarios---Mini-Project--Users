let SQL;
let db;

async function iniciar() {
  try {
    SQL = await initSqlJs({
      locateFile: (archivo) =>
        `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${archivo}`,
    });

    db = new SQL.Database();

    const respuesta = await fetch("./sql/usuario.sql");
    if (!respuesta.ok) {
      throw new Error(`No se pudo cargar usuario.sql: ${respuesta.status}`);
    }
    const contenidoSQL = await respuesta.text();

    db.run(contenidoSQL);
    mostrarUsuarios();

    console.log("Base de datos cargada correctamente");
  } catch (error) {
    console.error("Error al cargar SQLite:", error);
  }
}

// ---------- LEER (SELECT) ----------
function mostrarUsuarios() {
  if (!db) {
    alert("La base de datos aún no está cargada");
    return;
  }

  const resultado = db.exec(
    "SELECT id, nombre, email FROM usuarios ORDER BY id",
  );
  const cuerpoTabla = document.getElementById("tabla-usuarios");
  cuerpoTabla.replaceChildren();

  if (resultado.length === 0) {
    cuerpoTabla.innerHTML =
      '<tr><td colspan="3">No hay usuarios registrados</td></tr>';
    return;
  }

  resultado[0].values.forEach((registro) => {
    const filaTabla = document.createElement("tr");

    registro.forEach((valor) => {
      const celda = document.createElement("td");
      celda.textContent = valor ?? "";
      filaTabla.appendChild(celda);
    });

    // Al hacer clic en una fila, sus datos pasan al formulario
    // (así puedes modificar o eliminar ese usuario)
    filaTabla.addEventListener("click", () => {
      document.getElementById("id_input").value = registro[0];
      document.getElementById("nombre_input").value = registro[1];
      document.getElementById("email_input").value = registro[2];
    });

    cuerpoTabla.appendChild(filaTabla);
  });
}

// ---------- Leer los campos del formulario ----------
function leerFormulario() {
  return {
    id: document.getElementById("id_input").value.trim(),
    nombre: document.getElementById("nombre_input").value.trim(),
    email: document.getElementById("email_input").value.trim(),
  };
}

// ---------- GUARDAR (INSERT) ----------
function agregar() {
  if (!db) return alert("La base de datos aún no está cargada");

  const datos = leerFormulario();
  if (!datos.id || !datos.nombre || !datos.email) {
    alert("Completa id, nombre y email");
    return;
  }

  if (!email_valido(datos.email)) {
    alert("El email no es válido");
    return;
  }

  try {
    db.run("INSERT INTO usuarios (id, nombre, email) VALUES (?, ?, ?)", [
      Number(datos.id),
      datos.nombre,
      datos.email,
    ]);
    limpiar();
    mostrarUsuarios();
  } catch (error) {
    // Ejemplo: el id ya existe (PRIMARY KEY repetida)
    alert("No se pudo agregar. ¿Ese id ya existe?");
    console.error(error);
  }
}

// ---------- MODIFICAR (UPDATE) ----------
function modificar() {
  if (!db) return alert("La base de datos aún no está cargada");

  const datos = leerFormulario();
  if (!datos.id || !datos.nombre || !datos.email) {
    alert("Completa id, nombre y email");
    return;
  }

  if (!email_valido(datos.email)) {
    alert("El email no es válido");
    return;
  }

  try {
    db.run("UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?", [
      datos.nombre,
      datos.email,
      Number(datos.id),
    ]);

    // getRowsModified() dice cuántas filas cambió el último comando
    if (db.getRowsModified() === 0) {
      alert("No existe un usuario con ese id");
      return;
    }
    limpiar();
    mostrarUsuarios();
  } catch (error) {
    alert("No se pudo modificar");
    console.error(error);
  }
}

// ---------- BORRAR (DELETE) ----------
function eliminar() {
  if (!db) return alert("La base de datos aún no está cargada");

  const datos = leerFormulario();
  if (!datos.id) {
    alert("Selecciona un usuario de la tabla o escribe su id");
    return;
  }

  if (!confirm(`¿Eliminar al usuario con id ${datos.id}?`)) return;

  try {
    db.run("DELETE FROM usuarios WHERE id = ?", [Number(datos.id)]);

    if (db.getRowsModified() === 0) {
      alert("No existe un usuario con ese id");
      return;
    }
    limpiar();
    mostrarUsuarios();
  } catch (error) {
    alert("No se pudo eliminar");
    console.error(error);
  }
}

// ---------- Utilidades ----------
function limpiar() {
  document.getElementById("id_input").value = "";
  document.getElementById("nombre_input").value = "";
  document.getElementById("email_input").value = "";
}
//------------Seguridad-------------
function solonumero(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}

function bloquear_comillas(input) {
  input.value = input.value.replace(/['"]/g, "");
}

function email_valido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

//_----------------------------------------------
// ---------- Eventos ----------
document.getElementById("id_input").addEventListener("input", function () {
  solonumero(this);
});

document.getElementById("id_input").addEventListener("input", function () {
  bloquear_comillas(this);
});

document.getElementById("nombre_input").addEventListener("input", function () {
  bloquear_comillas(this);
});

document.getElementById("email_input").addEventListener("input", function () {
  bloquear_comillas(this);
});

document.getElementById("btn_agregar").addEventListener("click", agregar);
document.getElementById("btn_modificar").addEventListener("click", modificar);
document.getElementById("btn_eliminar").addEventListener("click", eliminar);
document.getElementById("btn_limpiar").addEventListener("click", limpiar);
document
  .getElementById("btn_mostrar-usuarios")
  .addEventListener("click", mostrarUsuarios);

iniciar();
