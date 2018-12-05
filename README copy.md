# Sprint 5, Signup Form Assignment Part 2

In the last part of this assignment, you created an API and frontend which allows users to register by submitting a form with their username, email address, and password, storing users in the server-side database.

In this second part of the assignment, the task is to continue work on the previous assignment by adding a second page to the frontend, with a form to login, and more endpoints to the API to handle logging in, and retrieving some data which only a logged in user should be able to see.

## How to complete this assignment

There are many ways to handle authentication; some more secure than others. One of the more simple (but a little less secure) approaches is using tokens. The idea is that when the user is created a random token gets generated and stored in the database. Then, when they log in, the login endpoint returns that token. In subsequent requests which the user makes to the server, it needs to pass the token to the server in the headers of the request. If the token matched the one in the database, the user is authenticated and the server can return the private content, otherwise the server assumes they are not logged in and should return with a 401.

### Generating tokens

You can generate a token when a user is created by using the `default` key in a mongoose model definition. Like this:

```javascript
const User = mongoose.model("User", {
  name: String,
  accessToken: { type: String, default: () => uuid() }
})
```

This will use the uuid library to generate a random token for each user.

### Creating a login endpoint and storing tokens on the frontend

On the backend, create a new endpoint which will be used to authenticate the user. The user will need to post their username and password, which the server can then use to fetch the user and assert whether the password is correct or not. If it is correct, the server should respond with the user's token, otherwise it should return an error.

In the login endpoint, you'll need to use bcrypt compare the password in the request against the hashed password which is in the database to determine if the login should succeed or not. Then in the frontend, send the fetch request and handle the response. If the login was successful, you can store the token in either localStorage or a cookie.

This is a little tough and ties together a bunch of new concepts, so don't panic if it's difficult. Try to solve this yourself first. If you need a hint, see below.

<details><summary>Show solution</summary><p>

Backend:

```javascript
app.post("/login", (req, res) => {
  User.findOne({ name: "Bob" }).then(user => {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ message: "Success!", token: user.token, userId: user.id })
    } else {
      res.status(401).json({ message: "Authentication failure" })
    }
  })
})
```

Frontend:

```javascript
fetch("http://localhost:8080/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "bob",
    password: "password1"
  })
})
  .then(response => response.json())
  .then(json => {
    // Login was successful.
    localStorage.setItem("token", json.token)
    localStorage.setItem("userId", json.userId)
  })
  .catch(err => {
    console.log("Login failed", err)
  })
```

</p></details>

### Create an authenticated endpoint on the backend

On the backend, create an endpoint which would return information about the logged in user, but only if they pass a valid token. Create a middleware like we did in the lecture to check the token passed in the headers.

<details><summary>Show solution</summary><p>

```javascript
const findUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user.accessToken === req.headers.token) {
        req.user = user
        next()
      } else {
        res.status(401).send("Unauthorized")
      }
    })
}

app.use("/users/:id", findUser)

app.get("/users/:id", (req, res) => {
  res.json({
    name: req.user.name
  })
})
```

</p></details>

### Passing tokens with requests from the frontend

In the fronted, when the user is authenticated, you can pass the token which you've stored along with all requests. Make a `fetch` request to /users/:id to try to fetch information about the logged in user.

<details><summary>Show solution</summary><p>

This assumes you stored both the token and user id in localStorage...

```javascript
fetch(`http://localhost:8080/users/${localStorage.getItem("userId")}`, {
  headers: { token: localStorage.getItem("token") }
})
  .then(response => response.json())
  .then(json => {
    console.log("JSON from the server!", json)
  })
  .catch(err => {
    console.log("Error from the server!", err)
  })
```

</p></details>

### :books: Reading List

* [Mongoose Docs](http://mongoosejs.com/docs/index.html)
* [Using promises in Mongoose](http://erikaybar.name/using-es6-promises-with-mongoosejs-queries/)
* [Express](https://expressjs.com/)
* [Handling GET and POST endpoints in express](https://codeforgeek.com/2014/09/handle-get-post-request-express-4/)

---

### :sos: How to get help
Learning how to think as a web developer is learning how to be an expert in problem solving. So whenever you get stuck start with step 1 and continue until problem solved.

1. Google! In English, type in the error message if there is one, search within the language you're using (ie CSS, JavaScript etc).
2. Ask your code buddies in your Company.
3. Ask your fellow students in Slack.
4. Ask Damien. Please note: we are part of a sharing community - share the answer with your fellows.

---

### :boom: Success!

After creating this assignment you should have some understanding of the complexity of login systems and some of the challenges you must face in terms of choosing how to store data and keep things as secure as possible. You should be getting a little more comfortable with creating backends and tying it together with the frontend.

---

### :runner: Stretch Goals

Done with the main task? Continue with the stretch goals from part 1:

1. Add error handling in the frontend:
  * Make all 3 fields required before the user can submit the form
  * Add restrictions to the password to require a minimum length, or numbers and letters, etc.
1. Add error handling to the backend following the same rules, so that only "good" data is persisted.
1. Make the form look pretty and be responsive.
1. Investigate how to add validations through mongoose, to ensure data in your database is always good.
