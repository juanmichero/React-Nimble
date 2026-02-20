React Job Challenge

Aplicación en React que consume la API provista para:

Obtener los datos del candidato a partir del email

Listar las posiciones disponibles

Enviar una postulación a una posición seleccionada incluyendo la URL de un repositorio de GitHub

La interfaz maneja estados de carga, éxito y errores de la API.

Cómo ejecutar el proyecto
npm install
npm run dev

Luego abrir en el navegador la URL local que aparece en la terminal.

Notas sobre la API

Durante la implementación se detectó que la validación del endpoint
/api/candidate/apply-to-job no es completamente consistente con lo indicado en la consigna.

La documentación especifica enviar los siguientes campos:

uuid

jobId

candidateId

repoUrl

Sin embargo, en algunos casos la API responde con errores de validación solicitando también el campo applicationId.

Para asegurar el correcto funcionamiento de la postulación con la API actual, la aplicación envía tanto candidateId como applicationId, utilizando los valores obtenidos del endpoint de candidato.

Este comportamiento se implementó únicamente para adaptarse a las respuestas reales de la API y garantizar que el flujo solicitado funcione correctamente.

Tecnologías utilizadas

React (Vite)

Fetch API

Componentes funcionales

Manejo básico de estados de carga y error