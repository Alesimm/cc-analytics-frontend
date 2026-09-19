document.addEventListener("submit", (e) => {
    
    // nos aseguramos que el click venga especificamente de este formulario
    if (e.target && e.target.id === "soporte-form") {
        
        // evitamos que la pagina recargue
        e.preventDefault();

        // capturamos todos los campos del formulario
        const nombre = document.getElementById("soporte-nombre");
        const correo = document.getElementById("soporte-correo");
        const motivo = document.getElementById("soporte-motivo");
        const comentario = document.getElementById("soporte-comentario");
        
        // capturamos los parrafos ocultos donde iran los errores
        const errNombre = document.getElementById("error-nombre");
        const errCorreo = document.getElementById("error-correo");
        const errMotivo = document.getElementById("error-motivo");
        const errComentario = document.getElementById("error-comentario");
        const msjExito = document.getElementById("soporte-exito");

        // limpiamos todos los bordes rojos y ocultamos alertas viejas
        [nombre, correo, motivo, comentario].forEach(input => input.classList.remove("border-red-500", "bg-red-50"));
        [errNombre, errCorreo, errMotivo, errComentario, msjExito].forEach(msg => msg.classList.add("hidden"));

        let esValido = true;
        const dominiosPermitidos = ["@colocolo.cl", "@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

        // validacion del nombre: que no este vacio y no pase de 100 caracteres
        const valNombre = nombre.value.trim();
        if (valNombre === "" || valNombre.length > 100) {
            errNombre.textContent = "El nombre es obligatorio y debe tener máximo 100 caracteres.";
            errNombre.classList.remove("hidden");
            nombre.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // validacion del correo formato correcto y dominios autorizados
        const valCorreo = correo.value.trim();
        const dominioValido = dominiosPermitidos.some(dominio => valCorreo.endsWith(dominio));
        if (valCorreo === "" || !dominioValido) {
            errCorreo.textContent = "Usa un correo válido (@colocolo.cl, @duoc.cl, @profesor.duoc.cl, @gmail.com).";
            errCorreo.classList.remove("hidden");
            correo.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // validacion del selector de motivos
        if (motivo.value === "") {
            errMotivo.textContent = "Debes seleccionar un motivo de contacto.";
            errMotivo.classList.remove("hidden");
            motivo.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // validacion del mensaje: maximo 500 caracteres
        const valComentario = comentario.value.trim();
        if (valComentario === "" || valComentario.length > 500) {
            errComentario.textContent = "El comentario es obligatorio y debe tener máximo 500 caracteres.";
            errComentario.classList.remove("hidden");
            comentario.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // si todas las validaciones pasan limpiamos el formulario
        if (esValido) {
            e.target.reset();
            // mostramos el cuadro verde de exito al final
            msjExito.classList.remove("hidden");
            console.log("el ticket fue procesado correctamente");
        }
    }
});