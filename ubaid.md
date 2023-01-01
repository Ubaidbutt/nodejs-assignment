### Project structure
## Receiver 
    This simple service contains the logic for connecting with the NATS server & receiving messages on a particular topic. This service also needs to connect with the mongodb database to store the messages in the mongodb collection.
    There is a config file under config directory where you can configure NATS server address or the topic name.
    Just run `npm start` to start the receiver
    
## Repository
    Repository is the database access layer with some helper functions to interact with database such as adding records in the mongodb collection or fetching records. The vehicles repository contains two methods to add and fetch vehicles from the vehicles collection
    
## rest-api
    This is the simple express api to fetch the data stored in the vehicles collection
    - Config: This contains some configuration for the API 
    - Controller: The layer for interacting with the repository
    - Router: This contains the routing logic for the API
    - Test: This folder contain docker file and seed data for setting up the local mongodb to run end to end tests
    
    Documentation: 
        - Endpoint-1: /vehicles (GET) - returns all the vehicles data
        - Endpoint-2: /vehicles/:{vehicleName} - returns all the data for one specific vehicle
        
        - Both the endpoint accepts two query params: limit & offset 
    
    Move in the directory & run 'npm install' & then run `npm start` to start the server

## utilities
    This contains database utility to connect with mongodb and different services can uses it like receiver and rest-api

## web-socket-server
    This contains a very minimilistic web socket server setup 
    
     Move in the directory & run 'npm install' & then run `npm start` to start the server

     You need to install smart web socket client [Chrome extension](https://chrome.google.com/webstore/detail/smart-websocket-client/omalebghpgejjiaoknljcfmglgbpocdp) to test the web socket server. Run the server and use the extension to connect and listen for messages
     
### Comments
One can do a lot with the project assignment given the time but I have spent only around 3 hours in total.
## Design decision

- I used mongodb atlas mainly because that's what is mostly used in a production setup instead of managing everything on your own. Also, I wanted to use change stream features of mongodb for web-socket-server logic. I could have spun a local mongodb replica set with docker but i wanted to focus on the main tasks first in the given time

- For the web socket server logic, I had two options:
    - Once receiver add the data to mongodb, listen to change streams and send the data to all the connected clients
    - Once the receiver receive the data from NATS, the receiver can request the clients from the web socket server and send the message to them in parallel of storing the data in mongodb

    - I used the first approach because I think it is a better separation of responsibility. Receiver is only responsible for storing the data in the database and web socket server reacts to database changes and send the changes to the clients connected
    - However, to be able to have proper test for the web socket server with this approach, i need to setup a local docker replica set so i can test the server with mongodb change streams
    
- I also wanted to have utility and repository combined into one single reusable utility - The current state of these utilities is not ideal especially with reusing of MongoDB connection in different apps

- I would have liked to add mongodb docker replica set to add some test for the web server but I could only do this much in the 3 hours that I spent on the assignment



Thank you for your time and consideration

