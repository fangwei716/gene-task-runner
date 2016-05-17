/**
 * network
 */
'use strict'

import React, { Component } from 'react';
import {
  NavigatorIOS,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Util from './utils';

export default class extends Component{
  render() {
    return(
      <ScrollView style={styles.networkContainer}>
        <View style={styles.network}>
          <Text style={styles.tabTitle}>My network (12)</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  networkContainer:{
    width: Util.size.width,
    height: Util.size.height - 145,
    backgroundColor:'#f5f5f5',
  },
  network:{
    paddingLeft:10,
    paddingTop:10,
    paddingBottom:70,
  },
  tabTitle:{
    marginBottom:10,
  },
})