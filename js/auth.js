// logica de validacion para el inicio de sesion
document.addEventListener("DOMContentLoaded", () => {
    
    // capturamos los inputs y parrafos de error del dom
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const bgImage = document.getElementById("bg-image");

    // lista de dominios
    const dominiosPermitidos = ["@colocolo.cl", "@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    // escuchamos el evento cuando envian el formulario
    loginForm.addEventListener("submit", (e) => {
        // evitamos que la pagina se recargue
        e.preventDefault(); 

        // escondemos los mensajes de error y quitamos los bordes rojos
        emailError.classList.add("hidden");
        passwordError.classList.add("hidden");
        emailInput.classList.remove("border-red-500", "bg-red-50");
        passwordInput.classList.remove("border-red-500", "bg-red-50");

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let esValido = true;

        // revisamos si el correo termina en alguno de los dominios validos
        const dominioValido = dominiosPermitidos.some(dominio => email.endsWith(dominio));
        
        if (email === "" || !dominioValido) {
            // inyectamos el mensaje y pintamos el input rojo
            emailError.textContent = "Por favor, ingresa un correo corporativo válido (ej: @colocolo.cl o @duoc.cl).";
            emailError.classList.remove("hidden");
            emailInput.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // revisamos que la contraseña tenga el largo correcto
        if (password.length < 4 || password.length > 10) {
            // inyectamos mensaje de error para la contraseña
            passwordError.textContent = "La contraseña debe contener estrictamente entre 4 y 10 caracteres.";
            passwordError.classList.remove("hidden");
            passwordInput.classList.add("border-red-500", "bg-red-50");
            esValido = false;
        }

        // si no hay errores hacemos la transicion a la aplicacion
        if (esValido) {
            // le bajamos la opacidad al login para que desaparezca suave
            const loginView = document.getElementById("login-view");
            loginView.classList.add("opacity-0", "scale-95");
            
            // esperamos medio segundo para sincronizar los cambios visuales
            setTimeout(() => {
                loginView.classList.add("hidden");
                
                // mostramos el contenedor principal que tiene el menu
                document.getElementById("app-view").classList.remove("hidden");
                
                // aplicamos un filtro al fondo 
                bgImage.classList.add("blur-[2px]", "opacity-50");
                
                // usamos el router para cargar la vista del dashboard
                if (typeof window.cargarVista === 'function') {
                    window.cargarVista('pages/home.html', 'dynamic-view');
                }
            }, 500); 
        }
    });
});