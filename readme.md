# Project Name

Stock App 

## Description

This App is designed to control the stock of a bar, a simple concept to be used in a small scale, to avoid papers and excel tables and help the bar administrator to avoid loses and contabilize what has being sold in the end of the night. 
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 

- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup

- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend

- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account

- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

- **beverage list** - As a user I want to see all the events available so that I can choose which ones I want to attend

- **beverage create** - As a admin we want to create an beverage to be added in the stock

- **beverage detail** - As a admin/runner I want to see the event details a specific beverage

- **beverage stock list** - As a admin/runner I want to be able to send a beverage to the Bar so it can be sold and contabilized afterwars

**beverage Bar list** - As a user I want to be able to attend to event so that the organizers can count me in

**beverage sold** - As a user I want to be able to attend to event so that the organizers can count me in


## Backlog

List of other features outside of the MVPs scope


- Alert of low stock
- Use of a external or pre-defined API
- Mobile version to be used in a tablet 
- Graphics of statisticks and stock
- To automatically have the sum of what was sold in the "Sold view" 



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

  -  redirects to / if user logged out

- GET /beverages

  - renders the beverages list + the create form
  - Check role of user ( isLoggedIn for "runner", isAdmin for "Admin")

- POST /beverages/create 

  - redirects to / if user is "runner"
  If user is "admin" redirects to the form:
  - body: 
    - name
    - type
    - size
    - selling price
    - buying price
    - quantity


- GET /beverages/list

  - renders the beverages created
  

- POST /beverages/list 
  - redirects to /bar if user is "runner" or "admin" and send the beverage to the bar
  - body: (empty - the user is already stored in the session)

 GET /bar

  - renders the beverages sent to bar to be sold 
  

- POST /beverages/send-to-bar
  - redirects to /bar if user is "runner" or "admin" and send the beverage to the the bar view. 
  - body: (empty - the user is already stored in the session)

GET /sold

  - renders the beverages sent to bar to be sold 
  

- POST /beverages/send-to-sold
  - redirects to /sold if user is "runner" or "admin" and send the beverage to the the sold view. 
  - body: (empty - the user is already stored in the session)


## Models

User model
 
```
new Schema:
username: type: String,unique: true, 
password: type: String, 
isAdmin:type:Boolean, default: false admId:type: Schema.Types.ObjectId, ref:"User",default: null

```

Beverage model

new Schema:
user: type: Schema.Types.ObjectId,ref: "User",
name: type: Stringtype: type: String, 
expiration: type: String, size : type: Number, min:300, max: 3000
buyingPrice type: Number,min: 0, max: 1000, 
sellingPrice : type: Number, min: 0, max: 2000 
quantity : {type: Number,bar:{ type: Boolean, default: false}, sold: type :Boolean, default: false



```
 ## Views

Users: 


- not-found.hbs

- layout.hbs

- index.hbs

- error.hbs


auth:

- login

- signup
 
 beverage:


- beverages-sold.hbs 

- beverages-list.hbs

- beverages-edit.hbs

- beverages-details.hbs

- beverages-create.hbs

- beverages-bar.hbs

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