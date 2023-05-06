# Node_Books_App

TEST the API in Postman or other API testing tool.

set header: Content-Type : application/json for each route where request body is needed.

Register via : localhost:3000/api/user/register 
Login via:     localhost:3000/api/user/login

once login/register user will receive a JWT to access the system

To access the system User need to set header -> key="Authorization", value="GENERATED_JWT"


Get all books - GET : localhost:3000/api/books (SET "authorization" header "GENERATED_JWT")
Get a book - GET : localhost:3000/api/books/:id (SET "authorization" header "GENERATED_JWT", and id of a book that user wants)
Post a book - POST : localhost:3000/api/books (SET "authorization" header "GENERATED_JWT", pass data {"title","auther","pages","genre"} is JSON format)
Update a book - PUT : localhost:3000/api/books/:id (SET "authorization" header "GENERATED_JWT", pass data that user wants to update in JSON format)
Delete a book - DELETE : localhost:3000/api/books/:id (SET "authorization" header "GENERATED_JWT", pass id of book that user wants to delete)
