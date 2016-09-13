'use strict';

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SoundButton from './SoundButton';

class Player extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const buttons = this.props.sounds.map((sound) => {
      return (
        <SoundButton
          key={sound.key}
          soundKey={sound.key}
          name={sound.name}
          removeSound={this.props.removeSound}
          editMode={this.props.editMode}
        />);
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
     marginLeft: 10,
     marginRight: 10,
     marginTop: 30,
     marginBottom: 10,
   },
});

export default Player;
