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
import { Body, Button, Segment, Header, Title, Container } from 'native-base';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValue: "Job1",
      activeLocation: "North",
    };
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>MoodTrack</Title>
          </Body>
        </Header>
        <Grid>
          <Row>
            <Picker
              selectedValue={this.state.pickerValue}
              style={{ height: 50, width: 100 }}
              onValueChange={this.setPickerValue}>
              <Picker.Item label="Job1" value="Job1" />
              <Picker.Item label="Job2" value="Job2" />
              <Picker.Item label="Job3" value="Job3" />
              <Picker.Item label="Job4" value="Job4" />
              <Picker.Item label="Job5" value="Job5" />
            </Picker>
          </Row>
          <Row>
            <Segment>
              <Button active={this.state.activeLocation === "North"} first onPress={this.setActiveLocationNorth}><Text>North</Text></Button>
              <Button active={this.state.activeLocation === "South"} last onPress={this.setActiveLocationSouth}><Text>South</Text></Button>
            </Segment>
          </Row>
        </Grid>
      </Container>
    );
  }
  setActiveLocationNorth = () => {
    this.setState({
      activeLocation: "North"
    })
  }

  setActiveLocationSouth = () => {
    this.setState({
      activeLocation: "South"
    })
  }

  setPickerValue = (itemValue, itemIndex) => {
    this.setState({
      pickerValue: itemValue
    })
  }
}

const styles = StyleSheet.create({
});
