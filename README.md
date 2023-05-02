## Introduction:
- JSON web tokens are ONE way to implement authentication. (sessions is another way to implement authentication)

- JWT stands for JSON Web Token, and it's a compact and secure way of representing claims to be transferred between two parties. It's typically used for authentication and authorization purposes in web applications


app.use(express.json()) : it takes any json data that comes along with a request and parser it into a js object, so we can access it. 
When a client sends a request to the server with a JSON payload in the request body, the express.json() middleware function parses the JSON data and makes it available on the req.body object. This req.body object can then be used in your route handlers to access the JSON data.