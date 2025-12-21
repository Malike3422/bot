const mineflayer = require('mineflayer')

const config = {
  host: 'Malike3422.aternos.me', // exemplo: meuservidor.aternos.me
  port: 14066,
  username: 'BotAFK',       // qualquer nome (server pirata)
  version: false,          // false = detecta automático
  reconnectDelay: 5000     // 5 segundos
}

let bot

function iniciarBot() {
  console.log('🔄 Tentando conectar...')

  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version
  })

  bot.on('spawn', () => {
    console.log('✅ Bot conectado com sucesso!')

    // Anti-AFK: pular
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 300)
    }, 20000)

    // Anti-AFK: girar a cabeça
    setInterval(() => {
      bot.look(Math.random() * Math.PI * 2, 0)
    }, 15000)

    // Mensagem no chat (opcional)
    setInterval(() => {
      bot.chat('Bot online 😎')
    }, 300000) // a cada 5 minutos
  })

  bot.on('end', () => {
    console.log('❌ Bot caiu. Reconectando em 5s...')
    setTimeout(iniciarBot, config.reconnectDelay)
  })

  bot.on('kicked', reason => {
    console.log('🚫 Kickado:', reason)
  })

  bot.on('error', err => {
    console.log('⚠️ Erro:', err.message)
  })
}

iniciarBot()
