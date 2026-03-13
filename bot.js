// Importa las clases necesarias para el BHK-BOT de WhatsApp
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal'); // Muestra el QR en consola

// Crea el cliente con autenticación local y configuración de Puppeteer
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'client-one',
        dataPath: './session', // Guarda la sesión para no escanear el QR cada vez
    }),
    puppeteer: {
        headless: true, // Sin abrir ventana del navegador
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        dumpio: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Ruta a Chrome
    },

});

// Evento para mostrar el QR en consola
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('[INFO QR] Escanea el código QR con tu dispositivo de WhatsApp.');
});

// Evento que indica que el bot está listo
client.on('ready', async () => {
    console.log('BOT está listo para responder');
});

// Escucha los mensajes que llegan
client.on('message', message => {
    // Ignorar mensajes de estados para no saturar la consola
    if (message.from === 'status@broadcast') return;

    console.log('Mensaje recibido:', message.body);

    // Responde a cualquier mensaje
    client.sendMessage(message.from, '¡Hola! He recibido tu mensaje. Soy un bot automático.');
});

client.initialize()