const mineflayer = require('mineflayer')

const config = {
  host: 'SEU_IP_ATERNOS.aternos.me',
  port: 25565,
  username: 'BotAternos',
  version: false
}

let bot

function startBot() {
  bot = mineflayer.createBot(config)

  bot.once('spawn', () => {
    console.log('Bot conectado ao servidor!')

    bot.chat('Olá! Bot online.')
  })

bot.on('chat', (username, message) => {
    if (username === bot.username) return

    console.log(`[CHAT] ${username}: ${message}`)

    if (message === 'ping') {
      bot.chat('pong')
    }

       if (message === 'seguir') {
      const player = bot.players[username]

      if (!player || !player.entity) {
        bot.chat('Não consigo te encontrar.')
        return
      }

      bot.chat(`Seguindo ${username}`)

      followPlayer(player.entity)
    }
  })

bot.on('end', () => {
    console.log('Bot desconectado!')
    reconnect()
  })

  bot.on('kicked', (reason) => {
    console.log('Bot foi kickado:', reason)
  })

  bot.on('error', (err) => {
    console.log('Erro:', err)
  })
}

function reconnect() {
  console.log('Reconectando em 5 segundos...')

  setTimeout(() => {
    startBot()
  }, 5000)
}

function followPlayer(target) {
  const interval = setInterval(() => {
    if (!bot.entity || !target || !target.position) {
      clearInterval(interval)
      return
    }

const distance = bot.entity.position.distanceTo(target.position)

    bot.lookAt(target.position.offset(0, 1.6, 0))

    if (distance > 2) {
      bot.setControlState('forward', true)
    } else {
      bot.setControlState('forward', false)
    }
  }, 100)
}

startBot()
