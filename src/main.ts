interface Personaje {
  id: string;
  nombre: string;
  apodo: string;
  especialidad: string;
  habilidades: string[];
  amigo: string;
  imagen: string;
}

const apiUrl = "http://localhost:3000/personajes";
const personajesContainer = document.getElementById("personajes") as HTMLDivElement;
const inputNombre = document.getElementById("nombre") as HTMLInputElement;
const botonFiltrar = document.getElementById("filtrar") as HTMLButtonElement;

async function obtenerPersonajes(nombre: string): Promise<Personaje[]> {
  let url = apiUrl;
  if (nombre) {
    url += `?nombre_like=${nombre}`;
  }

  try {
    const response = await fetch(url);
    const personajes: Personaje[] = await response.json();
    return personajes;
  } catch (error) {
    console.error("Error al obtener personajes:", error);
    return [];
  }
}

function mostrarPersonajes(personajes: Personaje[]): void {
  personajesContainer.innerHTML = "";

  personajes.forEach((personaje) => {
    const personajeDiv = document.createElement("div");
    personajeDiv.classList.add("personaje");

    const imagenUrl = `http://localhost:3000/${personaje.imagen}`;
    const imagen = document.createElement("img");
    imagen.src = imagenUrl;
    imagen.alt = personaje.nombre;
    personajeDiv.appendChild(imagen);

    const nombreElemento = document.createElement("p");
    nombreElemento.innerHTML = `<strong>Nombre:</strong> ${personaje.nombre}`;
    personajeDiv.appendChild(nombreElemento);

    const especialidadElemento = document.createElement("p");
    especialidadElemento.innerHTML = `<strong>Especialidad:</strong> ${personaje.especialidad}`;
    personajeDiv.appendChild(especialidadElemento);

    const habilidadesElemento = document.createElement("p");
    habilidadesElemento.innerHTML = `<strong>Habilidades:</strong> ${personaje.habilidades.join(", ")}`;
    personajeDiv.appendChild(habilidadesElemento);

    personajesContainer.appendChild(personajeDiv);
  });
}

obtenerPersonajes("").then(mostrarPersonajes);

botonFiltrar.addEventListener("click", () => {
  const nombre = inputNombre.value;
  obtenerPersonajes(nombre).then(mostrarPersonajes);
});
