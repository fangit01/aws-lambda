# aws-lambda
lambda functions to connect to dynamoDB, use with aws api gateway to build a api endpoint


## blog-GET-post.js
to fetch all posts or single post from dynamoDB


## blog-create-a-post.js
to put an item into dynamoDB

POST method data required fields: 

title: post title  

content : post content
```
{
	"title":"post eight",
	"content":"content for post eight"
}
```
