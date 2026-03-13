// Importa las clases necesarias para el BHK-BOT de WhatsApp
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal'); // Muestra el QR en consola

//importaciones de las funciones para registro de usuarios en la base de datos
const { obtenerDatosUsuario, registrarUsuarioDirecto, aliasYaExiste } = require('./registrationHandler');
const userStates = {};

// Crea el cliente con autenticación local y configuración de Puppeteer
const client = new Client({
  authStrategy: new LocalAuth({
    clientId: 'client-one',
    dataPath: './session', // Guarda la sesión para no escanear el QR cada vez
  }),
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.3000.1018913306-alpha.html',
  },
  puppeteer: {
    headless: false, // Veremos la ventana para saber qué pasa
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ],
  },
});

// Evento para mostrar el QR en consola
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('[INFO QR] Escanea el código QR con tu dispositivo de WhatsApp.');
});

// Evento que se dispara cuando la autenticación es exitosa
client.on('authenticated', () => {
  console.log('[INFO] ¡Autenticación exitosa! Esperando a que el bot esté listo...');
});

// Evento que se dispara si la autenticación falla
client.on('auth_failure', (msg) => {
  console.error('[ERROR] Fallo de autenticación:', msg);
});

// Evento que muestra el progreso de carga
client.on('loading_screen', (percent, message) => {
  console.log(`[LOADING] ${percent}% - ${message}`);
});

// Evento que se dispara si el cliente se desconecta
client.on('disconnected', (reason) => {
  console.warn('[WARN] El cliente se desconectó:', reason);
});

// Evento que indica que el bot está listo
client.on('ready', async () => {
  console.log('BOT está listo para responder');
});

// Funcion de registro de Usuario por WhatsApp con su Alias
client.on('message', async (message) => {
  // Filtro: Ignorar actualizaciones de estado (broadcast)
  if (message.from === 'status@broadcast') return;

  // Filtro opcional: Ignorar grupos (solo responder a chats privados)
  if (message.from.endsWith('@g.us')) return;

  const id_usuario = message.from;
  const texto = message.body.trim();

  // Log para monitorear qué está haciendo el bot
  console.log(`[MSG] Recibido de ${id_usuario}: "${texto}"`);

  const datos = await obtenerDatosUsuario(id_usuario);

  if (!datos) {
    if (userStates[id_usuario] !== 'esperando_alias') {
      await message.reply('¡Hola! ¿Cómo quieres que te llame? Escribe tu alias:');
      userStates[id_usuario] = 'esperando_alias';
    } else {
      if (await aliasYaExiste(texto)) {
        await message.reply('❌ Ese alias ya está en uso. Por favor, prueba con otro.');
      } else {
        await registrarUsuarioDirecto(id_usuario, texto);
        await message.reply(`✅ ¡Perfecto! Te registraré como "${texto}".`);
        delete userStates[id_usuario];
      }
    }
    return;
  }

  // Si ya está registrado, saludo personalizado
  await message.reply(`Hola ${datos.alias}, ¿en qué puedo ayudarte hoy?`);
});

client.initialize()