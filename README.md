# Full Stack Open - Parte 10 🧐

> [!NOTE]  
> Los enunciados de todos los ejercicios de esta parte se encuentran en el siguiente link:  
> [Enunciados Parte 10](https://github.com/DiriARG/full-stack-open/blob/main/parte-10/README.md)  
> Link de mi repositorio principal del curso Full Stack Open:  
> [Repositorio principal](https://github.com/DiriARG/full-stack-open)

En este repositorio encontrarás mis respuestas a los ejercicios correspondientes a la [Parte 10](https://fullstackopen.com/es/part10) del curso [Full Stack Open](https://fullstackopen.com/es/), dictado por la [Universidad de Helsinki](https://www.helsinki.fi/en) en colaboración con [Houston Inc](https://www.houston-inc.com/).

### Importante

Las respuestas a los ejercicios de la Parte 10 se encuentran en este repositorio independiente, porque se sigue la recomendación que aparece en el primer ejercicio (10.1).  
Dicha recomendación dice:

```plaintext
NB: Para enviar este ejercicio y todos los ejercicios futuros, debe crear un nuevo repositorio de GitHub.
```

## Desarrollador 👨‍💻:

- **Desarrollador:** Matías Di Risio 👍
- **GitHub:** [DiriARG](https://github.com/DiriARG)

## Requisitos Previos 🚀:

Para que esta aplicación funcione correctamente, es necesario configurar y ejecutar el servidor backend.

### 1. Servidor Backend

Esta aplicación consume la API del repositorio: [rate-repository-api](https://github.com/fullstack-hy2020/rate-repository-api).

Sigue las instrucciones del apartado [🚀 Getting started](https://github.com/fullstack-hy2020/rate-repository-api?tab=readme-ov-file#-getting-started) del README oficial del repositorio para configurar las variables de entorno (`.env`) y la base de datos.

### 2. Versión de Node.js

Para ejecutar el **servidor backend**, es obligatorio utilizar la versión **Node v20.11.0** (o cualquier versión **LTS de la rama 20**).

Las versiones más recientes de Node (como v21 o v22) presentan conflictos de compatibilidad con módulos nativos del proyecto como `sqlite3` y `node-gyp`.  

Puedes usar [nvm-windows](https://github.com/coreybutler/nvm-windows) para cambiar de versión fácilmente:

```bash
nvm install 20.11.0
nvm use 20.11.0
```

Para ejecutar el proyecto frontend, utiliza la versión **Node v22.18.0**.  

#### Resumen:
- Ejecuta el **servidor backend** (rate-repository-api) en una terminal usando **Node v20.11.0**.
- Ejecuta el **proyecto frontend** (rate-repository-app) en otra terminal usando **Node v22.18.0**.
