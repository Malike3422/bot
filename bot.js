const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'Malike3422.aternos.me', // IP do servidor
  port: 25565, // porta padrão
  username: 'NomeDoBot',
  version: '26.1.2' // versão do servidor
})

bot.on('login', () => {
  console.log('Bot conectado!')
})

bot.on('spawn', () => {
  console.log('Bot entrou no servidor!')
  bot.chat('Olá!')
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return

  console.log(`${username}: ${message}`)

  if (message === 'ping') {
    bot.chat('pong')
  }
})

bot.on('kicked', console.log)
bot.on('error', console.log)
