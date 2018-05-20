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
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import { Col, Grid, Row } from 'react-native-easy-grid';
import { Body, Button, Segment, Header, Title, Container, Content, Form, Textarea, H1, H2, H3 } from 'native-base';
import MoodButton from '../components/MoodButton';
/*
Go to .node_modules/react-native-emoji/index.js and add
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
      mood: 3,
      submitted: 0,
    };
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    const {style} = this;
    return (
      <Container style={constStyles.container}>
        <Header>
          <Body>
            <Title>IGNITE MoodTrack</Title>
          </Body>
        </Header>
        //Try using KeyboardAvoidingView to push the text box into view. May be buggy.
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

            <View style={style.subview}>
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
                style={constStyles.slider} value={this.state.mood}
                minimumValue={1} maximumValue={5} onSlidingComplete={(val) => this.setState({mood:val})}>
              </Slider>
              <Text style={constStyles.emoji}><Emoji name="smile"/></Text>
            </View>
            <View style={{alignSelf:'stretch'}}>
              <H1>Anything else?</H1>
              <Form>
                <Textarea rowSpan={5} bordered placeholder="Optional" />
              </Form>
            </View>
        </ScrollView>
        <MoodButton submitted={this.state.submitted}></MoodButton>
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
    marginHorizontal: 10
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
