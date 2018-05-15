import React from 'react';
import {
  Image,
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
import { Body, Button, Segment, Header, Title, Container, H1, H2, H3 } from 'native-base';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeJob: "Nurse",
      activeLocation: "North",
      activeShift: "Day",
      mood: 3,
    };
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>MoodTrack</Title>
          </Body>
        </Header>
        <View /*style={{flex: 1, justifyContent: 'center'}}*/>
          <H1 style={styles.heading}>Position:</H1>
          <Segment style={styles.segment}>
            <Button active={this.state.activeJob === "Nurse"} first onPress={() => {this.setActiveJob("Nurse")}}><Text>Nurse</Text></Button>
            <Button active={this.state.activeJob === "CNA"} onPress={() => {this.setActiveJob("CNA")}}><Text>CNA</Text></Button>
            <Button active={this.state.activeJob === "Fellow"} onPress={() => {this.setActiveJob("Fellow")}}><Text>Fellow</Text></Button>
            <Button active={this.state.activeJob === "Attending"} last onPress={() => {this.setActiveJob("Attending")}}><Text>Attending</Text></Button>
          </Segment>
          <H1 style={styles.heading}>Location:</H1>
          <Segment style={styles.segment}>
            <Button active={this.state.activeLocation === "North"} first onPress={() => {this.setActiveLocation("North")}}><Text>North</Text></Button>
            <Button active={this.state.activeLocation === "South"} last onPress={() => {this.setActiveLocation("South")}}><Text>South</Text></Button>
          </Segment>
          <H1 style={styles.heading}>Shift:</H1>
          <Segment style={styles.segment}>
            <Button active={this.state.activeShift === "Day"} first onPress={() => {this.setActiveShift("Day")}}><Text>Day</Text></Button>
            <Button active={this.state.activeShift === "Night"} last onPress={() => {this.setActiveShift("Night")}}><Text>Night</Text></Button>
          </Segment>

          <H1 style={styles.heading}>How are you feeling today?</H1>
          <H3 style={styles.subheading}>(1 is bad, 5 is great)</H3>
          <Slider
            style={styles.slider} value={this.state.mood}
            maximumValue={5} minimumValue={1} step={1} onValueChange={(val) => this.setState({mood:val})}>
          </Slider>
          <H3 style={styles.mood}>Mood: {this.state.mood}</H3>
        </View>
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  slider: {
    margin: 25,
  },
  segment: {
    backgroundColor: '#fff',
  },
  heading: {
    marginLeft: 20,
    marginTop: 20,
  },
  mood: {
    textAlign: 'center',
  },
  subheading: {
    marginLeft: 20,
    marginTop: 5,
  }

});
