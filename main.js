'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Slider, TouchableHighlight } from 'react-native';
import _ from 'lodash';
import Button from 'apsl-react-native-button'
import Sound from 'react-native-sound';

class SoundButton extends Component {

  constructor(props) {
    super(props);
    this.sound = new Sound(`${this.props.soundKey}.mp3`, Sound.MAIN_BUNDLE);
    this.sound.setNumberOfLoops(-1);
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
      this.sound.setNumberOfLoops(-1);
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
    // const button = this.state.playing ? '⏸' : '▶️';
    return (
      <TouchableHighlight style={styles.soundButton} onPress={this.startOrStop}>
        <View style={[styles.soundView, this.state.playing && styles.playingSound]}>
          <Text style={styles.soundName}>{this.props.name}</Text>
          <View style={styles.slider}>
            <Slider
              disabled={!this.state.playing}
              value={this.state.volume} onValueChange={this.updateVolume} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}


class MainView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // wind_short, bell_melody, birdsong, birdsong_and_water, blue_noise',
    // gusting_winds_v1, gusting_winds_v2, musical_neuromodulation,
    // purple_noise, river_and_cicada, shower, small_river_waterfall,
    // white_noise, white_noise_winds, zen_garden_v1, zen_garden_v2
    const sounds = [
      {name: 'Wind', key: 'gusting_winds_v1', category: 'nature'},
      {name: 'Wind & Rain', key: 'gusting_winds_v2', category: 'nature'},
      {name: 'Bells', key: 'bell_melody', category: 'melodies'},
      {name: 'Peace', key: 'zen_garden_v1', category: 'melodies'},
      {name: 'Zen', key: 'zen_garden_v2', category: 'melodies'},
      {name: 'White', key: 'white_noise', category: 'noise'},
      {name: 'Blue', key: 'blue_noise', category: 'noise'},
      {name:'Purple', key: 'purple_noise', category: 'noise'},
    ];

    const buttons = sounds.map((sound) => {
      return (<SoundButton key={sound.key} soundKey={sound.key} name={sound.name} />);
    });

    return (
      <View style={styles.container}>
        {buttons}
      </View>
    );
  }

}

var styles = StyleSheet.create({
  soundButton: {
    borderRadius: 10,
     flex: 1,
     alignItems: 'center',
     justifyContent: 'flex-start',
     margin: 5,
  },
  soundView: {
    backgroundColor: '#dbdae7',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playingSound: {
    backgroundColor: '#b2b0ce',
  },
  soundName: {
    margin: 10,
    width: 80,
  },
  slider: {
    height: 17,
    margin: 25,
    marginTop: 2,
    flex: 1,
  },
  container: {
     flex: 1,
     marginLeft: 10,
     marginRight: 10,
     marginTop: 30,
     marginBottom: 10,
   },
});

export default MainView;
