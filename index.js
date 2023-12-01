


const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalBlock = goals.GoalBlock
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')

const bot = mineflayer.createBot({
    host: 'node3.leourel.com',
    port: 25935,
    username: 'LmaoBruh',
    version: "1.20.1"
})
bot.loadPlugin(pathfinder)
bot.once('spawn', () => {
    mineflayerViewer(bot, { port: 8999, firstPerson: true })// port is the minecraft server port, if first person is false, you get a bird's-eye view
  })
bot.on('chat', (username, message) => {
    if (username === bot.username) return
    bot.chat(message)
    if (message == "go"){
        followPlayer()
    }
  })

function followPlayer() {
    const mcData = require('minecraft-data')(bot.version)
    const movements = new Movements(bot, mcData)
    movements.scafoldingBlocks = []
    bot.pathfinder.setMovements(movements)
    const goal = new GoalBlock(10000000, 64, 1000000)
    bot.pathfinder.setGoal(goal, true)
    
}
bot.on('kicked', function(reason) {
    console.log("I got kicked for", reason, "lol");

    bot = mineflayer.createBot({
        host: 'node-it-free-01.tickhosting.com',
        port: 50235,
        username: 'LmaoBruh',
        version: "1.20.1"
    })
    followPlayer()
  });


