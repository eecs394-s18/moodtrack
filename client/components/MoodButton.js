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
import { Button} from 'native-base';

export default class MoodButton extends React.Component {
  constructor(props) {
    super(props);
  }

  renderText(submitted) {
    switch(submitted) {
      case 0:
        return <Button>Submit</Button>;
      case 1:
        return <Button disabled={true}>Loading</Button>;
      case 2:
        return <Button disabled={true}>Already Submitted!</Button>;
      default:
        return <Button>Submit</Button>;
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
