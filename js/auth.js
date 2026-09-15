// esperamos a que el documento cargue
document.addEventListener("DOMContentLoaded", () => {
    
    // agarramos los elementos que vamos a utilizar
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const bgImage = document.getElementById("bg-image");

    // correos permitidos en la plataforma
    const dominiosPermitidos = ["@colocolo.cl", "@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    // evento al intentar iniciar sesion
    loginForm.addEventListener("submit", (e) => {
        // evitamos que la pagina recargue
        e.preventDefault(); 

        // limpiamos las alertas rojas viejas
        emailError.classList.add("hidden");
        passwordError.classList.add("hidden");
        emailInput.classList.remove("border-red-500", "bg-red-50");
        passwordInput.classList.remove("border-red-500", "bg-red-50");

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let esValido = true;

        // comprobamos que el dominio exista en nuestra lista
        const dominioValido = dominiosPermitidos.some(dominio => email.endsWith(dominio));
        
        if (email === "" || !dominioValido) {
            // mostramos error formal de correo
            emailError.textContent = "Por favor, ingresa un correo corporativo válido (ej: @colocolo.cl o @duoc.cl).";
            emailError.classList.remove("hidden");
            emailInput.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // comprobamos que la clave tenga el largo correcto
        if (password.length < 4 || password.length > 10) {
            // mostramos error formal de contraseña
            passwordError.textContent = "La contraseña debe contener estrictamente entre 4 y 10 caracteres.";
            passwordError.classList.remove("hidden");
            passwordInput.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // entramos al sistema si todo es correcto
        if (esValido) {
            // ocultamos el formulario suavemente
            const loginView = document.getElementById("login-view");
            loginView.classList.add("opacity-0", "scale-95");
            
            // esperamos medio segundo para el cambio visual
            setTimeout(() => {
                loginView.classList.add("hidden");
                
                // mostramos el contenedor principal
                document.getElementById("app-view").classList.remove("hidden");
                
                // difuminamos el fondo para darle estilo premium a las paginas internas
                bgImage.classList.add("blur-[2px]", "opacity-50");
                
                // inyectamos el home.html usando nuestro router
                if (typeof window.cargarVista === 'function') {
                    window.cargarVista('pages/home.html');
                }
            }, 500); 
        }
    });
});