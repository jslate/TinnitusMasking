'use strict';

import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import _ from 'lodash';

class Picker extends Component {
  constructor(props) {
    super(props);
    this.soundIsSelected = this.soundIsSelected.bind(this);
    this.categories = ['nature', 'melodies', 'noise'];
    this.state = { category: 'nature', sounds: this.props.sounds.filter((sound) => sound.category === 'nature') };
  }

  displayCategory(categoryName) {
   this.setState({ category: categoryName, sounds: this.props.sounds.filter((sound) => sound.category === categoryName) });
  }

  soundIsSelected(key) {
    return _.includes(_.map(this.props.selectedSounds, 'key'), key);
  }

  renderSounds() {
    return this.state.sounds.map((sound) => {

      const soundViewStyles = getStyles({
        soundButtonView: true,
        soundButtonViewSelected: this.soundIsSelected(sound.key)
      });

      const soundTextStyles = getStyles({
        soundButtonSoundName: true,
        soundButtonSoundNameSelected: this.soundIsSelected(sound.key)
      });

      return (
        <TouchableHighlight key={sound.key} style={styles.soundButton} onPress={this.props.addSound.bind(this, sound.key)}>
          <View style={soundViewStyles}>
            <Text style={soundTextStyles}>{sound.name}</Text>
          </View>
        </TouchableHighlight>
      );
    });
  }

  renderCategoryButtons() {
    return this.categories.map((category, i) => {
      const isLast = i === this.categories.length - 1;
      const isSelected = category === this.state.category;

      const categoryTouchableStyles = getStyles({
        categoryButton: true,
        categoryButtonLast: isLast,
        categoryButtonSelected: isSelected,
      });

      const categoryButtonTextSelectedStyles = getStyles({
        categoryButtonText: true,
        categoryButtonTextSelected: isSelected,
      });

      return <TouchableHighlight style={categoryTouchableStyles} key={category} onPress={this.displayCategory.bind(this, category)}>
        <Text style={categoryButtonTextSelectedStyles}>
          {category}
        </Text>
      </TouchableHighlight>;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.categoryButtons}>
          {this.renderCategoryButtons()}
        </View>
        <View style={styles.soundButtons}>
          {this.renderSounds()}
        </View>
      </View>
    );
  }
}

const getStyles = (obj) => Object.keys(obj).map((key) => obj[key] ? styles[key] : null);

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  soundButtons: {
    marginTop: 20,
  },
  soundButton: {
   borderRadius: 10,
   margin: 5,
   height: 40,
  },
  soundButtonView: {
    backgroundColor: '#dbdae7',
    borderRadius: 10,
  },
  soundButtonViewSelected: {
    backgroundColor: '#b2b0ce',
  },
  soundButtonSoundName: {
    margin: 10,
  },
  soundButtonSoundNameSelected: {
    color: '#000000',
  },
  categoryButtons: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#000000',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
  },
  categoryButton: {
    borderColor: '#000000',
    borderStyle: 'solid',
    borderRightWidth: 1,
    flex: 1,
    padding: 0,
    margin: 0,
  },
  categoryButtonLast: {
    borderRightWidth: 0,
  },
  categoryButtonSelected: {
    backgroundColor: '#000000',
  },
  categoryButtonText: {
    color: '#000000',
    textAlign: 'center',
  },
  categoryButtonTextSelected: {
    color: '#FFFFFF'
  },
});

export default Picker;
