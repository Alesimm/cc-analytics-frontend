// esperamos a que el documento html este completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // capturamos los elementos del formulario
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    // definimos los dominios corporativos del club
    const dominiosPermitidos = ["@colocolo.cl", "@ct.colocolo.cl", "@gmail.com"];

    // interceptamos el envio del formulario
    loginForm.addEventListener("submit", (e) => {
        // evitamos que la pagina se recargue al enviar (regla spa)
        e.preventDefault(); 

        // limpiamos los errores visuales antes de volver a validar
        emailError.classList.add("hidden");
        passwordError.classList.add("hidden");
        emailInput.classList.remove("border-red-500");
        passwordInput.classList.remove("border-red-500");

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let formularioValido = true;

        // validacion de correo: que termine en un dominio del club
        const tieneDominioValido = dominiosPermitidos.some(dominio => email.endsWith(dominio));
        
        if (email === "" || !tieneDominioValido) {
            emailError.textContent = "usa un correo corporativo (@colocolo.cl, @ct.colocolo.cl o @gmail.com).";
            emailError.classList.remove("hidden");
            emailInput.classList.add("border-red-500");
            formularioValido = false;
        }

        // validacion de contraseña: longitud estricta entre 4 y 10 caracteres
        if (password.length < 4 || password.length > 10) {
            passwordError.textContent = "la contraseña debe tener entre 4 y 10 caracteres.";
            passwordError.classList.remove("hidden");
            passwordInput.classList.add("border-red-500");
            formularioValido = false;
        }

        // si todo esta correcto, hacemos la transicion spa sin recargar
        if (formularioValido) {
            console.log("acceso autorizado. iniciando sistema corporativo...");
            
            // ocultamos el cuadro de login
            document.getElementById("login-view").classList.add("hidden");
            
            // mostramos el contenedor principal de la aplicacion
            document.getElementById("app-view").classList.remove("hidden");
        }
    });
});