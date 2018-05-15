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

import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class MoodButton extends React.Component {
  constructor(props) {
    super(props);
  }

  renderText(submitted) {
    switch(submitted) {
      case 0:
        return <Button block success>Submit</Button>;
      case 1:
        return <Button disabled> <Spinner color='blue' /> </Button>
      case 2:
        return <Button disabled>Already Submitted!</Button>;
      default:
        return <Button block warning>Submit</Button>;
    }
  }

  render() {
    return (
      this.renderText(this.props.submitted)
    );
  }
}
 

const styles = StyleSheet.create({
});
