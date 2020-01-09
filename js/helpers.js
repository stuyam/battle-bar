String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem))
}

function updateURL(url) {
  window.history.replaceState(null, '', '#'+url)
  document.title = 'Crates: ' + cratesCollected + '  Kills: ' + enemiesKilled
}

function getRandomInRange(min, max) {
  return parseInt(Math.random() * (max - min) + min)
}
