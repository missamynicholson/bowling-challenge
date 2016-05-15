function Play(scoreCalculator) {
  this._frames = []
  this._scoreCalculator = typeof scoreCalculator !== "undefined" ?
                          scoreCalculator : new ScoreCalculator()
}

Play.prototype.frames = function() {
  return this._frames
}

Play.prototype.knockDown = function(pinsDown) {
  this._addRoll(pinsDown)
}

Play.prototype.calculate = function() {
  return this._scoreCalculator.calculateTotal(this._frames)
}

Play.prototype._addRoll = function(pinsDown) {
  if(this._hasNoActiveFrame()) {
    this._addFrame(pinsDown)
  } else {
    this._lastFrame().addSecondRoll(pinsDown)
  }
}

Play.prototype._addFrame = function(pinsDown) {
  this._frames.push(new Frame(pinsDown))
}

Play.prototype._secondLastFrame = function() {
  return this._frames[this._frames.length - 2]
}

Play.prototype._lastFrame = function() {
  return this._frames[this._frames.length - 1]
}

Play.prototype._hasNoActiveFrame = function() {
  return (this._frames.length === 0 || this._lastFrame().isComplete())
}

Play.prototype.isGameOver = function() {
  if(this._frames.length === 12) {
    return true
  } else if(this._frames.length === 11) {
    return (this._isGameOverSpare())
  } else if (this._frames.length === 10) {
    return (this._lastFrame().firstAndSecondRollScore() !== 10 && this._lastFrame().isComplete())
  } else {
    return false
  }
}

Play.prototype._isGameOverSpare = function () {
  return (this._secondLastFrame().isASpare() ||
  this._isComplete(11) && this._secondLastFrame().isAStrike())
}

Play.prototype._isComplete = function(frameNumber) {
  return (this._frames.length === frameNumber &&
          this._lastFrame().isComplete() &&
          !this._lastFrame().isAStrike())
}
