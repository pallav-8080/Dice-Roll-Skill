# Volley assessment by pallav soni
A custom alexa skill capabale of playing a dice roll game and listing top 10 high scores.

## **Getting Started with the skill**


You should be able to run the skill on any alexa enabled device. Use below commands to navigate through the skill. (ou may use one word or synonyms)

**Lauch the skill** -  ``` open pallav's dice roll game``` <br/><br/>
**Start a dice roll game** - ``` play game ```<br/><br/>
**End a game**  - ``` game over ```<br/><br/>
**When asked for a name to save score**  - ``` by name ${yourFirstName}``` <br/><br/>
**To list top 10 high scores**  - ``` top 10 scores ``` <br/><br/>

## **Technologies**

1. AWS Lambda.
2. AWS DynamoDB
3. Alexa-skill-tesing-framework
4. Alexa Skills Kit
5. Typescript

## **A step ahead of requirements**

Took couple of initatives to develope a **highly readbale and testable** codebase.

1. **Unit testing**
    1. Added unit tests for all custom intent handler. Tested happy flows and appropriate edge cases.
    2. Explored possible options for testing. Finalized the use of **alexa-skill-test-framework** (https://github.com/BrianMacIntosh/alexa-skill-test-framework).
    3. use the command ```npm run test``` to run unit tests.
2. **Design pattern**
    1. Implemented _**Abstract Factory**_ design pattern for developing easily **modifiable and extensible** intent handlers for YES/NO prompts.
    2. **Reasoning** - There could be mutiple _**YES/NO**_ intents in resposne to different queries but they still fall under a single intent type Amazon.Yes /Amazon.No. The handler should be able map the response to a particular query(eg - save score?, did u like the game?, etc). Hence a YES/NO intent handler factory is needed to quickly extend handlers for future possible queries and map them  correctly. 

## **UI/UX considerations**

1. Added a **rolling dice audio(.mp3)** to intent resposne to make the **gaming experience** more lively and real.
2. Added **repromts** wherever needed to **allow enough time** for user to response to alexa query.
3. Added possible **one word alternatives** to intent **trigerrs** inorder to make it **easy and quick** for user to respond and navigate thorugh the game.


## **Challenges faced**

1. Adding audio to an intent handler response.
2. Setting up tests using mocha with typescript. (In the end switched to ts-mocha library)

## **Learnings**

1. Worked with alexa skills for first time and hence picked up available functionalities and development flow for creating a custom skill.
2. **Unit testing** alexa skills using the **alexa-skill-test** framework.
3. Deploying and testing alexa skills on actual device. In this case tested using the **Alexa app** on iphone and android.
4. Writing AWS S3 bucket **permissiona policies**.
