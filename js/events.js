document.addEventListener('keydown', function(event) {
  event.preventDefault();
  const key = event.key;
  switch (key) {
    case ' ':
      if (staticText === null) {
        fireMissile(ship.position, ship.direction)
      } else {
        staticText = null
      }
      break
    case 'r':
      window.location.reload()
      break
    case 'ArrowLeft':
      move(-1)
      break
    case 'ArrowRight':
      move(1)
      break
  }
})

document.addEventListener('keyup', function(event) {
  event.preventDefault();
  const key = event.key;
  switch (key) {
    case ' ':
      canFire = true
      break
  }
})
