var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
  var gameCreatedEvent = events[0];

  var gameState = {
    gameCreatedEvent : events[0],
    board: [['','',''],['','',''],['','','']]
  };

  var eventHandlers={
    'MoveMade': function(event){
      gameState.board[event.x][event.y] = event.side;
    }
  };

  _.each(events, function(event){
    var eventHandler = eventHandlers[event.event];
    if(eventHandler) eventHandler(event);
  });

  var logicState= {
    'RowWin': function(x, y, side) {
      if (gameState.board[x][0] === side &&
        gameState.board[x][1] === side &&
        gameState.board[x][2] === side) {

        return true;
      }
      else {
        return false;
      }
    },

    'ColumnWin': function(x, y, side) {
      if (gameState.board[0][y] === side &&
        gameState.board[1][y] === side &&
        gameState.board[2][y] === side) {
        return true;
      }
      else {
        return false
      }
    },

  };

  var handlers = {

    "MakeMove": function(cmd){
      if(gameState.board[cmd.x][cmd.y]!==''){
        return [{
          id: cmd.id,
          event: "IllegalMove",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }];
      }
      gameState.board[cmd.x][cmd.y] = cmd.side;
      if (logicState.RowWin(cmd.x, cmd.y, cmd.side) || logicState.ColumnWin(cmd.x, cmd.y, cmd.side)) {
        return [{
          id:cmd.id,
          event:"GameWon",
          userName:cmd.userName,
          name:cmd.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp:cmd.timeStamp
        }]
      }
      return [{
        id: cmd.id,
        event: "MoveMade",
        userName: cmd.userName,
        name:gameState.gameCreatedEvent.name,
        x:cmd.x,
        y:cmd.y,
        side:cmd.side,
        timeStamp: cmd.timeStamp
      }];
    },

    "CreateGame": function (cmd) {
      {
        return [{
          id: cmd.id,
          event: "GameCreated",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "JoinGame": function (cmd) {
      {
        if (gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: "GameDoesNotExist",
            userName: cmd.userName,
            timeStamp: cmd.timeStamp
          }];
        }
        return [{
          id: cmd.id,
          event: "GameJoined",
          userName: cmd.userName,
          otherUserName: gameCreatedEvent.userName,
          timeStamp: cmd.timeStamp
        }];

      }
    }
  };

  return {
    executeCommand: function (cmd) {
      return handlers[cmd.command](cmd);
    }
  };
};
