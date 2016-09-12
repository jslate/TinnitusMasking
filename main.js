'use strict';

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import _ from 'lodash';
import Button from 'apsl-react-native-button'
import Sound from 'react-native-sound';
import SoundButton from './SoundButton';

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
  container: {
     flex: 1,
     marginLeft: 10,
     marginRight: 10,
     marginTop: 30,
     marginBottom: 10,
   },
});

export default MainView;
