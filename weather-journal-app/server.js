/* !Description:  Setup empty JS object to act as endpoint for all routes */
projectData  = {};

/* !Description:  Express to run server and routes */
const express = require('express');

/* !Description:  Start up an instance of app */
const jornalApp = express();

/* !Description:  Dependencies */
/* !Description:  Middleware*/

/* !Description:  Here we are configuring express to use body-parser as middle-ware. */
jornalApp.use(express.urlencoded({extended: false}));
jornalApp.use(express.json());

/* !Description:  Cors for cross origin allowance */ 
const cors = require('cors');
jornalApp.use(cors());

/* !Description:  Initialize the main project folder */
jornalApp.use(express.static('website'));
const port = 3000;

/* !Description:  Spin up the server */
jornalServer = jornalApp.listen(port, serverListeningCallBack );

/* !Description:  Callback to debug */
function serverListeningCallBack () {
    console.log(`Hello from Running Server on Port ${port} ^_^ `);
}


/* !Description:  Initialize all route with a callback function */
jornalApp.get('/all', );

/* !Description:  Callback function to complete GET '/all' */

/* !Description:  Post Route */
jornalApp.post('/postWeatherRequest', postCallBack);

function postCallBack (req , res)
{
    projectData  = req.body;
    console.log("The POST request has been sent ");
    console.log(projectData );
    res.send(JSON.stringify(projectData ));
}

/* !Description:  Get Route */
jornalApp.get('/getWeatherRequest', getCallBack);

function getCallBack (req , res)
{
    console.log("The GET request has been Recieved ");
    res.send(JSON.stringify(projectData ));
}