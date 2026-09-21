# CC Analytics - Frontend

## El Contexto del Proyecto
En el fútbol de alto rendimiento, la información suele estar fragmentada. El cuerpo técnico, el equipo médico y los analistas de datos manejan variables críticas en sistemas separados o planillas aisladas, lo que retrasa la toma de decisiones estratégicas. 

CC Analytics nace para resolver este problema específico en el club Colo-Colo. El objetivo es unificar la pizarra táctica, el análisis de rendimiento individual, la gestión del plantel y el historial clínico en un único cerebro digital. Buscamos centralizar la inteligencia deportiva en una plataforma de acceso rápido, que permita al club gestionar sus recursos desde una interfaz unificada y altamente responsiva.

## Nuestra Solución Técnica
Para abordar este desafío, desarrollamos una plataforma web orientada a la velocidad y la escalabilidad. En esta primera fase de ingeniería, construimos la aplicación utilizando un stack fundamental (HTML5 semántico, Tailwind CSS y Vanilla JavaScript), pero aplicando la mentalidad arquitectónica de un framework moderno.

En lugar de crear múltiples páginas web tradicionales que obliguen al navegador a recargar los recursos constantemente, diseñamos una arquitectura Single Page Application (SPA) desde cero. Esto significa que el esqueleto de la plataforma carga una sola vez, y los distintos módulos de la aplicación mutan de forma dinámica en la pantalla según la interacción del usuario, entregando una experiencia fluida y sin tiempos muertos.

## Detalles de Implementación y Código
El desarrollo de este frontend se rige por un control estricto sobre el Document Object Model (DOM) y la lógica de cliente, estableciendo las bases para una futura migración a un ecosistema de microservicios.

* **Enrutamiento Dinámico (Router Asíncrono):** Construimos un motor de navegación propio utilizando la API nativa Fetch de JavaScript. Este sistema intercepta la navegación, solicita los fragmentos de código HTML correspondientes a cada módulo y los inyecta en el árbol del DOM en tiempo real. Al separar las vistas físicamente, simulamos una arquitectura basada en componentes.
* **Control Absoluto de Validaciones:** Se deshabilitaron intencionalmente los motores de validación automáticos del navegador (como el uso de etiquetas 'required' o validadores nativos de HTML5). Toda la lógica de negocio, incluyendo la autorización estricta de dominios de correo institucionales y reglas de formularios, se procesa de manera pura a través de algoritmos en el cliente.
* **Retroalimentación Visual sin Bloqueos:** Descartamos por completo el uso de ventanas emergentes nativas del navegador (como alert o confirm), ya que bloquean el hilo principal de ejecución y degradan la experiencia de usuario. En su lugar, el manejo de errores interactúa directamente con el DOM, inyectando y removiendo clases de Tailwind CSS en milisegundos para brindar una retroalimentación visual limpia y contextual.

## Instrucciones de Despliegue Local
Debido a que nuestra arquitectura SPA depende de peticiones de red asíncronas para cargar e inyectar las vistas físicas, abrir el archivo principal de forma directa (doble clic sobre el index.html) resultará en un bloqueo por las políticas de seguridad CORS del navegador.

Para compilar y levantar el entorno de desarrollo correctamente:
1. Abre la raíz del proyecto en tu editor de código.
2. Inicializa un servidor local HTTP (recomendamos utilizar la extensión Live Server en Visual Studio Code o un entorno equivalente).
3. Levanta la aplicación apuntando al archivo index.html a través del puerto local asignado por el servidor.
