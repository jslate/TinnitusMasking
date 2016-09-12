import React, { Component } from 'react';
import { StyleSheet, Text, View, Slider, TouchableHighlight } from 'react-native';
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
});

export default SoundButton;
