// usamos delegacion de eventos para que funcione dentro de la spa
document.addEventListener("submit", (e) => {
    
    // verificamos si el evento viene especificamente del formulario de soporte
    if (e.target && e.target.id === "soporte-form") {
        
        // bloqueamos recarga
        e.preventDefault();

        // capturamos campos
        const nombre = document.getElementById("soporte-nombre");
        const correo = document.getElementById("soporte-correo");
        const motivo = document.getElementById("soporte-motivo");
        const comentario = document.getElementById("soporte-comentario");
        
        // capturamos textos de error
        const errNombre = document.getElementById("error-nombre");
        const errCorreo = document.getElementById("error-correo");
        const errMotivo = document.getElementById("error-motivo");
        const errComentario = document.getElementById("error-comentario");
        const msjExito = document.getElementById("soporte-exito");

        // reiniciamos estilos visuales
        [nombre, correo, motivo, comentario].forEach(input => input.classList.remove("border-red-500", "bg-red-50"));
        [errNombre, errCorreo, errMotivo, errComentario, msjExito].forEach(msg => msg.classList.add("hidden"));

        let esValido = true;
        const dominiosPermitidos = ["@colocolo.cl", "@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

        // 1. validamos nombre (max 100 caracteres y no vacio)
        const valNombre = nombre.value.trim();
        if (valNombre === "" || valNombre.length > 100) {
            errNombre.textContent = "El nombre es obligatorio y debe tener máximo 100 caracteres.";
            errNombre.classList.remove("hidden");
            nombre.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // 2. validamos correo
        const valCorreo = correo.value.trim();
        const dominioValido = dominiosPermitidos.some(dominio => valCorreo.endsWith(dominio));
        if (valCorreo === "" || !dominioValido) {
            errCorreo.textContent = "Usa un correo válido (@colocolo.cl, @duoc.cl, @profesor.duoc.cl, @gmail.com).";
            errCorreo.classList.remove("hidden");
            correo.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // 3. validamos motivo (lista desplegable)
        if (motivo.value === "") {
            errMotivo.textContent = "Debes seleccionar un motivo de contacto.";
            errMotivo.classList.remove("hidden");
            motivo.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // 4. validamos comentario (max 500 caracteres y no vacio)
        const valComentario = comentario.value.trim();
        if (valComentario === "" || valComentario.length > 500) {
            errComentario.textContent = "El comentario es obligatorio y debe tener máximo 500 caracteres.";
            errComentario.classList.remove("hidden");
            comentario.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // si todo pasa, inyectamos feedback visual de exito
        if (esValido) {
            // limpiamos formulario
            e.target.reset();
            // mostramos mensaje verde
            msjExito.classList.remove("hidden");
            console.log("ticket de soporte generado exitosamente.");
        }
    }
});