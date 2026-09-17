// js/app.js
document.addEventListener("DOMContentLoaded", () => {
    
    window.cargarVista = async (ruta, contenedorId = 'dynamic-view') => {
        try {
            console.log(`Cargando fragmento desde: ${ruta}`);
            const respuesta = await fetch(ruta);
            
            if (!respuesta.ok) throw new Error("No se pudo cargar la vista");

            // Inyectamos el texto directamente, asumiendo que el archivo ya viene limpio
            document.getElementById(contenedorId).innerHTML = await respuesta.text();

        } catch (error) {
            console.error("Error en router:", error);
            document.getElementById(contenedorId).innerHTML = `
                <div class="p-4 bg-red-50 border-2 border-black text-red-600 font-bold uppercase">
                    Error al cargar el módulo.
                </div>`;
        }
    };
});