// archivo principal para manejar las rutas sin recargar la pagina
document.addEventListener("DOMContentLoaded", () => {
    
    // funcion asincrona para cargar los archivos html en el div principal
    window.cargarVista = async (ruta, contenedorId = 'dynamic-view') => {
        try {
            console.log(`cargando archivo desde: ${ruta}`);
            const respuesta = await fetch(ruta);
            
            if (!respuesta.ok) throw new Error("no se pudo cargar la vista");

            // tomamos el texto del html y lo inyectamos directo en el contenedor
            document.getElementById(contenedorId).innerHTML = await respuesta.text();

        } catch (error) {
            console.error("error en el router de la app:", error);
            // si algo falla mostramos un mensaje de error rojo en el div
            document.getElementById(contenedorId).innerHTML = `
                <div class="p-4 bg-red-50 border-2 border-black text-red-600 font-bold uppercase">
                    Error al cargar el módulo.
                </div>`;
        }
    };
});