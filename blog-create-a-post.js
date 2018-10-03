//lambda function to create a post into dynamoDB

const AWS = require ('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'ap-northeast-1',apiVersion:'2012-08-10'});
const uuidv1 = require('uuid/v1');


exports.handler = (event, context, callback) => {
    console.log('~~~~~~logged event~~~~~',event)
    const params ={
        Item:{
            "PostID":{
                S:uuidv1()
            },
            "Content":{
                S:event.Content
            },
            "Title":{
                S:event.Title
            }
        },
        TableName:"myFirstDynamoDb"
    }
    
    dynamodb.putItem(params,function(err,data){
        if(err){
            console.log(err);
            callback(err)
        }else{
            console.log('successfully created, the data is',data);
            callback(null,data)
        }
    })
};
