import * as Alexa from "ask-sdk";

export function isIntent(...intents: string[]) {
  return (handlerInput: Alexa.HandlerInput) =>
    Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
    intents.some(
      (x) => Alexa.getIntentName(handlerInput.requestEnvelope) === x
    );
}

export const modifySessionAttribute = (attribute: string, value: any, handlerInput: Alexa.HandlerInput) => {
    let {attributesManager} = handlerInput;
    const sessionAttributes =  attributesManager.getSessionAttributes() || {};  
    sessionAttributes[attribute] = value;    
    attributesManager.setSessionAttributes(sessionAttributes);
}
export const isYNPromptOn = (handlerInput: Alexa.HandlerInput) => {
  let {attributesManager} = handlerInput;
  const sessionAttributes =  attributesManager.getSessionAttributes() || {};
  return sessionAttributes.promptYN;
}
export const isScoreDefined = (handlerInput: Alexa.HandlerInput) => {
  let {attributesManager} = handlerInput;
  const sessionAttributes =  attributesManager.getSessionAttributes() || {};
  return sessionAttributes.score!=null;
}
export const isGameOn = (handlerInput: Alexa.HandlerInput) => {
  let {attributesManager} = handlerInput;
  const sessionAttributes =  attributesManager.getSessionAttributes() || {};
  return sessionAttributes.gameOn;
}
export const getCurrentScore = (handlerInput: Alexa.HandlerInput) => {
  let {attributesManager} = handlerInput;
  const sessionAttributes =  attributesManager.getSessionAttributes() || {};
  return sessionAttributes.score;
}