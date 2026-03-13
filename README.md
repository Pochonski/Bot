# 🤖 BHK-BOT | WhatsApp Automation Bot

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![WhatsApp-web.js](https://img.shields.io/badge/WhatsApp--web.js-v1.34.6-blue.svg)](https://wppconnect.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)](https://www.mysql.com/)

**BOT** es un asistente automatizado para WhatsApp diseñado para gestionar registros de usuarios de forma inteligente, interactuar mediante menús personalizados y almacenar datos en una base de datos MySQL en tiempo real.

---

## ✨ Características Principales

-   **🔗 Autenticación Persistente**: Utiliza `LocalAuth` para guardar la sesión. ¡Escanea el código QR una vez y olvídate!
-   **📥 Registro Automático**: Detecta usuarios nuevos y solicita un alias para registrarlos automáticamente en la base de datos.
-   **🛡️ Filtros Inteligentes**:
    -   Ignora actualizaciones de estado (status).
    -   Ignora mensajes en grupos para evitar spam.
    -   Solo responde en chats privados.
-   **📊 Integración con MySQL**: Almacena ID de usuario, alias y fecha de registro de forma segura.
-   **🛠️ Estabilidad Avanzada**: Configuración optimizada de Puppeteer y caché de versión web para evitar bloqueos y pantallas de carga infinitas.

---

## 🚀 Tecnologías Utilizadas

-   [Node.js](https://nodejs.org/) - Entorno de ejecución.
-   [WhatsApp-web.js](https://github.com/pedroslopez/whatsapp-web.js) - Motor principal del bot.
-   [MySQL2](https://github.com/sidorares/node-mysql2) - Conector de base de datos rápido y seguro.
-   [QR Code Terminal](https://www.npmjs.com/package/qrcode-terminal) - Generación de QR en consola.
-   [Puppeteer](https://pptr.dev/) - Control del navegador para WhatsApp Web.

---

## 📋 Requisitos Previos

-   **Node.js** (v18 o superior)
-   **MySQL Server** (XAMPP, WAMP o instalación directa)
-   **Google Chrome** instalado (opcional, configurado en el bot)

---

## 🔧 Instalación y Configuración

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/Pochonski/bot.git
    cd bot
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar la Base de Datos**:
    Inicia tu servidor MySQL y crea una base de datos llamada `bot`. Ejecuta la siguiente tabla:
    ```sql
    CREATE TABLE usuarios (
      id VARCHAR(255) PRIMARY KEY,
      alias VARCHAR(100),
      fecha_registro DATE
    );
    ```

4.  **Configurar conexión**:
    Asegúrate de que los datos en `database.js` sean correctos (host, user, password).

---

## 🏃 Cómo usar el Bot

Lanza el bot con el siguiente comando:
```bash
node bot.js
```

1.  **Primer Inicio**: Verás un código QR en tu terminal. Escanéalo con tu WhatsApp (Dispositivos vinculados).
2.  **Autenticación**: Una vez logueado, verás el mensaje `BOT está listo para responder`.
3.  **Interacción**: El bot responderá automáticamente a cualquier mensaje privado. Si el usuario no está registrado, le dará la bienvenida y le pedirá su alias.

---

## 🛠️ Estructura del Proyecto

```text
├── bot.js               # Lógica principal y eventos de WhatsApp
├── database.js          # Configuración del pool de conexión MySQL
├── registrationHandler.js # Lógica de negocio para registro de usuarios
├── session/             # (Ignorado) Datos de la sesión vinculada
├── package.json         # Dependencias y scripts
└── .gitignore           # Archivos excluidos del repositorio
```

---

## 📝 Notas de Versión

-   **v1.1.0**: Añadido soporte para `webVersionCache` para solventar el bucle de autenticación.
-   **v1.0.5**: Implementado filtro para ignorar `status@broadcast` y grupos.
-   **v1.0.0**: Lanzamiento inicial con registro de usuarios y persistencia MySQL.

---

## 🤝 Contribuciones

¡Las sugerencias y pull requests son bienvenidos! Para cambios mayores, abre un issue primero para discutir lo que te gustaría cambiar.

---


---
*Desarrollado con ❤️ por Pochonski*
