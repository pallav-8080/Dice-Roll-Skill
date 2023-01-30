// Data access object for score
import * as AWS from "aws-sdk";
import {config} from './awsConfig';

export const getScores = async () => {
    AWS.config.update(config.aws_remote_config);

    const docClient:AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: config.aws_table_name
    };
    try {
      const data = await docClient.scan(params).promise();
      console.log("Success")
      console.log(data);
      const { Items } = data;
      Items.sort((a,b) => b.score-a.score);
      console.log(Items);
      return Items;
    } catch (err) {
        console.log("Failure", err.message)
      // there is no data here, you can return undefined or similar
    }
  }

  export const putScore = async (username: String, score: Number) => {
    AWS.config.update(config.aws_remote_config);

    const docClient:AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: config.aws_table_name,
      Item: {
        name: username,
        score: score
      },
    };
    try {
      const data = await docClient.put(params).promise();
      console.log("Success")
      console.log(data);
      return data;
    } catch (err) {
        console.log("Failure", err.message);
      // there is no data here, you can return undefined or similar
    }
  }
