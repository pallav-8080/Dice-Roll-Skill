import * as Alexa from "ask-sdk";
import {getCurrentScore, isGameOn, isIntent, isScoreDefined, modifySessionAttribute} from "../utils";
import {getScores, putScore} from '../DAO';
import { getSlotValue } from "ask-sdk";

export const SkillLaunchIntentHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest" ||
      isIntent("SkillLaunchIntent")(handlerInput)
    );
  },
  handle(handlerInput) {
    console.log("helllo");
    return handlerInput.responseBuilder
      .speak("Hello welcome to dice roll game! Do you want to play new game or listen to top 10 high scores?")
      // .reprompt('please select')
      .withShouldEndSession(false)
      .getResponse();
  },
};

export const StartGameHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      isIntent("StartGameIntent")(handlerInput)
    );
  },
  async handle(handlerInput) {
    console.log("start game handlerr");
    
    if( isScoreDefined(handlerInput)){

      modifySessionAttribute("score", 0, handlerInput);
      modifySessionAttribute("gameOn", true, handlerInput);

      return handlerInput.responseBuilder
      .speak("Okay no worries lets start a new game. Say roll dice when you are ready?")
      .withShouldEndSession(false)
      .getResponse();
    }
    modifySessionAttribute("score", 0, handlerInput);
    modifySessionAttribute("gameOn", true, handlerInput);

    return handlerInput.responseBuilder
      .speak("Ok lets play a new game. Say roll dice when you are ready?")
      .withShouldEndSession(false)
      .getResponse();
  },
};

export const RollDiceHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      isIntent("RollDiceIntent")(handlerInput)
    );
  },
  handle(handlerInput) {
    console.log("rolling dice");
    let {attributesManager} = handlerInput;

    // const diceAudio = '<audio src="https://audioclipsbucket.s3.us-west-2.amazonaws.com/dicee.mp3"/>';
    var randomInt:number = Math.floor(Math.random()*6+1);
    console.log(randomInt);


    const sessionAttributes =  attributesManager.getSessionAttributes() || {};  
  
    if(randomInt==1 ){
      modifySessionAttribute("score", 0, handlerInput);
    } else{
      const newScore = sessionAttributes.score + randomInt;
      modifySessionAttribute("score", newScore, handlerInput);

    }
    if(isGameOn(handlerInput)){
      return handlerInput.responseBuilder
        .speak(`Rolling dice <break time"1s"/> annd the number is ${randomInt}`)
        .withShouldEndSession(false)
        .getResponse();
    } else {
      var speakRes:string = `Okay let me roll a dice for you.<break time="1s"/>`;
      speakRes+=`the number is ${randomInt}`;

      modifySessionAttribute("score", randomInt, handlerInput);
      modifySessionAttribute("gameOn", true, handlerInput);


      return handlerInput.responseBuilder
        .speak(speakRes)
        .withShouldEndSession(false)
        .getResponse();
    }
  },
};

export const SaveScoreIntentHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      isIntent("SaveScoreIntent")(handlerInput)
    );
  },
  async handle(handlerInput) {
    console.log("save score");

    let {attributesManager} = handlerInput;
    const sessionAttributes =  attributesManager.getSessionAttributes() || {};  

    if(sessionAttributes.promptName){
    
      modifySessionAttribute("promptName", false, handlerInput);
      const name = getSlotValue(handlerInput.requestEnvelope, 'name');
      const res = await putScore(name,sessionAttributes.score);
      console.log("ssaved", res);

      return handlerInput.responseBuilder
        .speak(`your score is saved under the name ${name}. Thanks for playing with me. See you soon again.`)
        .withShouldEndSession(true)
        .getResponse();
    } else {
      return handlerInput.responseBuilder
        .speak(`Sorry i didn't get you. Lets try restarting the game. say play`)
        .withShouldEndSession(false)
        .getResponse();
    }
  },
};
export const EndGameHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      isIntent("EndGameIntent")(handlerInput)
    );
  },
 async handle(handlerInput) {
  console.log("game over");

    let {attributesManager} = handlerInput;
    const sessionAttributes =  attributesManager.getSessionAttributes() || {};  
    console.log(sessionAttributes);
    
    sessionAttributes.promptYN = true;
    attributesManager.setSessionAttributes(sessionAttributes);
    if(sessionAttributes.score!=undefined){
      return handlerInput.responseBuilder
        .speak(`Your score is ${sessionAttributes.score} <break time='1s' /> do you want to save your score?`)
        .withShouldEndSession(false)
        .getResponse();
    } else {
      return handlerInput.responseBuilder
        .speak(`Looks like you aren't in mood to play today. See you back soon`)
        .withShouldEndSession(true)
        .getResponse();
    }
  },
};

export const ListTopScoreHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      isIntent("ListTopScoreIntent")(handlerInput)
    );
  },
  async handle(handlerInput) {
    const topTenScores = await getScores();
    console.log("10000", topTenScores);
    let speakRes = 'Here is the list of top 10 scores <break time="1s"/>' ;
    
    for(let i =0; i<4; i++){
      console.log(topTenScores[i]);
      speakRes+=topTenScores[i].score;
      speakRes+='<break time="0.5s"/>';
    }
    speakRes+="I hope you are in the top 10 scores. Goodbye!";
    console.log(speakRes);

    return handlerInput.responseBuilder
      .speak(speakRes)
      .withShouldEndSession(true)
      .getResponse();
  },
};

export function ErrorHandler(handlerInput: Alexa.HandlerInput, error: Error) {
  console.log("errrrr");

  return handlerInput.responseBuilder
    .speak(
      ` Sorry, I had trouble doing what you asked. Please try again. Goodbye!`
    )
    .withShouldEndSession(true)
    .getResponse();
}

export const LiveScoreIntentHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      isIntent("LiveScoreIntent")(handlerInput)
    );
  },
  async handle(handlerInput) {
    console.log("liveeee");
    const currentScore = getCurrentScore(handlerInput);  

    if(isScoreDefined(handlerInput)){
      return handlerInput.responseBuilder
      .speak(`your curent score is saved under the name ${currentScore}. Say roll to keep playing`)
      .withShouldEndSession(false)
      .getResponse();
      
    } else {
      return handlerInput.responseBuilder
        .speak(`You do not have an ongoing game. Say play game to start the game.`)
        .withShouldEndSession(false)
        .getResponse();
    }
  },
};