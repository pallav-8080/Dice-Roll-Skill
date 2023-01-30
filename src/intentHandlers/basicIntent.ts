import * as Alexa from "ask-sdk";
import {isIntent, isYNPromptOn, modifySessionAttribute} from "../utils";
import { BooleanIntentHandlerFactory } from "./BooleanIntentHandlerFactory";


export const CancelOrStopIntentHandler: Alexa.RequestHandler = {
  canHandle: isIntent("AMAZON.CancelIntent", "AMAZON.StopIntent"),
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Goodbye!")
      .withShouldEndSession(true)
      .getResponse();
  },
};

export const HelpIntentHandler: Alexa.RequestHandler = {
  canHandle: isIntent("AMAZON.HelpIntent"),
  handle(handlerInput) {
    console.log("sssss");
    return handlerInput.responseBuilder
      .speak("How can i help you?")
      .getResponse();
  },
};
export const YesIntentHandler: Alexa.RequestHandler = {
  canHandle: isIntent("AMAZON.YesIntent"),
  handle(handlerInput) {
    const handler =  BooleanIntentHandlerFactory.createHandler("NAME", handlerInput );

    if(isYNPromptOn(handlerInput)){
      modifySessionAttribute("promotYN", false, handlerInput);
      modifySessionAttribute("promptName", true, handlerInput);
      return handler.returnYesIntentResponse("positive", "By what name should i save your score?");
    } else {
      
      return handler.returnYesIntentResponse("negative", "sorry i din't catch your name. try again");
    }
  },
};
export const NoIntentHandler: Alexa.RequestHandler = {
  canHandle: isIntent("AMAZON.NoIntent"),
  handle(handlerInput) {
    const handler = BooleanIntentHandlerFactory.createHandler("NAME", handlerInput );
    

    if(isYNPromptOn(handlerInput)){
    
      modifySessionAttribute("promptYN", false, handlerInput);

      return handler.returnNoIntentResponse("positive", "see you soon goodbye!");
    } else {
      return handler.returnNoIntentResponse("positive", "sorry i didn't understood ypur response. goodbye");
    }
  },
};