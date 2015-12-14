var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('when game is won', function() {

  var given, when, then;

  beforeEach(function () {
    given = [{
      id: "9999",
      event: "GameCreated",
      userName: "Sigurdur",
      timeStamp: "2015.12.04T20:50:00"
    }, {
      id: "1000",
      event: "GameJoined",
      userName: "Fjalar",
      otherUserName: "Sigurdur",
      timeStamp: "2015.12.04T21:31:00"
    }, {
      id: "1000",
      event: "MoveMade",
      userName: "Fjalar",
      x: 1,
      y: 1,
      side: 'X',
      timeStamp: "2015.12.04T21:40:00"
    }, {
      id: "1000",
      event: "MoveMade",
      userName: "Fjalar",
      x: 0,
      y: 0,
      side: 'X',
      timeStamp: "2015.12.04T21:42:00"
    }, {
      id: "1000",
      event: "MoveMade",
      userName: "Fjalar",
      x: 0,
      y: 1,
      side: 'X',
      timeStamp: "2015.12.04T21:44:00"
    }];
  });

  describe('on a complete row', function () {
    it('win a game', function () {
      when = {
        id: "1000",
        command: "MakeMove",
        userName: "Fjalar",
        x: 0,
        y: 2,
        side: 'X',
        timeStamp: "2015.12.04T21:52:00"
      };
      then = [{
        id: "1000",
        event: "GameWon",
        userName: "Fjalar",
        x: 0,
        y: 2,
        side: 'X',
        timeStamp: "2015.12.04T21:52:00"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    })
  });
  describe('on a complete column', function() {
    it('should win game', function() {
      when = {
        id: "123456",
        command: "MakeMove",
        userName: "Helgi",
        x: 2,
        y: 1,
        side:'X',
        timeStamp: "2015.12.04T23:52:00"
      };
      then = [{
        id: "123456",
        event: "GameWon",
        userName: "Helgi",
        x: 2,
        y: 1,
        side: 'X',
        timeStamp: "2015.12.04T23:52:00"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    })
  });

});


