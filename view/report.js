/**
 * My report
 * WebView
 */
'use strict'

import React, { Component } from 'react';
import {
  WebView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Util from './utils';

export default class extends Component{
  render() {
    return(
      <View style={styles.reportContainer}>
        <Text style={styles.tabTitle}>My Report</Text>
        <WebView
          automaticallyAdjustContentInsets={false}
          source={{uri:"http://www.google.com"}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  reportContainer:{
    width: Util.size.width,
    height: Util.size.height - 145,
    backgroundColor:'#f5f5f5',
  },
  tabTitle:{
    marginBottom:10,
    marginLeft: 10,
    marginTop: 10,
  },
})