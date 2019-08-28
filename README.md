# Conduit

Productivity app inspired by Wunderlist and OmniFocus

## Technologies Used

### MERN Stack

* MongoDB
    * NoSQL database used for storing all user, project, and task information
* Express.js
* Node.js
    * Node and Express were used for all backend management and routing
* React.js
    * Used in conjunction with Redux, React is used to make all frontend views, components, and state tracking in the browser

### Other tech

* Redux
    * Used for state tracking across the app
* Mongoose
    * Used to interact with documents in the database
* Bcrypt
    * Used for secure hashing of user credentials
* JWT (JSON Web Token)
* Passport JWT
    * JSON Web Token is used for user authorization; if logged in the user will have access to all of their data and routes as long as the request contain the correct token

## How It Works

1. Users sign up or login with a name, email, and password
1. Users are taken to the dashboard view after login from which they can manage all of their projects and tasks as well as create new ones
1. The dashboard view will also contain other useful features such as:
    * An inbox where a user can see upcoming tasks that are due or newly assigned to them
    * Search bar to quickly find a task by a specific keyword
1. Users are able to assign tasks to another user by email so that person can also track and update its progress

## MVPs

1. User Authentication
1. Home View / Dashboard
1. Projects / Task Grouping
1. To dos / Tasks
1. Production README
1. Hosting on Heroku
1. Assigning Tasks / Lists
1. File uploads

## Components

* Splash page
* Log in / Sign up form
* Home view / dashboard
  * Project index
  * Project new
  * Project show / Tasks index
    * Task new
