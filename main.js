'use strict';

import React, { Component } from 'react';
import { Text, StyleSheet, View, Navigator, TouchableHighlight } from 'react-native';
import Player from './Player';
import Picker from './Picker';
import _ from 'lodash';

class MainView extends Component {
  constructor(props) {
    super(props);

    this.sounds = [
      {name: 'Wind', key: 'gusting_winds_v1', category: 'nature'},
      {name: 'Wind & Rain', key: 'gusting_winds_v2', category: 'nature'},
      {name: 'Birsong', key: 'birdsong', category: 'nature'},
      {name: 'Birsong & Water', key: 'birdsong_and_water', category: 'nature'},
      {name: 'River & Cicada', key: 'river_and_cicada', category: 'nature'},
      {name: 'Shower', key: 'shower', category: 'nature'},
      {name: 'Waterfall', key: 'small_river_waterfall', category: 'nature'},
      {name: 'Bells', key: 'bell_melody', category: 'melodies'},
      {name: 'Peace', key: 'zen_garden_v1', category: 'melodies'},
      {name: 'Zen', key: 'zen_garden_v2', category: 'melodies'},
      {name: 'Nueromodulation', key: 'musical_neuromodulation', category: 'melodies'},
      {name: 'White', key: 'white_noise', category: 'noise'},
      {name: 'White Wind', key: 'white_noise_winds', category: 'noise'},
      {name: 'Blue', key: 'blue_noise', category: 'noise'},
      {name:'Purple', key: 'purple_noise', category: 'noise'},
    ];

    this.state = {selectedSounds: [], editMode: false}; //this.sounds.slice(0, 5)};
    this.addSound = this.addSound.bind(this);
    this.removeSound = this.removeSound.bind(this);
  }

  addSound(key) {
    const soundToAdd = this.sounds.filter((sound) => sound.key === key);
    this.setState({selectedSounds: _.uniq(this.state.selectedSounds.concat(soundToAdd))});
  }

  removeSound(key) {
    this.setState({selectedSounds: this.state.selectedSounds.filter((sound) => sound.key !== key)}, () => {
      if (this.state.selectedSounds.length === 0) { this.setState({editMode: false}); }
    });
  }

  getRouteContent(name) {
    if (name === 'Player') {
      return <Player sounds={this.state.selectedSounds} removeSound={this.removeSound} editMode={this.state.editMode} />;
    } else {
      return <Picker sounds={this.sounds} selectedSounds={this.state.selectedSounds} addSound={this.addSound} />;
    }
  }


  render() {

    const routes = [{title: 'Player', buttonText: 'Add', index: 0}, {title: 'Add sound', buttonText: 'Done', index: 1}];


    const editButton = (
      <TouchableHighlight style={{alignSelf: 'flex-end'}} onPress={() => this.setState({editMode: !this.state.editMode})}>
        <View style={styles.plusButton}>
          <Text style={styles.plusButtonText}>{this.state.editMode ? 'Done' : 'Edit'}</Text>
        </View>
      </TouchableHighlight>
    )

    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => {
          return (
            <View style={{margin: 20, flex: 1, alignItems: 'stretch'}}>
              <TouchableHighlight style={{alignSelf: 'flex-end'}} onPress={() => route.index === 0 ? navigator.push(routes[1]) : navigator.pop()}>
                <View style={styles.plusButton}>
                  <Text style={styles.plusButtonText}>{route.buttonText}</Text>
                </View>
              </TouchableHighlight>
              { route.index === 0 && this.state.selectedSounds.length > 0 ? editButton : null}
              {this.getRouteContent(route.title)}
            </View>
          );
        }}
      />
    );
  }

}

var styles = StyleSheet.create({
  plusButton: {
    marginTop: 5,
    backgroundColor: '#00FF00',
  },
  plusButtonText: {
    borderRadius: 3,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 3,
    fontSize: 25,
  }
});



export default MainView;
