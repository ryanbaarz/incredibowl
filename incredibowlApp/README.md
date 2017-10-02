# IncredibowlApp
There are couple of ways to run the project. I included a build so you don't have to build the project to see it in
action. 

You can go to the /dist diretory and run 

`python -m SimpleHTTPServer 8008`

Incredibowl will run on `http://localhost:8008`

OR

If you would like to run the project yourself using the angular CLI
IncredibowlApp directory where the package.js is and run

`npm install`

`npm start` 

the app will run on `http://localhost:4200`

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3.
my node version was : 7.1.0
my npm version was : 3.10.9
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Where to look to inspect the code
Most of the good stuff is in the /src/app directory
You will find the entry point as the app.component which contains the layout and game control
it includes a couple of components from the components directory like
the score box and lane. 


## GamePlay
Click the big button to start a roll,
When the ball is horizontally aligned with where you want to bowl it 
click the ball control container again to roll it. 
