import * as Alexa from "ask-sdk";

export class NameIntentHandler {
  intentSubject:string;
  handlerInput: Alexa.HandlerInput

  constructor(subject, handlerInput){
    this.intentSubject = subject;
    this.handlerInput = handlerInput;
  }

  returnNoIntentResponse = (type:string, msg:string) => {
      return this.handlerInput.responseBuilder
        .speak(msg)
        .withShouldEndSession(true)
        .getResponse();
    }

    returnYesIntentResponse = (type:string, msg:string) => {
        return this.handlerInput.responseBuilder
          .speak(msg)
          .reprompt("please tell me your name")
          .withShouldEndSession(false)
          .getResponse();
    }
    
}