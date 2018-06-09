IGNITE Moodtrack - Lurie Children's Hospital Staff Mood Tracker
====================================

## Description
An internal mood tracking app for the staff in Lurie Children's Hospital.
<div text-align="center">
    <img src="http://gdurl.com/Ydow" height="30%" width="30%">
    <img src="http://gdurl.com/fBtS" height="30%" width="30%">
    <img src="http://gdurl.com/PWmJ" height="30.5%" width="30.5%">
</div>
This project has two parts:

1. A phone app that hospital staff members use to log their mood.
2. A dashboard for hospital administrators/managers to view insights on the logged data.

The database and dashboard are hosted on [AWS RDS](https://aws.amazon.com/rds/) and [AWS Quicksight](https://aws.amazon.com/quicksight/) respectively. The setup instructions are given below.


### Analytics (via Amazon Quicksight)
A fully flexible analytics dashboard was setup using Amazon Quicksight. The dashboard allows to easily build graphs and figures for any data hosted under an Amazon RDS database.

![Summary Table](https://i.gyazo.com/1c52efc0c8ca9bc6234240d1eeb771bf.png?raw=true "Summary Table")
![Graph](https://i.gyazo.com/ebe72fb8f4ea5fadbdfb2b7797bb95ef.png?raw=true "Graph")




## Developer Setup
### Install
```bash
# install expo and main packages
$ npm install exp --global

# client dependencies
$ cd client
$ npm install # or yarn install

# server dependencies
$ cd server
$ npm install # or yarn install
```

#### Additional steps

A few additional steps must be carried out due to known bugs in some dependencies.

1. Open `client/node_modules/react-native-prompt/Prompt.js` and add to the file:
```javascript
import PropTypes from 'prop-types';
```

2. Delete the line: 
```javascript
PropTypes imported from 'react'
```

3. Open `client/node_modules/react-native-emoji/index.js` and add to the file:
```javascript
import PropTypes from 'prop-types';
```

4. Change line 8 to:
```javascript
name: PropTypes.string.isRequired,
```


### Run
```bash
# run server
$ cd server
$ npm run start # will start server
# OR
$ npm run dev # will run watch script using nodemon. Will livereload server on every save.

# run client
$ cd client
$ exp start
# follow instructions in the console
```

**Note**: During development, start the server before the client. The server's 'dev' script in package.json leverages ngrok to start a publicly accessible tunnel to http://localhost:3000. The `getNgrokUrl.js` script executes everytime this script is run and dynamically writes the randomly generated ngrok url to `client/constants/ngrokUrls.js`. The host url is then referenced from there for any requests.


## Live Deployment

#### 1. Setup a new AWS account.
Using the [AWS website](https://aws.amazon.com/).

### Database Setup

#### 2. Setup an AWS RDS database (PostgreSQL):
Using the AWS console. Setup the following DB schema to allow users to input mood entries:

##### Moods Table

|name | type | description |
|:---|:---:|:---|
| id | serial | Unique pkey for each mood entry |
| user_type | text	| Attending \ Nurse \ CNA \ Fellow  |
| location | text	| North \ South  |
| shift | text	| Day \ Night  |
| comment | text	| Optional text comment for this submission  |
| device_id | text	| Unique deviceID to identify user anonymously  |
| mood | int4	| mood submitted by the user on a scale of 1-100  |
| stress | int4	| stress level submitted by the user on a scale of 1-100  |

#### 3. Update server side database configuration:
By updating the `configDB` variable located under `/server/config/knexfile.js`.

#### 4. Deploy the `/server` to a cloud instance
Using either Heroku \ amazon EC2 instances.

#### 5. Update frontend API routes
In the app itself under the `/client` folder to match new the server configuration.

#### 6. Deploy the app to the App Stores:
Follow the guide located on the expo website: [Deploying to App Stores](https://docs.expo.io/versions/latest/distribution/app-stores).

### Dashboard Setup
Setting up a Quicksight dashboard is as easy: simply create a new Quicksight instance and choose the data source (your existing RDS database). For detailed instructions, follow [Setting up Quicksight](https://docs.aws.amazon.com/quicksight/latest/user/setup-new-quicksight-account.html)

## Server API

* `/` - GET
    * Simple route to redirect to home page of server.
    * Useful for checking if server is getting requests.
* `/csv/` - GET
    * Route to download a csv snapshot of the database.
    * Simply paste into your browser to be prompted to download the file.
* `/moods/write` - POST
    * Used to post a mood log to the database.
    * Example usage:
```javascript
...

let data =  JSON.stringify({
    device_id: Constants.deviceId,
    user_type: this.state.activeJob,
    location: this.state.activeLocation,
    shift: this.state.activeShift,
    timestamp: Moment.utc(),
    mood: this.state.mood,
    comment: this.state.comment,
    stress: this.state.stress
})

fetch(`${server_host}/moods/write`, {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    },
    body: data
})
.then(res => {
    console.log("Success!");
})
.catch(err => {
    console.log("Whoops!");
})

...
```

## Front End Details
This section details where the components of the application are stored for reference or modification. The HomeScreen component holds all of the user interface of the application and can be accessed at `client/screens/HomeScreen.js`. The submit button logic which handles disabled after a user logs their data can be accessed at `client/components/MoodButton.js`. 
