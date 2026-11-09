"use strict";

// 01 · CONTROL DE FLUJO Y MANEJO DE ERRORES
function evaluarInscripcion(edadTexto, curso) {
  try {
    // throw interrumpe el camino normal y pasa al catch.
    if (String(edadTexto).trim() === "") {
      throw new Error("Escribe una edad antes de continuar.");
    }

    const edad = Number(edadTexto);
    if (!Number.isInteger(edad)) {
      throw new TypeError("La edad debe ser un número entero.");
    }
    if (edad < 0 || edad > 120) {
      throw new RangeError("La edad debe estar entre 0 y 120.");
    }

    // if...else elige una de las dos respuestas.
    let estado;
    if (edad >= 18) {
      estado = "Puedes inscribirte en este ejemplo.";
    } else {
      estado = "Necesitas ser mayor de edad en este ejemplo.";
    }

    // switch elige el mensaje del curso; break termina el caso.
    let descripcion;
    switch (curso) {
      case "javascript":
        descripcion = "JavaScript: agrega interacción a la página.";
        break;
      case "html":
        descripcion = "HTML: estructura el contenido.";
        break;
      case "css":
        descripcion = "CSS: presenta y distribuye el contenido.";
        break;
      default:
        throw new Error("Selecciona un curso disponible.");
    }

    return { correcto: true, texto: `${estado}\n${descripcion}` };
  } catch (error) {
    // Error y sus subtipos tienen propiedades name y message.
    return { correcto: false, texto: `${error.name}: ${error.message}` };
  }
}

// 02 · BUCLES E ITERACIÓN
function compararBucles(limite) {
  if (!Number.isInteger(limite) || limite < 0 || limite > 12) {
    throw new RangeError("Usa un límite entero de 0 a 12.");
  }

  const conFor = [];
  // Inicializa, comprueba y actualiza el contador.
  for (let i = 1; i <= limite; i++) {
    conFor.push(i);
  }

  const conWhile = [];
  let j = 1;
  // La condición se comprueba ANTES de ejecutar el bloque.
  while (j <= limite) {
    conWhile.push(j);
    j++;
  }

  const conDoWhile = [];
  let k = 1;
  // La condición se comprueba DESPUÉS: ejecuta al menos una vez.
  do {
    conDoWhile.push(k);
    k++;
  } while (k <= limite);

  return { conFor, conWhile, conDoWhile };
}

// 03 · FUNCIONES: DEFINICIÓN, PARÁMETROS Y RETORNO
function calcularTotal(precio, cantidad) {
  // Los parámetros reciben los argumentos de la llamada.
  if (!Number.isFinite(precio) || precio < 0 || precio > 1000000000) {
    throw new RangeError("Usa un precio de 0 a 1 000 000 000.");
  }
  if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 1000) {
    throw new RangeError("Usa una cantidad entera de 1 a 1000.");
  }

  // return devuelve un valor a quien llamó la función.
  return precio * cantidad;
}

// 04 · EXPRESIONES Y OPERADORES
function explorarOperadores(a, b) {
  if (![a, b].every(n => Number.isInteger(n) && n >= -100 && n <= 100)) {
    throw new RangeError("A y B deben ser enteros de −100 a 100.");
  }

  // = asigna; += suma y vuelve a asignar.
  let total = a;
  total += b;

  // Cada expresión se evalúa antes de insertarse en el texto.
  return [
    `ASIGNACIÓN   total = A; total += B → ${total}`,
    "",
    `A + B  → ${a + b}     A - B → ${a - b}`,
    `A * B  → ${a * b}     A / B → ${a / b}`,
    `A % B  → ${a % b}     A ** B → ${a ** b}`,
    "",
    `A === B → ${a === b}    A !== B → ${a !== b}`,
    `A > B   → ${a > b}    A < B   → ${a < b}`,
    `A >= B  → ${a >= b}    A <= B  → ${a <= b}`,
    "",
    `(A > 0 && B > 0) → ${a > 0 && b > 0}`,
    `(A > 0 || B > 0) → ${a > 0 || b > 0}`,
    `!(A === B)        → ${!(a === b)}`,
    "",
    // == permite conversión; === compara también el tipo.
    `5 == "5" → ${5 == "5"}; 5 === "5" → ${5 === "5"}`,
    ...(b === 0 ? ["Con B = 0: / y % pueden producir Infinity o NaN."] : [])
  ].join("\n");
}

// 05 · OBJETOS NUMBER, MATH Y DATE
function explorarObjetos(numeroTexto, fechaTexto) {
  const texto = String(numeroTexto).trim();
  if (texto === "") {
    throw new Error("Escribe un número decimal.");
  }

  // Se acepta coma decimal, sin separadores de miles.
  const numero = Number(texto.replace(",", "."));
  if (!Number.isFinite(numero) || Math.abs(numero) > 1000000000) {
    throw new RangeError("Usa un número finito entre −1 000 000 000 y 1 000 000 000.");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaTexto)) {
    throw new Error("Selecciona una fecha válida.");
  }
  const [anio, mes, dia] = fechaTexto.split("-").map(Number);
  // Constructor con componentes locales: el mes empieza en 0.
  const fecha = new Date(anio, mes - 1, dia);
  if (anio < 1900 || anio > 2100 || fecha.getFullYear() !== anio ||
      fecha.getMonth() !== mes - 1 || fecha.getDate() !== dia) {
    throw new RangeError("La fecha debe existir y estar entre 1900 y 2100.");
  }

  return [
    `Number(texto) → ${numero}`,
    `Number.isFinite(numero) → ${Number.isFinite(numero)}`,
    `numero.toFixed(2) → "${numero.toFixed(2)}" (String)`,
    "",
    `Math.round → ${Math.round(numero)}`,
    `Math.floor → ${Math.floor(numero)}`,
    `Math.ceil  → ${Math.ceil(numero)}`,
    `Math.abs   → ${Math.abs(numero)}`,
    `Math.sqrt  → ${numero >= 0 ? Math.sqrt(numero) : "NaN (número negativo)"}`,
    "",
    `Date → ${fecha.toLocaleDateString("es-CR", { dateStyle: "full" })}`,
    `getFullYear() → ${fecha.getFullYear()}`,
    `getMonth() + 1 → ${fecha.getMonth() + 1}`,
    `getDate() → ${fecha.getDate()}`
  ].join("\n");
}

// 06 · CADENAS LITERALES, PLANTILLAS Y STRING
function transformarTexto(nombre) {
  const original = String(nombre);
  const limpio = original.trim();
  if (limpio === "" || original.length > 60) {
    throw new Error("Escribe un nombre de 1 a 60 unidades de texto.");
  }

  const comillasSimples = '¡Hola';
  const comillasDobles = "JavaScript";
  // Los acentos graves permiten interpolar expresiones con ${}.
  const saludo = `${comillasSimples}, ${limpio}! Bienvenido a ${comillasDobles}.`;

  return [
    `Original → ${JSON.stringify(original)}`,
    `trim()   → ${JSON.stringify(limpio)}`,
    `toUpperCase() → ${limpio.toUpperCase()}`,
    `toLowerCase() → ${limpio.toLowerCase()}`,
    `slice(0, 3)   → ${limpio.slice(0, 3)}`,
    `includes("a") → ${limpio.toLowerCase().includes("a")}`,
    `length (unidades UTF-16) → ${limpio.length}`,
    "",
    `Plantilla → ${saludo}`
  ].join("\n");
}

// 07 · ARREGLOS Y ARREGLOS TIPADOS
function explorarColecciones(listaTexto) {
  const partes = String(listaTexto).split(",").map(parte => parte.trim());
  if (partes.length > 12 || partes.some(parte => !/^-?\d+$/.test(parte))) {
    throw new Error("Escribe de 1 a 12 enteros separados por comas, sin campos vacíos.");
  }

  const numeros = partes.map(Number);
  if (numeros.some(n => !Number.isInteger(n) || n < -1000 || n > 1000)) {
    throw new RangeError("Cada entero debe estar entre −1000 y 1000.");
  }

  // Array: índices desde 0, longitud variable y métodos de recorrido.
  const copia = [...numeros];
  copia.push(99);
  const dobles = numeros.map(n => n * 2);
  const pares = numeros.filter(n => n % 2 === 0);
  const suma = numeros.reduce((acumulado, n) => acumulado + n, 0);

  // Vista de 8 bits: 260 pasa a 4 y −1 pasa a 255.
  const bytes = new Uint8Array(numeros);

  return [
    `Array original → [${numeros.join(", ")}]`,
    `Índice [0] → ${numeros[0]}; length → ${numeros.length}`,
    `push(99) en una copia → [${copia.join(", ")}]`,
    `map(n => n * 2) → [${dobles.join(", ")}]`,
    `filter(pares) → [${pares.join(", ")}]`,
    `reduce(suma) → ${suma}`,
    "",
    `Uint8Array → [${Array.from(bytes).join(", ")}]`,
    `BYTES_PER_ELEMENT → ${Uint8Array.BYTES_PER_ELEMENT}`,
    `byteLength → ${bytes.byteLength}`
  ].join("\n");
}

// 08 · DOM: CINCO FORMAS DE ENCONTRAR OBJETOS HTML
function explorarDOM(metodo, nuevoTitulo) {
  const titulo = String(nuevoTitulo).trim();
  if (titulo === "" || titulo.length > 80) {
    throw new Error("Escribe un título de 1 a 80 unidades de texto.");
  }

  const panel = document.getElementById("domPanel");
  let encontrados;

  switch (metodo) {
    case "id": {
      // ID: encuentra un solo elemento y cambia su texto.
      const elemento = document.getElementById("domTitulo");
      elemento.textContent = titulo;
      elemento.classList.add("wdm-highlight");
      return 'getElementById("domTitulo") → 1 elemento.\ntextContent actualizó el título.';
    }
    case "etiqueta":
      // Etiqueta: todos los <p> dentro del panel, no de toda la página.
      encontrados = panel.getElementsByTagName("p");
      break;
    case "clase":
      // Clase: se escribe el nombre sin punto.
      encontrados = panel.getElementsByClassName("wdm-dom-item");
      break;
    case "selector":
      // querySelector obtiene el primero; querySelectorAll, todos.
      document.querySelector("#domPanel .wdm-dom-item").textContent = titulo;
      encontrados = document.querySelectorAll("#domPanel .wdm-dom-item");
      break;
    case "coleccion": {
      // document.forms reúne formularios; elements reúne sus controles.
      const formulario = document.forms.namedItem("formDom");
      const campo = formulario.elements.namedItem("nuevoTitulo");
      document.getElementById("domTitulo").textContent = campo.value.trim();
      document.getElementById("domTitulo").classList.add("wdm-highlight");
      return `document.forms encontró formDom.\nform.elements encontró el campo: "${campo.value.trim()}".\nControles del formulario: ${formulario.elements.length}.`;
    }
    default:
      throw new Error("Selecciona un método de búsqueda.");
  }

  // Array.from permite recorrer tanto HTMLCollection como NodeList.
  Array.from(encontrados).forEach((elemento, indice) => {
    elemento.textContent = `${titulo} · ${indice + 1}`;
    elemento.classList.add("wdm-highlight");
  });
  return `Método: ${metodo}.\nElementos encontrados y modificados: ${encontrados.length}.`;
}

// 09 · CONECTAR LOS EJEMPLOS CON LA INTERFAZ
function inicializarPagina() {
  const porId = id => document.getElementById(id);
  let temporizadorCopia;

  function mostrar(id, texto, esError = false) {
    // textContent presenta el texto del usuario sin interpretarlo como HTML.
    const salida = porId(id);
    salida.textContent = texto;
    salida.closest(".wdm-result").dataset.state = esError ? "error" : "success";
  }

  function leerNumero(id) {
    const texto = porId(id).value.trim();
    if (texto === "") {
      throw new Error(`Completa el campo «${document.querySelector(`label[for="${id}"]`).textContent}».`);
    }
    return Number(texto);
  }

  function conectarFormulario(id, salida, accion) {
    porId(id).addEventListener("submit", evento => {
      evento.preventDefault();
      try {
        const resultado = accion();
        if (resultado !== undefined) {
          mostrar(salida, resultado);
        }
      } catch (error) {
        mostrar(salida, `${error.name}: ${error.message}`, true);
      }
    });
  }

  conectarFormulario("formControl", "resultadoControl", () => {
    const resultado = evaluarInscripcion(porId("edad").value, porId("curso").value);
    mostrar("resultadoControl", resultado.texto, !resultado.correcto);
  });
  porId("provocarError").addEventListener("click", () => {
    porId("edad").value = "-1";
    porId("formControl").requestSubmit();
  });

  conectarFormulario("formBucles", "resultadoBucles", () => {
    const limite = leerNumero("limite");
    const resultado = compararBucles(limite);
    porId("salidaFor").textContent = resultado.conFor.join(" → ") || "Sin iteraciones";
    porId("salidaWhile").textContent = resultado.conWhile.join(" → ") || "Sin iteraciones";
    porId("salidaDo").textContent = resultado.conDoWhile.join(" → ");
    return limite === 0 ? "Con límite 0, solo do...while ejecuta una vuelta." : `for y while: ${limite} vueltas. do...while: ${resultado.conDoWhile.length} vueltas.`;
  });

  conectarFormulario("formFunciones", "resultadoFunciones", () => {
    const precio = leerNumero("precio");
    const cantidad = leerNumero("cantidad");
    // LLAMADA: los datos del formulario se pasan como argumentos.
    const total = calcularTotal(precio, cantidad);
    const colones = new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC" });
    return `calcularTotal(${precio}, ${cantidad})\n\nreturn → ${total}\nTotal del pedido → ${colones.format(total)}`;
  });

  conectarFormulario("formOperadores", "resultadoOperadores", () =>
    explorarOperadores(leerNumero("valorA"), leerNumero("valorB")));

  conectarFormulario("formNumeros", "resultadoNumeros", () =>
    explorarObjetos(porId("numero").value, porId("fecha").value));

  conectarFormulario("formTexto", "resultadoTexto", () =>
    transformarTexto(porId("nombre").value));

  conectarFormulario("formColecciones", "resultadoColecciones", () =>
    explorarColecciones(porId("lista").value));

  conectarFormulario("formDom", "resultadoDom", () => {
    document.querySelectorAll("#domPanel .wdm-highlight").forEach(elemento => {
      elemento.classList.remove("wdm-highlight");
    });
    const metodo = porId("formDom").elements.namedItem("metodo").value;
    return explorarDOM(metodo, porId("nuevoTitulo").value);
  });

  porId("restaurarDom").addEventListener("click", () => {
    porId("formDom").reset();
    porId("domTitulo").textContent = "Mi panel de práctica";
    const textos = ["Primer elemento", "Segundo elemento", "Encuentra elementos y observa el cambio."];
    porId("domPanel").querySelectorAll("p").forEach((elemento, indice) => {
      elemento.textContent = textos[indice];
    });
    porId("domPanel").querySelectorAll(".wdm-highlight").forEach(elemento => {
      elemento.classList.remove("wdm-highlight");
    });
    mostrar("resultadoDom", "Panel restaurado. Prueba otro método de búsqueda.");
  });

  // Se muestran las funciones reales: explicación y ejecución coinciden.
  const ejemplos = {
    codigoControl: evaluarInscripcion,
    codigoBucles: compararBucles,
    codigoFunciones: calcularTotal,
    codigoOperadores: explorarOperadores,
    codigoNumeros: explorarObjetos,
    codigoTexto: transformarTexto,
    codigoColecciones: explorarColecciones,
    codigoDom: explorarDOM
  };
  Object.entries(ejemplos).forEach(([id, funcion]) => {
    porId(id).textContent = funcion.toString();
  });
  porId("codigoFunciones").textContent += "\n\n// LLAMADA DE EJEMPLO: 2500 y 3 son los argumentos.\nconst total = calcularTotal(2500, 3);\nconsole.log(total); // 7500";

  // Copia con alternativa para apertura local mediante file://.
  document.querySelectorAll("[data-copy]").forEach(boton => {
    boton.addEventListener("click", async () => {
      const codigo = porId(boton.dataset.copy);
      try {
        if (!navigator.clipboard || !window.isSecureContext) {
          throw new Error("La copia automática requiere un contexto seguro.");
        }
        await navigator.clipboard.writeText(codigo.textContent);
        porId("mensajeCopia").textContent = "Código copiado al portapapeles.";
      } catch {
        const seleccion = window.getSelection();
        const rango = document.createRange();
        rango.selectNodeContents(codigo);
        seleccion.removeAllRanges();
        seleccion.addRange(rango);
        porId("mensajeCopia").textContent = "Código seleccionado. Usa Ctrl+C o ⌘C para copiarlo.";
      }
      clearTimeout(temporizadorCopia);
      temporizadorCopia = setTimeout(() => { porId("mensajeCopia").textContent = ""; }, 4000);
    });
  });

}

if (typeof document !== "undefined") {
  inicializarPagina();
}

// Permite verificar las funciones en Node sin cambiar el uso en el navegador.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { evaluarInscripcion, compararBucles, calcularTotal, explorarOperadores, explorarObjetos, transformarTexto, explorarColecciones };
}
