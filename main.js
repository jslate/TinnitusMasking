'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Slider } from 'react-native';
import _ from 'lodash';
import Button from 'apsl-react-native-button'
import Sound from 'react-native-sound';
// var Sound = require('react-native-sound');

class SoundButton extends Component {

  constructor(props) {
    console.log(props);
    super(props);
    this.sound = new Sound(`${this.props.soundKey}.mp3`, Sound.MAIN_BUNDLE);
    this.state = { playing: false, volume: 0.5 };
    this.startOrStop = this.startOrStop.bind(this);
    this.buttonColor = this.buttonColor.bind(this);
    this.updateVolume = this.updateVolume.bind(this);
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

  updateVolume(value) {
    this.sound.setVolume(this.state.volume);
    this.setState({volume: value});
  }

  buttonColor() {
    return this.state.playing ? '#e74c3c' : '#e98b39';
  }

  render() {
    const button = this.state.playing ? '⏸' : '▶️';
    const backgroundColor = this.state.playing ? '#DDDDDD' : '#AAAAAA';
    return (
      <View style={{height: 30, backgroundColor: backgroundColor, margin: 3, borderRadius: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{margin: 3, fontSize: 20}} onPress={this.startOrStop}>{button}</Text>
        <Text style={{width: 100}}>{this.props.soundKey.replace(/_/g, ' ')}</Text>
        <Slider
          disabled={!this.state.playing}
          style={{height: 17, margin: 10, width: 100}}
          value={this.state.volume} onValueChange={this.updateVolume} />
      </View>
    );
  }
}


class MainView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const soundKeys = ['bell_melody', 'birdsong', 'birdsong_and_water', 'blue_noise',
    'gusting_winds_v1', 'gusting_winds_v2', 'musical_neuromodulation',
    'purple_noise', 'river_and_cicada', 'shower', 'small_river_waterfall',
    'white_noise', 'white_noise_winds', 'zen_garden_v1', 'zen_garden_v2'];

    const buttons = soundKeys.map((soundKey) => {
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
     justifyContent: 'space-around',
     alignItems: 'stretch',
     marginLeft: 10,
     marginRight: 10,
     marginTop: 30,
     marginBottom: 10,
   },
});

export default MainView;
