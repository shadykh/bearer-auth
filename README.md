# Lab: Class 07

### Authentication Server Phase 2: Token (Bearer) Authentication At this point, our auth-server is able to allow a user to create an account as well as to handle Basic Authentication (user provides a username + password). When a “good” login happens, the user is considered to be “authenticated” and our auth-server generates a JWT signed “Token” which is returned to the application We will now be using that Token to re-authenticate users to shield access to any route that requires a valid login to access

## Phase 2 Requirements

In this phase, the new requirement is that any user that has successfully logged in using basic authentication (username and password) is able to continuously authenticate ... using a "token"

> **Note:** All previous requirements and user stories are still required. This Phase is intended to add functionality to our existing authentication server.

The following core requirements detail the functionality for this phase of the project.

### As a user, I want to obtain a token after I signin, so that I can re-authenticate

- Using a tool such as `httpie`, `postman`, or a web form:
  - Following a **POST** to `/signup` to create an account (or) Following a **POST** to `/signin` with basic authorization
    - Send a response to the client with the proper status code along with an object with the following properties

      ```JSON
      {
        user: {
          _id: 'ID FROM DB',
          username: 'myusername'
        },
        token: 'JWT Token Here'
      }
      ```

### As a user, I want to use my token to access routes that require a valid user

- Using `httpie` or `postman`, send a request to a "protected" route, such as `/secretstuff`
  - Your request must send an "Authorization" header, with the value of `Bearer TOKEN`
    - **TOKEN** is the token that you would have returned to the user after their signin step (above)
  - If the **TOKEN** is valid (i.e. if it represents an actual user)
    - The route should function as it normally would (sending a response)
  - If not
    - Send the user an error message stating "Invalid Login"

### As the website owner, I want our token system to be as secure as possible so that our users can feel safe when logging in

- Research ways to "secure" our JWT Tokens
- Implement one or more methods to secure our login tokens

## Technical Requirements / Notes

For this assignment, you'll need to deploy a server that supports the above requirements.

> You have been supplied an express server in the `starter-code` folder from which you must operate

### Task 1: Fix The Bugs

You will notice, by both attempting to start the server, as well as to run the tests ... this server is a bit bug-ridden. Before you can tackle the task of securing the tokens, you must first get the server running.

- Tests have been written for you. When they are all passing, you're mostly there
- Perform a manual validation of the server as well, so that you can be assured that you can interact with it as required

### Task 2: Secure the JWT Tokens

Implement any 2 of these security measures, or any other measure that you can think of or have researched. Use a configuration option for these (i.e. an env setting) so that your system can handle multiple authorization schemes and easily turn them off/on

- Some ideas:
  - Add support for the creation and usage of time sensitive (valid for 15 minutes) JWTs
  - Add support for the creation and usage of 'single-use' JWTs
    - With every authenticated access, re-send a new JWT token as a cookie or header
    - Disable those that you've already authenticated
  - Implement Sessions
    - Rather than store a user's information in the token, create a "session" with an "id"
      - On the server, store lookup information in a session model using that ID
      - Sessions should timeout or be invalidated in some automated fashion
  - Add an additional layer of encryption

#### **Routes**

- `/signup`
  - Used to create a new user with a password

- `/signin`
  - Used to sign in with a user and password

- `/users`
  - Used to show all users

- `/secret`
  - Used to open a secret page

#### **The lab tree**

- ![Tree](./assets/tree.gif)

#### **Testing**

- Auth Middleware [bearer-auth-middleware.test.js]
  - user authentication
    - fails a login for a user (admin) with an incorrect token
    - logs in a user with a proper token
- Auth Router [router.test.js]
  - admin users
    - can create one
    - can signin with basic
    - can signin with bearer
  - bad logins
    - basic fails with known user and wrong password
    - basic fails with unknown user
    - bearer fails with an invalid token
    - basic fails with known user and wrong password  
    - basic fails with unknown user
    - bearer fails with an invalid token
    - basic fails with known user and wrong password  
    - basic fails with unknown user
    - bearer fails with an invalid token
  - editor users
    - can create one
    - can signin with basic
    - can signin with bearer
  - user users
    - can create one
    - can signin with basic
    - can signin with bearer
- Auth Middleware [basic-auth-middleware.test.js]
  - user authentication
    - fails a login for a user (admin) with the incorrect basic credentials
    - logs in an admin user with the right credentials

### **More about the Lab**

- #### Github

  - For the repo ***bearer-auth*** clicks => [here](https://github.com/shadykh/bearer-auth).
  - Pull Requests:
    - [https://github.com/shadykh/bearer-auth/pull/2](https://github.com/shadykh/bearer-auth/pull/2)
    - [https://github.com/shadykh/bearer-auth/pull/3](https://github.com/shadykh/bearer-auth/pull/3)
  - Actions:
    - [https://github.com/shadykh/bearer-auth/runs/2652012601?check_suite_focus=true](https://github.com/shadykh/bearer-auth/runs/2652012601?check_suite_focus=true)
    - [https://github.com/shadykh/bearer-auth/runs/2652014216?check_suite_focus=true](https://github.com/shadykh/bearer-auth/runs/2652014216?check_suite_focus=true)
    - [https://github.com/shadykh/bearer-auth/runs/2652014428?check_suite_focus=true](https://github.com/shadykh/bearer-auth/runs/2652014428?check_suite_focus=true)
  - Local Tests:
    - ![Local Test Image1](https://raw.githubusercontent.com/shadykh/bearer-auth/main/assets/localTest1.PNG)
    - ![Local Test Image2](https://raw.githubusercontent.com/shadykh/bearer-auth/main/assets/localTest2.PNG)
  - GitHub Tests:
    - ![github tests](https://raw.githubusercontent.com/shadykh/bearer-auth/main/assets/githubtests.PNG)
  - Postman Tests:
    - ![postmanTestSignUp](https://raw.githubusercontent.com/shadykh/bearer-auth/main/assets/postmanTestSignUp.PNG)
    - ![postmanTestSignIn](https://raw.githubusercontent.com/shadykh/bearer-auth/main/assets/postmanTestSignIn.PNG)
    - ![postmanTestSecret](https://raw.githubusercontent.com/shadykh/bearer-auth/main/assets/postmanTestSecret.PNG)
    - ![postmanTestUsers](https://raw.githubusercontent.com/shadykh/bearer-auth/main/assets/postmanTestUsers.PNG)

- #### Heroku

  - For the link of the ***deployment main branch => `/` <= route***  clicks => [here](https://shady-bearer-auth.herokuapp.com/).

- #### Endpoints

  - `/signup` Return JSON objects

    -

     ```
     {
        "user": {
            "_id": "60ad21b46ee66807acaacf6e",
            "username": "shady66",
            "password": "$2b$10$9Aa9KXApHALFsDz/HfBSYedqF.udhW8CMwZH64iPjghJKCJR8kxUK",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYWR5NjYiLCJpYXQiOjE2MjE5NTkxNzMsImV4cCI6MTYyMjg1OTE3MywiaXNzIjoic2hhZHkiLCJqdGkiOiJqd3RpZCJ9.o7oRaqVoD14aHaZlBD15o61-NRRi-btYvdclRwzSsZg"
    }
    ```

  - `/signin` Return JSON objects

    -

     ```
     {
        "user": {
            "_id": "60ad21b46ee66807acaacf6e",
            "username": "shady66",
            "password": "$2b$10$9Aa9KXApHALFsDz/HfBSYedqF.udhW8CMwZH64iPjghJKCJR8kxUK",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYWR5NjYiLCJpYXQiOjE2MjE5NTkxNzMsImV4cCI6MTYyMjg1OTE3MywiaXNzIjoic2hhZHkiLCJqdGkiOiJqd3RpZCJ9.o7oRaqVoD14aHaZlBD15o61-NRRi-btYvdclRwzSsZg"
    }
    ```

  - `/secret` Return a custom sentence
    - `Welcome to the secret area!`

  - `/users` Return a list of users
    - ```
      [
        "shady9v",
        "shady66"
      ]
      ```

- #### UML

  - ![UML](https://raw.githubusercontent.com/shadykh/bearer-auth/main/assets/UML.PNG)

- #### Tests

  - run `npm test`
  - Auth Middleware ➡️ [bearer-auth-middleware.test.js](./__tests__/bearer-auth-middleware.test.js)
  - Auth Router ➡️ [router.test.js](./__tests__/router.test.js)
  - Auth Middleware ➡️ [basic-auth-middleware.test.js](./__tests__/basic-auth-middleware.test.js)

- #### App

  - run `npm start` or `nodmon`
  - visit Herokue depolyed app [here](https://shady-bearer-auth.herokuapp.com/)

- I did this lab with help of
  - dependencies
    - morgen
    - mongoose
    - cors
    - express
    - dotenv
    - bcrypt
    - base-64
    - jsonwebtoken
  - devDependencies
    - supertest
    - jest
    - eslint
    - supergoose
  - framework
    - Node.js
  - tools
    - Github.
    - Heroku.
    - VsCode.
    - Ubuntu.
    - atlas mongodb
    - Postman

#### Notes

- Securing Passwords
  - Passwords are the first line of defense against cyber criminals. It is the most vital secret of every activity we do over the internet and also a final check to get into any of your user account, whether it is your bank account, email account, shopping cart account or any other account you have.
  - Cryptographic hash algorithms MD5, SHA1, SHA256, SHA512, SHA-3 are general purpose hash functions, designed to calculate a digest of huge amounts of data in as short a time as possible. Hashing is the greatest way for protecting passwords and considered to be pretty safe for ensuring the integrity of data or password.
  - > For further information clicks =>[here](https://thehackernews.com/2014/04/securing-passwords-with-bcrypt-hashing.html)
- Basic Auth
  - In the context of an HTTP transaction, basic access authentication is a method for an HTTP user agent (e.g. a web browser) to provide a user name and password when making a request. In basic HTTP authentication, a request contains a header field in the form of `Authorization: Basic <credentials>`, where credentials is the Base64 encoding of ID and password joined by a single colon :.
  - > For further information clicks =>[here](https://en.wikipedia.org/wiki/Basic_access_authentication)
- OWASP auth cheatsheet
  - **Authentication** is the process of verifying that an individual, entity or website is whom it claims to be. Authentication in the context of web applications is commonly performed by submitting a username or ID and one or more items of private information that only a given user should know.
  - **Session Management** is a process by which a server maintains the state of an entity interacting with it. This is required for a server to remember how to react to subsequent requests throughout a transaction. Sessions are maintained on the server by a session identifier which can be passed back and forward between the client and server when transmitting and receiving requests.
  - > For further information clicks =>[here](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

<br>

---
<br>

- ### Shady Khaled github ✅

  - [Shady Khaled](https://github.com/shadykh)

- ### Shady Khaled reading notes 📚

  - [Shady Khaled reading notes](https://shadykh.github.io/reading-notes/)

- ### Shady Khaled portfolio 💬

  - [Shady Khaled portfolio](https://portfolio-shady.herokuapp.com/)
