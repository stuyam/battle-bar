var backdrop = '_'.repeat(150)
var ship = {
  position: 74,
  direction: 1,
  shieldOn: false
}
var missiles = []
var enemies = []
var crates = []
var enemyFrequency = .025
var crateFrequency = .025
var canFire = true
var cratesCollected = 0
var enemiesKilled = 0
var game = ''
var isGameOver = false
var staticText = '_'.repeat(60) + 'PRESS_SPACE_TO_START' + '_'.repeat(60)

function move(value) {
  ship.position += value
  ship.direction = value
}

function shield() {
  ship.shieldOn = !ship.shieldOn
}

function shipCharacter() {
  if (ship.shieldOn) {
    if (ship.direction > 0) {
      return ')'
    } else if (ship.direction < 0) {
      return '('
    }
  } else {
    if (ship.direction > 0) {
      return '>'
    } else if (ship.direction < 0) {
      return '<'
    }
  }
}

function moveMissiles(value) {
  var calcMissile
  missiles = missiles.map(function(missile) {
    calcMissile = missile.position + missile.speed
    if (calcMissile < 0 || calcMissile > backdrop.length) {
      return null
    }
    return {
      position: calcMissile,
      speed: missile.speed
    }
  }).filter(function(el) {
    return el != null
  })
}

function moveEnemy(value) {
  var calcEnemy
  enemies = enemies.map(function(enemy) {
    calcEnemy = enemy.position + enemy.speed
    if (calcEnemy < 0 || calcEnemy > backdrop.length) {
      return null
    }
    var hitIndex = missileHit(enemy.position)
    if (hitIndex !== false) {
      missiles.splice(hitIndex, 1)
      enemiesKilled++
      document.getElementById('enemiesKilled').innerHTML = enemiesKilled
      return null
    }
    return {
      position: calcEnemy,
      speed: enemy.speed
    }
  }).filter(function(el) {
    return el != null
  })
}

function missileHit(position) {
  for (let i = 0; i < missiles.length; ++i) {
    if (
      (ship.position < position && missiles[i].position > ship.position && missiles[i].position >= position) ||
      (ship.position > position && missiles[i].position < ship.position && missiles[i].position <= position)
    ) {
      return i
    }
  }
  return false
}

function generateEnemy() {
  if (Math.random() < enemyFrequency) {
    var position = Math.random() > .5 ? 0 : backdrop.length
    enemies.push({position: position, speed: position > 0 ? -1 : 1})
  }
}

function generateCrate() {
  if (Math.random() < crateFrequency) {
    crates.push({position: getRandomInRange(0, backdrop.length)})
  }
}

function fireMissile(position, speed) {
  if (ship.shieldOn === false  && canFire) {
    missiles.push({position: position, speed: speed})
    canFire = false
  }
}

function checkLife() {
  for (let i = 0; i < enemies.length; ++i) {
    if ((ship.position <= enemies[i].position && enemies[i].speed > 0) || (ship.position >= enemies[i].position && enemies[i].speed < 0)) {
      gameOver()
    }
  }
}

function checkCrates() {
  for (let i = 0; i < crates.length; ++i) {
    if (ship.position === crates[i].position) {
      crates.splice(i, 1)
      cratesCollected++
      document.getElementById('cratesCollected').innerHTML = cratesCollected
      return
    }
  }
}

function gameOver() {
  staticText = '_'.repeat(65) + 'GAME_OVER' + '_'.repeat(65)
  isGameOver = true
}

function draw() {
  if (staticText === null) {
    // backdrop
    game = backdrop

    // missiles
    missiles.forEach(function(missile) {
      game = game.splice(missile.position, 1, '~')
    })

    // ship
    game = game.splice(ship.position, 1, shipCharacter())

    // crates
    crates.forEach(function(crate) {
      game = game.splice(crate.position, 1, '■')
    })

    // enemies
    enemies.forEach(function(enemy) {
      game = game.splice(enemy.position, 1, 'ï')
    })

    updateURL(game)
    generateEnemy()
    generateCrate()
    moveMissiles()
    moveEnemy()
    checkLife()
    checkCrates()
    enemyFrequency += .0001
  } else {
    updateURL(staticText)
  }

  if (isGameOver === false) {
    setTimeout(draw, 100)
  } else {
    updateURL(staticText)
  }
}

draw()
