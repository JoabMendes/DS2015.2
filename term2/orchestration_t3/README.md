
SOA Implementation using Chorus.js
(SOA solution for Node.js apps)
================================

This example invokes some APIs using orchestration to calculate the external area
of an elipse inside a retangle. This example followed the `Calculations`
sample from [http://www.chorusjs.com/examples/](http://www.chorusjs.com/examples/)
, however in this Implementation there's complete *Server and Client* abstraction
running the orchestration when a client request a servicer from a provider. Also,
it fixes some problems related to the recent mongoDB new interface.

![Sequence Diagram](http://i.imgur.com/fAO4F1Y.png)

##Requirements

###Softwares

- Install [npm](https://www.npmjs.com/)
- Install [Node.js](https://nodejs.org/en/)
- Install [mongoDB](https://www.mongodb.org/)

###Packages

Inside of this diretory (orchestration_t3) install the packages

```sh
sudo npm install //Reads the file package.json

```

##running

### The server

To run the Server with orchestration working run:

```sh
node calculateArea2_v1.js

```

This will log the configuration made by the server

```sh
joab@joab-laptop:~/Devs/ifrn/DS2015.2/term2/orchestration_t3$ node calculateArea_v1.js
[2016-03-03 02:01:36.777] [WARN] [default] - ------------ Process Endpoints ---------------
[2016-03-03 02:01:36.780] [WARN] [default] - [ENDPOINT] calculateArea_calculateRectangleArea_receive
[2016-03-03 02:01:36.781] [WARN] [default] - [ENDPOINT] calculateArea_calculateArea_invoke
[2016-03-03 02:01:36.781] [WARN] [default] -
------------ Admin Console -------------------
[2016-03-03 02:01:36.781] [WARN] [default] - [ENDPOINT] /chorus/calculateArea/util/instances
[2016-03-03 02:01:36.781] [WARN] [default] -
------------ Server started ------------------
[2016-03-03 02:01:36.786] [WARN] [default] - [SERVER] listening on port 3000

```
### The client

There's a script called `client.sh` that runs a curl call with the endpoint created. Run:

```sh

chmod u+x client.sh //make the script executable
./client.sh //Runs the client script

```

client.sh source:

```sh
curl -H "Content-Type: application/json" -d '{ "input" : { "a" : "60" , "b" : "200" }}' http://localhost:3000/calculateArea/v1/receive/calculateRectangleArea
```
