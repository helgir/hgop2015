'use strict';

var loop = require('lodash');
var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

function given(userApi) {
  var _expectedEvents=[{
    "id": "1234",
    "gameId": userApi._command.gameId,
    "name": userApi._command.name,
    "event": "EventName",
    "userName": userApi._command.userName
  }];

  var _currentEvent = 0;

  var _users = [
    userApi
  ];

  var expectApi = {
    and: function (userCommand) {
      userCommand.name = userApi.name;
      userCommand.gameId = userApi.gameId;
      userCommand.otherUserName = userApi.userName;
      _users.push(userCommand);
      return expectApi;
    },
    withName: function (gameName) {
      _expectedEvents[_currentEvent].name = gameName;
      return expectApi;
    },
    byUser: function (userName) {
      _expectedEvents[_currentEvent].userName = userName;
    },
    expect: function (eventName) {
      _expectedEvents[_currentEvent].event = eventName;
      return expectApi;
    },

    isOk: function (done) {
      var req = request(acceptanceUrl);
      loop.each(_users, function(userComm) {

        req
          .post(userComm._command.destination)
          .type('json')
          .send(userComm._command)
          .end(function (err, res) {
            if (err) return done(err);
          });
      });
      request(acceptanceUrl)
        .get('/api/gameHistory/' + userApi._command.gameId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {

          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          should(res.body[res.body.length-1]).eql(
            _expectedEvents[_expectedEvents.length-1]);

          done();
        });
    return expectApi;
    },
  };

  return expectApi;
}

function user(userName) {
  var userApi = {
    _command: {
      id: "1234",
      userName: userName,
      command: undefined,
      destination: undefined,
      //name: undefined
    },
    createsGame: function (gameId) {
      userApi._command.gameId = gameId;
      userApi._command.command = "CreateGame";
      userApi._command.destination = '/api/createGame';
      return userApi;
    },
    joinsGame: function (gameId) {
      userApi._command.gameId = gameId;
      userApi._command.command = "JoinGame";
      userApi._command.destination = '/api/joinGame';
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
