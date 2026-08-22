# Pipeline DevOps - Aplicación Web Simple

## 1. Descripción General
Este repositorio contiene el código fuente y la infraestructura como código (IaC) para una aplicación web Node.js/Express, respaldada por un pipeline de Integración Continua y Entrega Continua (CI/CD) implementado mediante GitHub Actions.

## 2. Guía de Instalación (Local)
1. Clonar el repositorio: `git clone <url-repo>`
2. Instalar dependencias: `npm install`
3. Ejecutar la aplicación: `npm start`
4. Acceder en el navegador: `http://localhost:3000`

## 3. Documentación del Pipeline (CI/CD)
El pipeline automatizado (`.github/workflows/pipeline.yml`) se dispara con cada `push` o `pull_request` a la rama `main` y ejecuta las siguientes etapas:
*   **Checkout**: Recupera el código fuente.
*   **Setup**: Configura el entorno Node.js v18.
*   **Linting**: Análisis estático de código para garantizar estándares de calidad.
*   **Testing**: Ejecución de pruebas unitarias y de integración mediante Jest y Supertest.
*   **Build**: Empaquetado de la aplicación en un contenedor Docker optimizado (multistage).
*   **Security Scan**: Escaneo de vulnerabilidades críticas y altas en la imagen generada utilizando Trivy.

## 4. Manual de Operaciones
*   **Monitoreo (Logs)**: La aplicación utiliza `morgan` en formato `combined` para emitir logs de acceso en consola (stdout), capturables por cualquier orquestador.
*   **Monitoreo (Métricas)**: Las métricas de consumo y rendimiento están expuestas en el endpoint `/metrics`, listas para ser extraídas (scraped) por Prometheus.
*   **Despliegue de Contenedor**: 
    ```bash
    docker build -t devops-app .
    docker run -p 3000:3000 -d devops-app
    ```