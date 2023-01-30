# Volley assessment by pallav soni
A custom alexa skill capabale of playing a dice roll game and listing top 10 high scores.

## **Getting Started**

technologies
unit testing
ui/ux considerations
challenges faced
learnings


You should receive this repository as a zip file. First ensure you have Node installed as well as Node's package manager, npm. [NVM](https://github.com/nvm-sh/nvm) is a good resource for installing Node. For your code editor, we recommend VS Code.

After extracting the repository, you should run through the following basic project commands:

```sh
cd volley-skill-starter
npm install              # Installs project dependencies
npm run build            # Builds the project (validate a good working state)
code .                   # Open VS Code
```

When you open VS Code, the editor may prompt you to install the workspace's recommended extensions - you should click "Yes" to the prompt if you want autoformatting support. There are as well included

After that point, you want to set up your AWS Lambda resource **[1]** and Alexa skill model **[2]** respectively.

[1] _**AWS Lambda**_: The place where the code (implementation logic) of the skill lives.

[2] _**Alexa skill model**_: The collection of intents, slots, configuration, endpoint etc. that make up the skill itself.

### 1. **Creating an AWS Lambda Function**

1. [Create a new AWS Lambda Function](https://console.aws.amazon.com/lambda/home?region=us-east-1#/create/function).
2. Give function name and choose **Create a new role with basic Lambda permissions**.
3. Under the **Designer** subheading, click **Add Trigger**.
4. Choose **Alexa Skills Kit**.
5. Select **Disable** for Skill ID verification.

## **A step ahead of requirements**

Took couple of initatives to develope a highly readbale and testable codebase.

1. **Unit testing**
-- Added unit tests for all custom intent handler. Tested  happy flows and appropriate edge cases.
-- Explored possible options for testing the skill. Finalized the use of alexa-skill-test-framework (https://github.com/BrianMacIntosh/alexa-skill-test-framework).
 -- use the command ```npm run test``` to run unit tests.
 
2. **Design pattern**
 -- Implemented Abstract Factory design pattern for developing easy to modify and extensible intent handlers for YES/NO prompts.
 -- Reasoning - There could be mutiple YES/NO intents in resposne to different queries but they still fall under a single intent type Amazon.Yes /Amazon.No. The handler should be able map the response to a particular query(eg - save score?, did u like the game?, etc). Hence a YES/NO intent handler factory is needed to quickly extend handlers for future possible queries and map them  correctly.
 

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
