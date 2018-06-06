IGNITE Moodtrack - Lurie Children's Hospital Staff Mood Tracker
====================================

## Description
An internal mood tracking app for the staff in Lurie Children's Hospital.



## Developer Setup
#### Install
```javascript
// install expo and main packages
$ npm install exp --global
$ npm install // or yarn install

// server dependancies
$ cd server
$ npm install // or yarn install

```

#### Run
```javascript
// run client
$ exp start
// follow instructions in the console

// run server
$ cd server
$ npm run start // will start server
// OR
$ npm run dev // will run watch script using nodemon. Will livereload server on every save.
```


## Live Deployment

#### 1. Setup a new AWS account.
Using the [AWS website](https://aws.amazon.com/).
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


## Front End Details
This section details where the components of the application are stored for reference or modification. The HomeScreen component holds all of the user interface of the application and can be accessed at `client/screens/HomeScreen.js`. The submit button logic which handles disabled after a user logs their data can be accessed at `client/components/MoodButton.js`. 