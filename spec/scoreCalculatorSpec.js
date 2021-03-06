describe("ScoreCalculator:", function() {
  var scoreCalculator, frames, frame1, frame2, frame3


  beforeEach(function() {
    scoreCalculator = new ScoreCalculator()
    frames = []
    var methodArray = ["firstAndSecondRollScore","isAStrike",
                       "isASpare","firstRollScore","isComplete"]
    frame1 = jasmine.createSpyObj("frame1", methodArray)
    frame2 = jasmine.createSpyObj("frame2", methodArray)
    frame3 = jasmine.createSpyObj("frame3", methodArray)
  })

  describe("start of game", function() {
    it("has a total of zero", function() {
      expect(scoreCalculator.calculateTotal(frames)).toEqual(0)
    })
  })

  describe("first roll is 1", function() {
    it("total score is zero as frame incomplete", function() {
      frame1.isComplete.and.returnValue(false)
      frames.push(frame1)
      expect(scoreCalculator.calculateTotal(frames)).toEqual(0)
    })
  })

  describe("first roll is 1, second roll is 1", function() {
    it("increases total to 2", function() {
      frame1.isComplete.and.returnValue(true)
      frame1.firstAndSecondRollScore.and.returnValue(2)
      frames.push(frame1);
      expect(scoreCalculator.calculateTotal(frames)).toEqual(2)
    })
  })

  describe("strikes", function() {
    describe("one strike", function() {
      it("total score is zero as frame score is incomplete", function() {
        frames.push(frame1);
        frame1.isAStrike.and.returnValue(true)
        expect(scoreCalculator.calculateTotal(frames)).toEqual(0)
      })
    })

    describe("one strike, then another", function() {
      it("total score is zero as frame score is incomplete", function() {
        frames.push(frame1, frame2)
        frame1.isAStrike.and.returnValue(true)
        frame1.firstAndSecondRollScore.and.returnValue(10)
        frame2.isAStrike.and.returnValue(true)

        expect(scoreCalculator.calculateTotal(frames)).toEqual(0)
      })
    })

    describe("one strike, then a 1,1 frame", function() {
      it("total score is 14 as (frame1 = 10+2) and (frame2 = 2)", function() {
        frames.push(frame1, frame2)
        frame1.isAStrike.and.returnValue(true)
        frame2.isComplete.and.returnValue(true)
        frame1.firstAndSecondRollScore.and.returnValue(10)
        frame2.firstAndSecondRollScore.and.returnValue(2)
        expect(scoreCalculator.calculateTotal(frames)).toEqual(14)
      })
    })

    describe("one strike, then another, then a 1", function() {
      it("total score is 21 as (frame1 = 10+10+1", function() {
        frames.push(frame1, frame2, frame3)
        frame1.isAStrike.and.returnValue(true)
        frame1.firstAndSecondRollScore.and.returnValue(10)
        frame2.isAStrike.and.returnValue(true)
        frame2.firstRollScore.and.returnValue(10)
        frame3.firstRollScore.and.returnValue(1)
        expect(scoreCalculator.calculateTotal(frames)).toEqual(21)
      })
    })

    describe("one strike, then another, then another", function() {
      it("total score is 30 as (frame1 = 10+10+10", function() {
        frames.push(frame1, frame2, frame3)
        frame1.isAStrike.and.returnValue(true)
        frame2.isAStrike.and.returnValue(true)
        frame1.firstAndSecondRollScore.and.returnValue(10)
        frame2.firstRollScore.and.returnValue(10)
        frame3.firstRollScore.and.returnValue(10)
        expect(scoreCalculator.calculateTotal(frames)).toEqual(30)
      })
    })
  })

  describe("spares", function() {
    describe("first roll is 1, second roll is 9", function() {
      it("total stays at zero as frame score incomplete", function() {
        frames.push(frame1)
        frame1.isASpare.and.returnValue(true)
        expect(scoreCalculator.calculateTotal(frames)).toEqual(0)
      })
    })

    describe("spare, then 5", function() {
      it("total increases to 10", function() {
        frames.push(frame1, frame2)
        frame1.isASpare.and.returnValue(true)
        frame1.firstAndSecondRollScore.and.returnValue(10)
        frame2.firstRollScore.and.returnValue(5)
        expect(scoreCalculator.calculateTotal(frames)).toEqual(15)
      })
    })
  })

})
