# Adcash Order Manager

> Front End application for the Adcash Order Manager

View the **[demo application](http://165.227.121.28/adcash)**

## Getting started

1. Clone repo `https://github.com/chanakaDe/adcash-frone-end.git`
2. `npm install`
3. `gulp`

Make sure you have gulp installed globally (`npm install -g gulp`)

### Configuration

To change the API URL, simply edit `src/js/config/app.constants.js` and change `api` to the server's URL.

### Developer note

Application is secured using Auth0.
Please check corresponding files in the front end here : 

**[jwt.service.js](https://github.com/chanakaDe/adcash-front-end/blob/master/src/js/services/jwt.service.js)**

**[auth.interceptor.js](https://github.com/chanakaDe/adcash-front-end/blob/master/src/js/config/auth.interceptor.js)**

But in the demo, I'm not using JWT based (Auth0) authentication. 

All the form and unit validations are done in the main `Orders` view. No validations are done in the `Product` and `User` views. 
I got both Back end developer assignment and full stack developer assignment at once and I spent most of my time on the back end developer assignment. I completed this task ( full stack developer ) within 3 days of time. 

