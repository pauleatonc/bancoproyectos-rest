# Documentación Banco de Proyectos SUBDERE

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Descripción General de la Aplicación](#descripción-general-de-la-aplicación)
3. [Backend (Django)](#backend-django)
4. [Frontend (React)](#frontend-react)
5. [Base de Datos (Postgres)](#base-de-datos-postgres)
6. [Procesos de Desarrollo](#procesos-de-desarrollo)
7. [Mantenimiento y Soporte](#mantenimiento-y-soporte)
8. [Apéndice](#apéndice)

## Introducción
### Propósito del Documento
Este documento proporciona una visión general de la arquitectura y funcionalidades de la aplicación Banco de Proyectos SUBDERE. Pretende servir como una guía de referencia para los desarrolladores y administradores de sistemas que trabajan en el proyecto.
### Audiencia Objetivo
La audiencia principal de este documento son los desarrolladores y administradores de sistemas que trabajan en la aplicación, aunque también puede ser útil para los stakeholders y otros miembros del equipo del proyecto que necesiten entender los detalles técnicos de la aplicación.
### Alcance de la Aplicación
La aplicación Banco de Proyectos SUBDERE es una aplicación web desarrollada para gestionar los proyectos de SUBDERE. Incluye un backend construido con Django, un frontend construido con React, y utiliza una base de datos Postgres.
### Definiciones, Acrónimos y Abreviaturas
- Backend: La parte del software que se encarga de la lógica de negocio y el almacenamiento de datos.
- Frontend: La interfaz de usuario de la aplicación, con la que interactúan los usuarios.
- Django: Un framework de desarrollo web en Python.
- React: Una biblioteca de JavaScript para construir interfaces de usuario.
- Postgres: Un sistema de gestión de bases de datos relacional de código abierto.

## Descripción General de la Aplicación
### Resumen de Funcionalidades
### Arquitectura de la Aplicación
### Interfaces de la Aplicación

## Backend (Django)
### Resumen de Django
- Versión Python: 3.11.0
- Versión Django: 4.1.3

### Instalación y Configuración
### Clonar el repositorio
git clone git@gitlab.com:gabinetedevs/bancodeproyectos.git

### Cambiar al directorio del proyecto
cd bancodeproyectos

### Asegúrate de tener instalado Python 3.11.0
python --version

### Instalar las dependencias
pip install -r requirements.txt

### Aplicar las migraciones
python manage.py migrate

### Iniciar el servidor de desarrollo
python manage.py runserver

### Estructura del Proyecto Django
- Modelos
- Vistas
- Templates
- URLs
### APIs y Endpoints
### Pruebas
### Despliegue y Configuración

## Frontend (React)
### Resumen de React
- Requiere Node.js para la instalación y ejecución

### Instalación y Configuración
### Asegúrate de tener Node.js instalado
node --version

### Clonar el repositorio
git clone git@gitlab.com:gabinetedevs/bancodeproyectos-front.git

### Cambiar al directorio del proyecto
cd bancodeproyectos-front

### Instalar las dependencias
npm install

### Iniciar el servidor de desarrollo
npm start

### Estructura del Proyecto React
- Componentes
- Estado y Props
- Rutas
- Estilos
### Consumo de APIs
### Pruebas
### Despliegue y Configuración
La aplicación se despliega utilizando Docker Compose. Asegúrese de tener instalado Docker y Docker Compose en su sistema antes de intentar el despliegue.

### Verificar la instalación de Docker
docker --version

### Verificar la instalación de Docker Compose
docker-compose --version

### Si Docker o Docker Compose no están instalados, siga las instrucciones oficiales para instalarlos:
 Docker: https://docs.docker.com/engine/install/
 Docker Compose: https://docs.docker.com/compose/install/

### Para desplegar la aplicación, navegue hasta el directorio del proyecto y ejecute:
docker-compose up

Por favor, consulte el archivo docker-compose.yml para más detalles sobre el despliegue de la aplicación y cualquier configuración adicional necesaria.
## Base de Datos (Postgres)
### Resumen de Postgres
- Versión Postgres: 14
### Estructura de la Base de Datos
- Tablas
- Relaciones
- Índices
### Consultas Principales
### Seguridad y Acceso
### Copias de Seguridad y Recuperación

## Procesos de Desarrollo
### Control de Versiones
Para el control de versiones se utiliza Git, con repositorios alojados en GitLab.

### Integración Continua / Despliegue Continuo
El proyecto utiliza integración continua y despliegue continuo para asegurar una alta calidad del código y despliegues rápidos y seguros.

### Estándares de Código y Revisión de Código
El código del proyecto sigue las guías de estilo de Python (PEP8) y JavaScript (Airbnb). Todos los cambios en el código son revisados por al menos un otro desarrollador antes de ser fusionados en la rama principal.

## Mantenimiento y Soporte
Los problemas y errores se rastrean mediante el sistema de seguimiento de problemas de GitLab. Los desarrolladores deben registrar cualquier problema que encuentren, y pueden asignarse problemas para resolver.

### Resolución de Problemas
### Mejoras y Actualizaciones
Las mejoras y actualizaciones a la aplicación se gestionan mediante el sistema de seguimiento de problemas de GitLab, y se implementan de acuerdo con el roadmap del proyecto.

## Apéndice
### Referencias
- Documentación de Django: https://docs.djangoproject.com/
- Documentación de React: https://reactjs.org/docs/getting-started.html
- Documentación de Postgres: https://www.postgresql.org/docs/
### Glosario
- Git: Un sistema de control de versiones.
- GitLab: Una plataforma de gestión de repositorios Git y desarrollo de software.
- PEP8: Guía de estilo de Python.
- Airbnb: Guía de estilo de JavaScript.
