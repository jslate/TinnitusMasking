'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import _ from 'lodash';
import Button from 'apsl-react-native-button'
import Sound from 'react-native-sound';
// var Sound = require('react-native-sound');

class SoundButton extends Component {

  constructor(props) {
    console.log(props);
    super(props);
    this.sound = new Sound(`${this.props.soundKey}.mp3`, Sound.MAIN_BUNDLE);
    this.state = { playing: false };
    this.startOrStop = this.startOrStop.bind(this);
    this.buttonColor = this.buttonColor.bind(this);
  }

  startOrStop() {
    if (this.state.playing) {
      this.sound.stop();
      this.setState({playing: false});
    } else {
      this.sound.play(() => this.setState({playing: false}));
      this.setState({playing: true});
    }
  }

  buttonColor() {
    return this.state.playing ? '#e74c3c' : '#e98b39';
  }

  render() {
    const text = this.state.playing ? `stop ${this.props.soundKey}` : `play ${this.props.soundKey}`;
    return (
      <Button style={{height: 30, backgroundColor: this.buttonColor()}} textStyle={{fontSize: 12}} onPress={this.startOrStop}>
        {text}
      </Button>
    );
  }
}


class MainView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const soundKeys = ['bell_melody', 'birdsong', 'birdsong_and_water', 'blue_noise',
    'gusting_winds_v1', 'gusting_winds_v2', 'musical_neuromodulation', 'musical_neuromodulation_short',
    'purple_noise', 'river_and_cicada', 'shower', 'small_river_waterfall',
    'white_noise', 'white_noise_winds', 'zen_garden_v1', 'zen_garden_v2'];

    const buttons = soundKeys.map((soundKey) => {
      console.log(soundKey)
      return (<SoundButton key={soundKey} soundKey={soundKey} />);
    });

    return (
      <View style={styles.container}>
        {buttons}
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     marginLeft: 20,
     marginRight: 20,
   },
});

export default MainView;
