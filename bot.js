const mineflayer = require('mineflayer')
const http = require('http')

const config = {
  host: 'Malike3422.aternos.me',
  port: 14066,
  username: 'BotAFK',
  version: false,
  reconnectDelay: 5000
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
      setTimeout(() => bot.setControlState('jump', false), 400)
    }, 20000)

    // Anti-AFK: girar a cabeça
    setInterval(() => {
      bot.look(Math.random() * Math.PI * 2, 0)
    }, 15000)

    // Anti-AFK: andar um pouco
    setInterval(() => {
      bot.setControlState('forward', true)
      setTimeout(() => bot.setControlState('forward', false), 1000)
    }, 60000)
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

// 🌐 Servidor HTTP (necessário pro Render não dormir)
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Bot AFK online')
}).listen(process.env.PORT || 3000)

iniciarBot()
