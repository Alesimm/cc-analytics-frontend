// esperamos a que cargue todo el html
document.addEventListener("DOMContentLoaded", () => {
    
    // funcion que busca otra pagina y la mete al html sin recargar
    window.cargarVista = async (ruta, contenedorId = 'app-view') => {
        try {
            // traemos el archivo
            const respuesta = await fetch(ruta);
            
            if (!respuesta.ok) throw new Error("no se pudo cargar la pagina");

            // sacamos el texto html
            const html = await respuesta.text();
            
            // inyectamos el codigo en el div
            document.getElementById(contenedorId).innerHTML = html;

        } catch (error) {
            console.error("error en router:", error);
            document.getElementById(contenedorId).innerHTML = `<h2 class="text-red-500 text-center mt-10">Error al cargar la vista</h2>`;
        }
    };
});