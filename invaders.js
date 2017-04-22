const api = window.GameLib
const game = {}

function initializeGame () {
  game.x = 0
  game.y = 0
}

function updateGameFrame (deltaTime) {
  game.x += 40 * deltaTime
}

function drawGameFrame () {
  api.ctx.clearRect(0, 0, api.gameWidth, api.gameHeight)
  api.ctx.fillStyle = 'white'
  api.ctx.fillRect(game.x, game.y, 40, 40)
}

api.ready(function () {
  api.createGame(320, 240, 'game')
  
  api.configure(
    {
      initializeGame,
      updateGameFrame,
      drawGameFrame
    }
  )
  
  api.start()
})
