var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function(){
  var given, when, then;

  it('should create game',function(){
    given= [];
    when={
      id:"1337",
      command:"CreateGame",
      userName : "Helgi",
      name:"FirstGame",
      timeStamp: "2015.12.02T11:29:44"
    };
    then=[{
      id:"1337",
      name: "FirstGame",
      event:"GameCreated",
      userName: "Helgi",
      timeStamp: "2015.12.02T11:29:44"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
  it('should create game with another user another time',function(){
    given= [];
    when={
      id:"2337",
      command:"CreateGame",
      userName : "Siggi",
      name:"SecondGame",
      timeStamp: "2015.12.02T10:29:44"
    };
    then=[{
      id:"2337",
      name:"SecondGame",
      event:"GameCreated",
      userName: "Siggi",
      timeStamp: "2015.12.02T10:29:44"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});

