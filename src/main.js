const PIXI = require('pixi.js')

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST

let renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
  backgroundColor: 0x9394FE
})

document.body.appendChild(renderer.view)

let stage = new PIXI.Container()
stage.scale = new PIXI.Point(4, 4)

//let texture = PIXI.Texture.fromImage('img/smiley.png')
let hero = null

// --- --- --- HERO --- --- ---

function addHero () {
  // Old Sprite code
  //stage.addChild(hero = new PIXI.Sprite(texture))
  // TEMP:Graphics until we learn why George sucks at loading images
  stage.addChild(hero = new PIXI.Graphics())
  hero.lineStyle(0)
  hero.beginFill(0x0000FF, 1)
  hero.drawRect(16, 16, 32, 32)
  hero.endFill()
  // END TEMP
  hero.anchor.x = 0.5
  hero.anchor.y = 0.5
  hero.x = stage.width  / 2
  hero.y = stage.height / 2
  hero.keys = { left:false, right:false, up:false, down:false }
  hero.velocity = new PIXI.Point()
  hero.moveSpeed = 100

  hero.update = function(ms) {
    const seconds = ms / 1000
    
    // Key input
    hero.velocity.x = 0
    hero.velocity.y = 0
    if (hero.keys.right) hero.velocity.x += hero.moveSpeed
    if (hero.keys.left ) hero.velocity.x -= hero.moveSpeed
    if (hero.keys.down ) hero.velocity.y += hero.moveSpeed
    if (hero.keys.up   ) hero.velocity.y -= hero.moveSpeed
    
    //Physics
    hero.x += hero.velocity.x * seconds
    hero.y += hero.velocity.y * seconds
  }
}

// --- --- --- UPDATE --- --- ---

const fps = 60
const step = 1/fps
let last = 0
function animate (ms) {
  window.requestAnimationFrame(animate)
  
  while(ms > last) {
    last += step
    update(step)
  }
  
  renderer.render(stage)
}

function update(ms) {
  hero.update(ms)
}

// --- --- --- MISC EVENTS --- --- ---

function onKeyPress(e) {
  switch(e.keyCode) {
      case 37: case 65: hero.keys.left  = e.type == 'keydown' break // A
      case 39: case 68: hero.keys.right = e.type == 'keydown' break // D
      case 38: case 87: hero.keys.up    = e.type == 'keydown' break // W
      case 40: case 83: hero.keys.down  = e.type == 'keydown' break // S
  }
}

function resize () {
  setTimeout(() => {
    const doResize = () => {
      const height = window.innerHeight
      const width = window.innerWidth
      renderer.resize(width, height)
    }
    doResize()
  }, 500)
}

// --- --- --- START --- --- ---

// Setup Resize
window.addEventListener('resize', resize)
window.onorientationchange = resize
// Keys
document.addEventListener('keydown', onKeyPress)
document.addEventListener('keyup'  , onKeyPress)

resize()
addHero()
animate(0)
