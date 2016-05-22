describe("Bowling", function() {
  var bowling

  beforeEach(function() {
    bowling = new Bowling()
  })

  describe("calculate score", function() {
    it("returns the score from the play", function() {
      spyOn(bowling._play,"calculate").and.returnValue(1);
      expect(bowling.calculateTotal()).toEqual(1)
    })

    it("returns the score from the play", function() {
      spyOn(bowling._play,"isGameOver").and.returnValue(true)
      spyOn(bowling._play,"calculate").and.returnValue(300)
      expect(bowling.calculateTotal()).toEqual("Game over! You scored 300")
    })
  })

  describe("knock down pins", function() {
    it("returns the score from the play", function() {
      spyOn(bowling._play,"knockDown")
      bowling.knockDown(1)
      expect(bowling._play.knockDown).toHaveBeenCalledWith(1)
    })
  })

  describe("add roll to rolls_array", function() {
    it("adds pins to the rolls array", function() {
      bowling.addRoll(3)
      expect(bowling.rolls()).toEqual([3])
    })
  })

  describe("incremenet table cell", function() {
    it("by 1 if not a strike", function() {
      bowling.incrementTableCell(4)
      expect(bowling._tableCell).toEqual(1)
    })

    it("by 2 if a strike", function() {
      bowling.incrementTableCell(10)
      expect(bowling._tableCell).toEqual(2)
    })
  })

  describe("returns the rolls array", function() {
    it("returns the score from the play", function() {
      spyOn(bowling._play,"calculate").and.returnValue(1);
      expect(bowling.calculateTotal()).toEqual(1)
    })
  })

})
