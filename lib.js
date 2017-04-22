window.GameLib = (function () {
  const api = {}
  
  api.ready = callback => {
    document.addEventListener('DOMContentLoaded', callback, false)
  }
  
  api.createGame = function createGame (gameWidth, gameHeight, gameDivId) {
    const canvas = document.createElement('canvas')
    const gameDiv = document.getElementById(gameDivId)
    
    canvas.width = gameWidth
    canvas.height = gameHeight
    canvas.style.imageRendering = 'pixelated'
    canvas.style.width = `${gameWidth * 2}px`
    canvas.style.height = `${gameHeight * 2}px`
    gameDiv.appendChild(canvas)
    
    api.gameWidth = gameWidth
    api.gameHeight = gameHeight
    api.canvas = canvas
    api.ctx = canvas.getContext('2d')
  }
  
  api.configure = (
    {
      initializeGame,
      updateGameFrame,
      drawGameFrame
    }
  ) => {
    api.initializeGame = initializeGame
    api.updateGameFrame = updateGameFrame
    api.drawGameFrame = drawGameFrame
  }
  
  api.start = () => {
    const {
      initializeGame,
      updateGameFrame,
      drawGameFrame
    } = api
    
    api.lastTime = Date.now()
    api.currentTime = 0
    api.deltaTime = 0
    
    initializeGame()
    
    function mainLoop () {
      window.requestAnimationFrame(mainLoop)
      if (!api.gamePaused) {
        api.currentTime = Date.now()
        api.deltaTime = (api.currentTime - api.lastTime) * 0.001
        
        updateGameFrame(api.deltaTime)
        drawGameFrame()
        
        api.lastTime = api.currentTime
      }
    }
    
    mainLoop()
  }
  
  api.pause = () => { api.gamePaused = true }
  api.unpause = () => { api.gamePaused = false }
  
  return api
}())