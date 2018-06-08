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

## Developer Setup
### Install
```bash
# install expo and main packages
$ npm install exp --global
$ npm install # or yarn install

# server dependancies
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

TODO - Miki

## Front End Details
This section details where the components of the application are stored for reference or modification. The HomeScreen component holds all of the user interface of the application and can be accessed at `client/screens/HomeScreen.js`. The submit button logic which handles disabled after a user logs their data can be accessed at `client/components/MoodButton.js`. 