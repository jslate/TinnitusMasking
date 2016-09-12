'use strict';

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SoundButton from './SoundButton';

class Player extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // wind_short, bell_melody, birdsong, birdsong_and_water, blue_noise',
    // gusting_winds_v1, gusting_winds_v2, musical_neuromodulation,
    // purple_noise, river_and_cicada, shower, small_river_waterfall,
    // white_noise, white_noise_winds, zen_garden_v1, zen_garden_v2


    const buttons = this.props.sounds.map((sound) => {
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
  container: {
     flex: 1,
     marginLeft: 10,
     marginRight: 10,
     marginTop: 30,
     marginBottom: 10,
   },
});

export default Player;
