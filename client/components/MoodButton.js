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

import { Button, Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class MoodButton extends React.Component {
  constructor(props) {
    super(props);
  }

  renderText(submitted) {
    console.log("submitted is ", submitted)
    switch(submitted) {
      case 0:
        return <Button block success style={styles.button}><Text>Submit</Text></Button>;
      case 1:
        console.log("returning spinner")
        return <Spinner color='blue' />;
      case 2:
        return <Button block disabled style={styles.button}><Text>Already Submitted!</Text></Button>;
      default:
        return <Button block success style={styles.button}><Text>Submit</Text></Button>;
      }
  }

  render() {
    return (
      this.renderText(this.props.submitted)
    );
  }
}

const styles = StyleSheet.create({
	button: {
		margin:25
	}
})
