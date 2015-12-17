'use strict';

var loop = require('lodash');
var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

function given(userApi) {
  var _expectedEvents={
    "gameId": userApi._command.gameId,
    "name": undefined,
    "event": undefined,
    "userName": userApi._command.userName
  };


  var _users = [
    userApi
  ];

  var expectApi = {
    and: function (userCommand) {
      userCommand._command.name = userApi._command.name;
      userCommand._command.gameId = userApi._command.gameId;
      userCommand._command.otherUserName = userApi._command.userName;
      _users.push(userCommand);
      return expectApi;
    },
    withName: function (gameName) {
      _expectedEvents.name = gameName;
      return expectApi;
    },
    byUser: function (userName) {
      _expectedEvents.userName = userName;
      return expectApi;
    },
    expect: function (eventName) {
      _expectedEvents.event = eventName;
      return expectApi;
    },

    isOk: function (done) {
      var req = request(acceptanceUrl);
      loop.each(_users, function(userComm) {
        console.log(userComm._command.gameId);

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
          console.log(res.body[res.body.length-1])
          //should(res.body[res.body.length-1].gameId).eql(_expectedEvents[_expectedEvents.length-1].gameId);
          should(res.body[res.body.length-1].userName).eql(_expectedEvents.userName);
          should(res.body[res.body.length-1].event).eql(_expectedEvents.event);

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
    named: function(gameName) {
      userApi._command.name = gameName;
      return userApi;
    }
  };
  return userApi
}

module.exports.user = user;
module.exports.given = given;
