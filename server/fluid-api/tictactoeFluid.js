'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

function given(userApi) {
  var _expectedEvents=[{
    "id": "1234",
    "gameId": userApi._command.gameId,
    "event": "EventName",
    "userName": userApi._command.userName,
    "name": userApi._command.gameId,
  }];
  var _currentEvent = 0;
  var expectApi = {
    and: function (userCommand) {
      userCommand.name = userApi.name;
      userCommand.gameId = userApi.gameId;
      userCommand.otherUserName = userApi.userName;
      return expectApi;
    },
    withName: function (gameName) {
      _expectedEvents[_currentEvent].name = gameName;
      return expectApi;
    },
    expect: function (eventName) {
      _expectedEvents[_currentEvent].event = eventName;
      return expectApi;
    },
    isOk: function (done) {
      var req = request(acceptanceUrl);
      req
        .post('/api/createGame')
        .type('json')
        .send(userApi._command)
        .end(function (err, res) {
          if (err) return done(err);
          request(acceptanceUrl)
            .get('/api/gameHistory/' + userApi._command.gameId)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              should(res.body).eql(
                _expectedEvents);
              done();
            });
        });
      return expectApi;
    },
  };

  return expectApi;
}

function user(userName) {
  var userApi = {
    _command: {
      gameId: undefined,
      id: "1234",
      userName: userName,
      command: undefined,
      destination: undefined,
      name: undefined
    },
    createsGame: function (gameId) {
      userApi._command.gameId = gameId;
      userApi._command.command = "CreateGame";
      userApi._command.destination = '/api/createsGame';
      return userApi;
    },
    named: function(gamename) {
      userApi._command.name = gamename;
      return userApi;
    }
  };
  return userApi
}

module.exports.user = user;
module.exports.given = given;
