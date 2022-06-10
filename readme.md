# Project Name

Stock App 

## Description

App is designed to 
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend
- **events detail** - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend 
- **event attend** - As a user I want to be able to attend to event so that the organizers can count me in

## Backlog

List of other features outside of the MVPs scope

User profile:
- see my profile
- upload my profile picture
- see other users profile
- list of events created by the user
- list events the user is attending

Geo Location:
- add geolocation to events when creating
- show event in a map in event detail page
- show all events in a map in the event list page

Homepage
- ...


## ROUTES:

- GET / 
  - renders the homepage

- GET /auth/signup

  - redirects to / if user logged in
  - renders the signup form (with flash msg)

-POST /auth/signup

  - redirects to / if user logged in
  - body:
    - username
    - email
    - password

- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)

- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password

- POST /auth/logout

  - body: (empty)

- GET /events

  - renders the event list + the create form

- POST /events/create 

  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description

- GET /events/:id

  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet

- POST /events/:id/attend 
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)


## Models

User model
 
```
new Schema({username: {type: String,unique: true, password: type: String, isAdmin:type:Boolean, default: false admId:type: Schema.Types.ObjectId, ref:"User",default: null

```

Beverage model

new Schema({user:{type: Schema.Types.ObjectId,ref: "User"},name: {type: Stringtype: { type: String, expiration: type: String, size : {type: Number,min:300,max: 3000
buyingPrice type: Number,min: 0,max: 1000, sellingPrice : type: Number, min: 0, max: 2000 quantity : {type: Number,bar:{ type: Boolean, default: false},sold:{ type: Boolean, default: false}
});


```


``` 

## Links

### Trello

https://trello.com/b/cI9lmyU5/stockapp

### Git

The url to your repository and to your deployed project

https://github.com/Gabriel-PF/StockApp

https://ihstockapp.herokuapp.com/

### Slides

The url to your presentation slides

https://docs.google.com/presentation/d/14UeKrx_GQGoqbvHqqkqfU9xtHoNf0xUFPyuODErlLdA/edit?usp=sharing