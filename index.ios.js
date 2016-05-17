/**
 * gene app
 * search "fetch" to see where it talks to the server
 */
'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './view/login';
import Main from './view/main';

class gene extends Component {
  constructor() {
    super();
    // this.state = {
    //   in: false,
    //   main: <View></View>,
    // };
    this.state = {
      in: true,
      main: <Main uid="jdshfdkjshafhdjk" exitGene={()=>this._exitGene()}/>,
    };
  }

  _enterGene() {
    this.setState({
      in: true,
    });
    this._renderMain();
  }

  _exitGene() {
    this.setState({
      in: false,
    });
    AsyncStorage.setItem('username','');
    AsyncStorage.setItem('uid','');
    AsyncStorage.setItem('idReady','false');
  }

  _renderMain() {
    AsyncStorage.getItem("uid").then((value) =>{
      if (value !== '') {
        let main = <Main uid={value} exitGene={()=>this._exitGene()}/>
        this.setState({
          main
        })
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.in?
          this.state.main:
          <Login enterGene={() => this._enterGene()}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('gene', () => gene);
