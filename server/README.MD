# Pasos para Probar o Iniciar Localmente los Microservicios Localmente
Si deseas probar los microservicios de manera local, sigue estos pasos:

Clona este repositorio en tu máquina local.

Navega a cada carpeta correspondiente a un microservicio y abre una terminal en cada una.

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:


```bash
npm i
```

Esto asegurará que se instalen todos los archivos y paquetes necesarios para ejecutar cada proyecto.

Dentro de cada carpeta, crea un archivo .env y define las variables de entorno necesarias. Asegúrate de configurar correctamente las variables específicas de cada microservicio.

Después de configurar las variables de entorno, estás listo para iniciar los microservicios.

Ejecuta el microservicio correspondiente y repite este paso para cada uno de ellos.

Si hay un cliente (carpeta clients), dirígete a esa carpeta y también ejecuta:

```bash
npm i
```

Esto instalará las dependencias necesarias para el cliente.

Puedes optar por ejecutar el cliente para ver las vistas o realizar solicitudes directamente utilizando Postman. Si decides utilizar Postman, ingresa la ruta correspondiente para cada solicitud.

Con estos pasos, deberías tener los microservicios en ejecución localmente y estar listo para probar o desarrollar.