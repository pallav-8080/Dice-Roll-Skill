
/*
Mocha tests for the Alexa skill "Dice Roll".
Using the Alexa Skill Test Framework (https://github.com/BrianMacIntosh/alexa-skill-test-framework).
*/

import * as alexaTest from 'alexa-skill-test-framework';

// initialize the testing framework
alexaTest.initialize(
  require("../src/index.ts"),
  "amzn1.ask.skill.e26ece10-e6c8-4742-922f-82b5e21df117",
  "amzn1.ask.account.AH6KWAF3YIF6557UTPVTCPKB2W7YXY5WL6GOXUO5F36QQAJJBCHCILWMHONDDUNBY3BUKCASGQHLDGEH35U4RRDHFAVZP2UWR73ORYE25QSTQQUBMAIBSIPNU23UFDNWZ4W2TJCZ77GJFY7YCHPJWDQUISXYFGOVAEF4FP6I6YRPWRLUNN7RURI4Y5GZSK2XXN763FHVZWUMY6Q")

  alexaTest.setExtraFeature("questionMarkCheck", false)

  describe("Launch pallav's dice roll skill", function () {  
    // tests the behavior of the skill's LaunchRequest 
    describe("Launch Dice Roll skill test", function () {
      alexaTest.test([
        {
          request: alexaTest.getLaunchRequest(),
          says: "Hello welcome to dice roll game! Do you want to play new game or listen to top 10 high scores?",
          repromptsNothing: true,
          shouldEndSession: false
        }
      ]);
    });
  
    // Test the start game intent
    describe("Start Game Intent test", function () {
      alexaTest.test([
        {
          request: alexaTest.getIntentRequest("StartGameIntent"),
          says: "Ok lets play a new game. Say roll dice when you are ready?",
          repromptsNothing: true, shouldEndSession: false,
          hasAttributes: {
            score: 0,
            gameOn: true
          }
        }
      ]);
    });
   
     // Test Roll dice in normal play mode
     describe("RollDiceIntent Normal Play mode", function () {
      alexaTest.test([
        {
          request: alexaTest.getIntentRequest("RollDiceIntent"),
          saysLike: `Rolling dice <break time="1s"/> and the number is`,
          repromptsNothing: true, shouldEndSession: false,
          withSessionAttributes: {
            score: 0,
            gameOn: true
          }
        }
      ]);
    });
    // Test Roll dice in not so happy play mode
    describe("RollDiceIntent Unhappy mode", function () {
      alexaTest.test([
        {
          request: alexaTest.getIntentRequest("RollDiceIntent"),
          saysLike: `Seems like you want to play a dice roll game. Okay let me roll a dice for you.<break time="1s"/>`,
          repromptsNothing: true, shouldEndSession: false,
          withSessionAttributes: {
            score: 0,
            gameOn: false
          }
        }
      ]);
    });
    // Test Lost top 10 high scores intent
    describe("List top 10 scores", function () {
      alexaTest.test([
        {
          request: alexaTest.getIntentRequest("ListTopScoreIntent"),
          saysLike: `Here is the list of top 10 scores`,
          repromptsNothing: true, shouldEndSession: true
        }
      ]);
    });
    // Save score intent Test
    describe("Save score", function () {
      alexaTest.test([
        {
          request: alexaTest.getIntentRequest("SaveScoreIntent"),
          saysLike: `your score is saved under the name`,
          repromptsNothing: true, shouldEndSession: true,
          withSessionAttributes: {
            score: 0,
            gameOn: false,
            promptName: true
          }
        }
      ]);
    });
    // User utters name before ending game Test
    describe("User utters name before ending game", function () {
      alexaTest.test([
        {
          request: alexaTest.getIntentRequest("SaveScoreIntent"),
          says: `Sorry i didn't get you. Lets try restarting the game. say play`,
          repromptsNothing: true, shouldEndSession: false,
          withSessionAttributes: {
            score: 0,
            gameOn: false,
            promptName: false
          }
        }
      ]);
    });

    // Game over intent Test
    describe("Game over", function () {
      alexaTest.test([
        {
          request: alexaTest.getIntentRequest("EndGameIntent"),
          saysLike: `Your score is 100 <break time='1s' /> do you want to save your score?`,
          repromptsNothing: true, shouldEndSession: false,
          withSessionAttributes: {
            score: 100,
            gameOn: false,
            promptName: false
          }
        }
      ]);
    });

    // User chooses to save score Test
    describe("Handle save user score with name prompt", function () {
      alexaTest.test([
        {
          request: alexaTest.getIntentRequest("AMAZON.YesIntent"),
          saysLike: `By what name should i save your score?`,
          repromptsNothing: false, shouldEndSession: false,
          withSessionAttributes: {
            score: 100,
            gameOn: false,
            promptYN: true
          }
        }
      ]);
    });
    // User chooses not to save score Test
    describe("Handle do not save user score prompt", function () {
      alexaTest.test([
        {
          request: alexaTest.getIntentRequest("AMAZON.NoIntent"),
          saysLike: `see you soon goodbye!`,
          repromptsNothing: true, shouldEndSession: true,
          withSessionAttributes: {
            score: 100,
            gameOn: false,
            promptYN: true
          }
        }
      ]);
    });
  }); 
