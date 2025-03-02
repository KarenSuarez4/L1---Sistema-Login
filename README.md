<h1>Sistema de login con Node.js</h1>
<p>Este sistema de login cuenta con las siguientes características: </p>
<p>
    - Sistema de logeo con autenticación por token. <br>
    - Gestion de roles de usuario con accesos restringidos. <br>
    - Recuperación de contraseñas mediante correos electrónicos. <br>
    - Restricción de acceso después de más de 5 intentos fallidos en el inicio de sesión. <br>
    - Conexión con base de datos. <br>
    - Datos almacenados con métodos de encriptación.</p> <br>

<b><p>Integrantes: </p></b>
<p> - Ronald Samir Molinares Sanabria<br>
    - Karen Juliana Peña Suarez<br>
- Lunna Karina Sosa Espitia</p>


<h1>Configuración</h1>

1. Clonar el repositorio
```
 git clone <URL_DEL_REPOSITORIO>
 cd <NOMBRE_DEL_PROYECTO>
```
2. Crear archivo .env

Se debe crear un archivo .env en la raíz del proyecto. Como referencia, revisar el archivo .env_example para conocer las variables de entorno necesarias.
```
# Configuración del token JWT
JWT_SECRET=TU_CLAVE_SECRETA
JWT_EXPIRATION=TIEMPO_DE_EXPIRACIÓN_DEL_TOKEN
JWT_COOKIE_EXPIRATION=TIEMPO_DE_EXPIRACIÓN_DE_LA_COOKIE

# Configuración de la base de datos
DB_HOST=localhost
DB_USER=USUARIO_CON_PRIVILEGIOS_TOTALES
DB_PASSWORD=CONTRASEÑA_DE_LA_BASE_DE_DATOS
DB_NAME=NOMBRE_DE_LA_BASE_DE_DATOS
```

3. Instalar dependencias
```
 npm install
```
4. Ejecutar el proyecto
```
 npm run dev
```

Modelo de Base de Datos

El modelo de bases de datos se encuentra dentro del proyecto. Revisar para conocer la estructura y relaciones de las tablas.

<h1>Notas adicionales</h1>

- Asegúrate de tener instalado Node.js en tu sistema.
- Usa un gestor de bases de datos compatible con el modelo definido.
- Si hay scripts adicionales para la configuración de la base de datos, revisa la documentación interna del proyecto.
