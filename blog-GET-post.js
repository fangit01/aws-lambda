// get all posts or single posts depending on the url params


const AWS = require ('aws-sdk');
const dynamodb = new AWS.DynamoDB({region:'ap-northeast-1',apiVersion:'2012-08-10'})

exports.handler =  (event,content,callback) => {
       const type = event.type;
       if(type ==="all"){
           
           const params = {
               TableName:'myFirstDynamoDb'
           };
           
           dynamodb.scan(params,function (err,data){
               if(err){
                   console.log(err);
                   callback(err)
               }else {
                   console.log(data);
                  
                   // will return a dynamodb format data,so have to turn it into JSON/array format
                  const items = data.Items.map(
                      item=>{
                          return{
                              title:item.Title.S,
                              content:item.Content.S,
                              post_ID:item.PostID.S
                          }
                      }
                      )
                    callback(null,items); 
               }
           });
       }else if (type==="single"){
           const params = {
               Key:{
                   "PostID":{
                       S:"fdd94720-c63d-11e8-af99-b94de5bf5f2d"
                   }
               },
               TableName:'myFirstDynamoDb'
           }
           dynamodb.getItem(params,function(err,data){
               if(err){console.log(err)}
               else{
                   console.log(data);
                   
                   const title = data.Item.Title.S;
                   const content = data.Item.Content.S;
                   
                   
                   callback(null,{title,content})
                   
               }
           })
          
       } else {
           callback(null, "lambda will return nothing, because the type is unknown")
       }
};
