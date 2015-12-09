
var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('join game command', function(){

  var given, when, then;

  it('should join game',function(){
    given= [{
      id:"333",
      event:"GameCreated",
      userName: "Helgi",
      timeStamp: "2015.12.02T11:29:44"
    }];
    when={
      id:"444",
      command:"JoinGame",
      userName : "Signy",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:30:50"
    };
    then=[{
      id:"444",
      event:"GameJoined",
      userName: "Signy",
      otherUserName: "Helgi",
      timeStamp: "2015.12.02T11:30:50"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
  it('Game does not exist',function(){
    given= [];
    when={
      id:"6666",
      command:"JoinGame",
      userName : "Helgi",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:30:55"
    };
    then=[{
      id:"6666",
      event:"GameDoesNotExist",
      userName: "Helgi",
      timeStamp: "2015.12.02T11:30:55"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

});
