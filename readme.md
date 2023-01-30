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

### 2. **Deploying your Code**

First go to `package.json` and update the `deploy` script to use your lambda function, replacing `[arn]` with the one found on the AWS Lambda page.

Then, to deploy your skill backend code:

```sh
npm run deploy
```

At this point the logic for your skill is "live", and you need to create the product wrapper that interprets and displays this logic to the user.

### 3. **UI/UX considerations**

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
