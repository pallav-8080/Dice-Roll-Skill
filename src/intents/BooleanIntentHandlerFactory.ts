import { NameIntentHandler } from "./BooleanIntentHandlerMethods";


export const BooleanIntentHandlerFactory = {
  createHandler: (context, handlerObject) => {
    switch(context){
      case "NAME": {
        return new NameIntentHandler(context, handlerObject);
      }
      default:
        return null;
    }
  }
}