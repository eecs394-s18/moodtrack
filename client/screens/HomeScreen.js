import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Picker,
  Platform,
  ScrollView,
  Slider,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser, Constants } from 'expo';

import { MonoText } from '../components/StyledText';

import { Col, Grid, Row } from 'react-native-easy-grid';
import { Body, Button, Segment, Header, Title, Container, Content, Form, Textarea, H1, H2, H3 } from 'native-base';
import MoodButton from '../components/MoodButton';

import Moment from 'moment';
import urls from '../constants/ngrokUrls'
import Prompt from 'react-native-prompt'

/*
Go to node_modules/react-native-prompt/Prompt.js and add
import PropTypes from 'prop-types';
and delete the PropTypes imported from 'react'

Go to node_modules/react-native-emoji/index.js and add
import PropTypes from 'prop-types';
and change line 8 to
name: PropTypes.string.isRequired,
*/
//Emoji Data Table: https://unicodey.com/emoji-data/table.htm
import Emoji from 'react-native-emoji';
import {MediaQuery, ResponsiveComponent, ResponsiveStyleSheet} from "react-native-responsive-ui";


export default class HomeScreen extends ResponsiveComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeJob: "Nurse",
      activeLocation: "North",
      activeShift: "Day",
      mood: 50,
      submitted: 0,
      comment: "",
      lastSubmitted: 0,
      stress: 0
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  static navigationOptions = {
    header: null,
  };

  onSubmit(event) {
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

    console.log(data) // debug
	console.log(`Posting to ${urls[1]}/moods/write`) // debug
    this.setState({submitted: 1}) // loading circle appears
    fetch(`${urls[1]}/moods/write`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data
    })
    .then(res => {
	  if (res.status >= 200 && res.status < 300) {
        console.log(res.status, "Mood successfully submitted.");
        alert("Thanks! Have a great shift.")
        this.setState({
          submitted: 2,
          comment: "",
          lastSubmitted: Moment.utc()
        })
        setTimeout( () => {
          this.setState({submitted: 0})
        }, 60000)
	  }
	  else {
		console.log(res.status, "Mood submission failed.")
        alert("Oops! Something went wrong. Please try again.")
        this.setState({submitted: 0})
	  }
    })
    .catch(err => {
      console.log(err, "Mood submission failed.")
      alert("Oops! Something went wrong. Please try again.")
      this.setState({submitted: 0})
    })
  }

  render() {
    const {style} = this;
    return (
      <Container style={constStyles.container}>
        <Header>
          <Body>
            <Title>IGNITE MoodTrack</Title>
          </Body>
        </Header>
        {/*Try using KeyboardAvoidingView to push the text box into view. May be buggy.*/}
        <ScrollView contentContainerStyle={constStyles.view} keyboardDismissMode="interactive">
            <View style={style.subview}>
              <H1>Position</H1>
              <Segment style={style.segment}>
                <Button active={this.state.activeJob === "Nurse"} first onPress={() => {this.setActiveJob("Nurse")}}><Text>Nurse</Text></Button>
                <Button active={this.state.activeJob === "CNA"} onPress={() => {this.setActiveJob("CNA")}}><Text>CNA</Text></Button>
                <Button active={this.state.activeJob === "Fellow"} onPress={() => {this.setActiveJob("Fellow")}}><Text>Fellow</Text></Button>
                <Button active={this.state.activeJob === "Attending"} last onPress={() => {this.setActiveJob("Attending")}}><Text>Attending</Text></Button>
              </Segment>
            </View>

            <View style={style.subview}>
              <H1>Location</H1>
              <Segment style={style.segment}>
                <Button active={this.state.activeLocation === "North"} first onPress={() => {this.setActiveLocation("North")}}><Text>North</Text></Button>
                <Button active={this.state.activeLocation === "South"} last onPress={() => {this.setActiveLocation("South")}}><Text>South</Text></Button>
              </Segment>
            </View>

            <View style={style.subview} marginBottom="10%">
              <H1>Shift</H1>
              <Segment style={style.segment}>
                <Button active={this.state.activeShift === "Day"} first onPress={() => {this.setActiveShift("Day")}}><Text>Day</Text></Button>
                <Button active={this.state.activeShift === "Night"} last onPress={() => {this.setActiveShift("Night")}}><Text>Night</Text></Button>
              </Segment>
            </View>

            <H1>How are you feeling today?</H1>
            <View style={{flexDirection:'row'}}>
              <Text style={constStyles.emoji}><Emoji name="disappointed"/></Text>
              <Slider
                style={constStyles.slider} value={this.state.mood} step={1} value={50}
                minimumValue={0} maximumValue={100} onSlidingComplete={(val) => this.setState({mood:val})}>
              </Slider>
              <Text style={constStyles.emoji}><Emoji name="smile"/></Text>
            </View>
            <H1>How stressed are you?</H1>
            <View style={{flexDirection:'row'}}>
              <Text style={constStyles.emoji}><Emoji name="relieved"/></Text>
              <Slider
                style={constStyles.slider} value={this.state.mood} step={1} value={0}
                minimumValue={0} maximumValue={100} onSlidingComplete={(val) => this.setState({stress:val})}>
              </Slider>
              <Text style={constStyles.emoji}><Emoji name="weary"/></Text>
            </View>
            <View>
            {/* <H1>Anything else?</H1> */}
              <Prompt
              title="Comment"
              placeholder="optional"
              defaultValue={ this.state.comment }
              visible={ this.state.promptVisible }
              onCancel={ () => this.setState({
                promptVisible: false,
                comment: "" // clears text on cancel
              })}
              onSubmit={ (value) => this.setState({
                promptVisible: false,
                comment: value
              })}
              />

            <Button style={ constStyles.promptButton } block bordered onPress={() => this.setState({ promptVisible: true })}>
              <Text>Add Comment <Emoji name="speech_balloon"/></Text>
            </Button>
          </View>
        </ScrollView>
        <MoodButton submitted={this.state.submitted} onSubmit={this.onSubmit}></MoodButton>
      </Container>
    );
  }
  setActiveLocation = (location) => {
    this.setState({
      activeLocation: location
    })
  }
  setActiveJob = (job) => {
    this.setState({
      activeJob: job
    })
  }
  setActiveShift = (shift) => {
    this.setState({
      activeShift: shift
    })
  }
  get style() {
    return ResponsiveStyleSheet.select([
    {
      query: { orientation: "landscape" },
      style: {
        subview:{
          flexDirection:'row'
        },
        segment:{
          flex:1,
          justifyContent:'flex-end',
          backgroundColor:'#fff'
        }
      }
    },
    {
      query: { orientation: "portrait" },
      style: {
        subview:{
          flexDirection:'column'
        },
        segment:{
          justifyContent:'flex-start',
          backgroundColor:'#fff'
        }
      }
    }
    ]);
  }
}

const constStyles = StyleSheet.create({
  container:{
    backgroundColor:'#fff'
  },
  emoji: {
    fontSize: 50,
    marginVertical: 20,
    marginHorizontal: 5
  },
  slider: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30
  },
  view: {
    margin:25,
    paddingBottom:50
  }
});
