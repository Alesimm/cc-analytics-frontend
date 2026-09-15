// esperamos a que el documento html este completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // capturamos los elementos del formulario del dom
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    // dominios hibridos: requeridos por el profesor + identidad del club
    const dominiosPermitidos = ["@colocolo.cl", "@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    // interceptamos el clic en el boton ingresar
    loginForm.addEventListener("submit", (e) => {
        // evitamos que el navegador recargue la pagina (regla de oro spa)
        e.preventDefault(); 

        // paso 1: limpiamos los errores visuales de intentos anteriores
        emailError.classList.add("hidden");
        passwordError.classList.add("hidden");
        emailInput.classList.remove("border-red-500");
        passwordInput.classList.remove("border-red-500");

        // capturamos lo que el usuario escribio quitando espacios en blanco
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let formularioValido = true;

        // paso 2: validacion de correo
        const tieneDominioValido = dominiosPermitidos.some(dominio => email.endsWith(dominio));
        
        if (email === "" || !tieneDominioValido) {
            // inyectamos el error en el dom mostrando la esencia del proyecto
            emailError.textContent = "usa un correo valido (ej: @colocolo.cl o @duoc.cl).";
            emailError.classList.remove("hidden");
            emailInput.classList.add("border-red-500");
            formularioValido = false;
        }

        // paso 3: validacion de contraseña estricta
        if (password.length < 4 || password.length > 10) {
            // inyectamos el error en el dom sin usar alerts
            passwordError.textContent = "la contraseña debe tener entre 4 y 10 caracteres.";
            passwordError.classList.remove("hidden");
            passwordInput.classList.add("border-red-500");
            formularioValido = false;
        }

        // paso 4: transicion spa si no hay errores
        if (formularioValido) {
            console.log("acceso autorizado. iniciando transicion spa...");
            
            // ocultamos el login entero
            document.getElementById("login-view").classList.add("hidden");
            
            // revelamos el contenedor de la aplicacion
            document.getElementById("app-view").classList.remove("hidden");
        }
    });
});