import * as Alexa from "ask-sdk";
import {CancelOrStopIntentHandler, NoIntentHandler, YesIntentHandler, HelpIntentHandler} from "./intents/basicIntent";
import {    SkillLaunchIntentHandler, StartGameHandler, ListTopScoreHandler, EndGameHandler,   RollDiceHandler, SaveScoreIntentHandler, ErrorHandler, LiveScoreIntentHandler} from "./intents/customIntents";



export const handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    CancelOrStopIntentHandler,
    HelpIntentHandler,
    SkillLaunchIntentHandler,
    StartGameHandler,
    ListTopScoreHandler,
    EndGameHandler,
    RollDiceHandler,
    NoIntentHandler,
    YesIntentHandler,
    LiveScoreIntentHandler,
    SaveScoreIntentHandler
  )
  .addErrorHandler(() => true, ErrorHandler)
  .lambda();

  exports.testHandler = handler;
