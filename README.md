# Sistema de Login con Node.js

## Características
Este sistema de login cuenta con las siguientes características:
- Autenticación por token.
- Gestión de roles de usuario con accesos restringidos.
- Recuperación de contraseñas mediante correos electrónicos.
- Restricción de acceso después de más de 5 intentos fallidos en el inicio de sesión.
- Conexión con base de datos.
- Almacenamiento seguro de datos con métodos de encriptación.

## Integrantes
- Ronald Samir Molinares Sanabria
- Karen Juliana Peña Suarez
- Lunna Karina Sosa Espitia

## Configuración

### 1. Clonar el repositorio
```sh
git clone <[URL_DEL_REPOSITORIO](https://github.com/KarenSuarez4/L1---Sistema-Login/tree/main)>
cd <L1_Sistemas_Distribuidos_G4>
```

### 2. Crear la base de datos
Antes de proceder con la configuración del entorno, se debe crear la base de datos. El archivo con la estructura necesaria se encuentra en la raíz del proyecto con el nombre `dataBase.sql`. Importa este archivo en tu gestor de base de datos para crear las tablas necesarias y con sus respectivas inserciones.

### 3. Crear el archivo `.env`
Se debe crear un archivo `.env` en la raíz del proyecto. Como referencia, revisar el archivo `.env_example` para conocer las variables de entorno necesarias.
```sh
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

### 4. Instalar dependencias
```sh
npm install
```

### 5. Ejecutar el proyecto
```sh
npm run dev
```
## Puedes acceder con el usuario `superAdmin` y la contraseña `123` después de haber creado la base de datos correctamente.
## Modelo de Base de Datos
El modelo de la base de datos se encuentra dentro del proyecto. Revisa el archivo `dataBase.sql` para conocer la estructura y relaciones de las tablas.

## Notas adicionales
- Asegúrate de tener instalado Node.js en tu sistema.
- Usa un gestor de bases de datos compatible con el modelo definido.
- Si hay scripts adicionales para la configuración de la base de datos, revisa la documentación interna del proyecto.


