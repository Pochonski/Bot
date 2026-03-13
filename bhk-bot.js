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
        dumpio: true,
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
    console.log('BHK-BOT está listo para responder');
});

client.initialize()