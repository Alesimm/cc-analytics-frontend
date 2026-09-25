document.addEventListener("click", (e) => {
    
    // animacion para abrir el formulario
    if (e.target && (e.target.id === "btn-add-jugador" || e.target.closest("#btn-add-jugador"))) {
        const formContainer = document.getElementById("form-container-jugador");
        if (formContainer) {
            formContainer.classList.remove("hidden");
            // usamos un pequeño retraso para que css procese la animacion de opacidad
            setTimeout(() => {
                formContainer.classList.remove("opacity-0", "translate-y-[-10px]");
            }, 10);
        }
    }

    // animacion para cerrar el formulario
    if (e.target && (e.target.id === "btn-close-jugador" || e.target.closest("#btn-close-jugador"))) {
        const formContainer = document.getElementById("form-container-jugador");
        if (formContainer) {
            formContainer.classList.add("opacity-0", "translate-y-[-10px]");
            setTimeout(() => {
                formContainer.classList.add("hidden");
                document.getElementById("plantel-form").reset();
            }, 300); // esperamos 300ms que termine la animacion para ocultarlo
        }
    }
});

// validacion y creacion del jugador en el dom
document.addEventListener("submit", (e) => {
    if (e.target && e.target.id === "plantel-form") {
        e.preventDefault(); // evitamos la recarga nativa

        // nodos
        const nombre = document.getElementById("jugador-nombre");
        const edad = document.getElementById("jugador-edad");
        const dorsal = document.getElementById("jugador-dorsal");

        const errNombre = document.getElementById("err-jugador-nombre");
        const errEdad = document.getElementById("err-jugador-edad");
        const errDorsal = document.getElementById("err-jugador-dorsal");
        const msjExito = document.getElementById("plantel-exito");

        // limpiar errores
        [nombre, edad, dorsal].forEach(input => input.classList.remove("border-red-500", "bg-red-50"));
        [errNombre, errEdad, errDorsal, msjExito].forEach(msg => msg.classList.add("hidden"));

        let esValido = true;

        // validacion nombre
        const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const valNombre = nombre.value.trim();
        if (valNombre === "" || !regexLetras.test(valNombre)) {
            errNombre.textContent = "ingresa un nombre válido (solo letras).";
            errNombre.classList.remove("hidden");
            nombre.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // validacion edad
        const valEdad = parseInt(edad.value.trim(), 10);
        if (isNaN(valEdad) || valEdad < 16 || valEdad > 45) {
            errEdad.textContent = "la edad debe estar entre 16 y 45 años.";
            errEdad.classList.remove("hidden");
            edad.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // validacion dorsal
        const valDorsal = parseInt(dorsal.value.trim(), 10);
        if (isNaN(valDorsal) || valDorsal < 1 || valDorsal > 99) {
            errDorsal.textContent = "el dorsal debe ser numérico entre 1 y 99.";
            errDorsal.classList.remove("hidden");
            dorsal.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // si todo esta bien creamos la tarjeta del jugador y la mostramos
        if (esValido) {
            // construimos el bloque html del nuevo jugador
            const nuevaTarjetaHTML = `
                <div class="border-2 border-black bg-white p-6 flex flex-col items-center text-center relative transition-all duration-500 animate-[pulse_0.5s_ease-in-out]">
                    <span class="absolute top-4 left-4 font-bold text-xs border border-black px-2 py-0.5">${valDorsal}</span>
                    <div class="w-20 h-20 bg-gray-200 border-2 border-black rounded-full flex items-center justify-center mb-4 text-gray-500">
                        <i class="fa-solid fa-user text-3xl"></i>
                    </div>
                    <h3 class="font-bold text-base mb-2">${valNombre}</h3>
                    <span class="border-2 border-black px-4 py-1 rounded-full text-xs font-semibold uppercase mb-6 bg-yellow-100">Nuevo Fichaje</span>
                    <a href="#" class="text-xs font-bold hover:underline">Ver ficha &gt;</a>
                </div>
            `;

            // lo inyectamos al principio del contenedor con el afterbegin
            const gridJugadores = document.getElementById("grid-jugadores");
            if(gridJugadores) {
                gridJugadores.insertAdjacentHTML('afterbegin', nuevaTarjetaHTML);
            }

            // limpiamos y mostramos exito
            e.target.reset();
            msjExito.classList.remove("hidden");
            
            // ocultamos el mensaje despues de 3 segundos
            setTimeout(() => {
                msjExito.classList.add("hidden");
            }, 3000);
        }
    }
});