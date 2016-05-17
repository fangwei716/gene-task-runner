/**
 * modules
 * highlight the new modules!
 */
'use strict'

import React, { Component } from 'react';
import {
  AlertIOS,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  WebView
} from 'react-native';
import {
  MKColor,
  MKTextField,
  mdl,
} from 'react-native-material-kit';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';

import {SingleConfig} from './config';

export default class extends Component{
  constructor() {
    super();
    this.state = {
      showModal:false,
      moduleSelected: 0,
      modalTitle: '',
    }
  }

  _initSingleTask(moduleSelected) {
     AlertIOS.prompt(
      'Add Task',
      'Please enter the name for your task.',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: (title) => {
          this.setState({showModal:true,modalTitle:title})
        }},
      ],
      'plain-text',
      'New task'
    );
  }

  _hideModal() {
    this.setState({
      showModal:false,
    });
  }

  render() {
    return(
      <ScrollView style={styles.container}>
        <Modal
          animated={true}
          transparent={false}
          visible={this.state.showModal}>
          <SingleConfig 
            {...this.state}
            hideModal={() => this._hideModal()}
          />
        </Modal>
        <View style={styles.content}>
          <Text style={styles.tabTitle}>Modules</Text>
          <TouchableHighlight underlayColor="rgba(0,0,0,0)" onPress={() => this._initSingleTask(1)} style={styles.moduleContainer}>
            <View style={styles.module}>
              <Image style={styles.moduleImg} source={require('../img/2dna.jpg')}/>
              <View style={styles.newContainer}>
                <Text style={styles.moduleText}>HISAT</Text>
                <View style={styles.new}>
                  <Text style={styles.newText}>new</Text>
                </View>
              </View>
              <Icon style={styles.moduleIcon} name="ios-arrow-dropright" size={18} color="#888"/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="rgba(0,0,0,0)" onPress={() => this._initSingleTask(2)} style={styles.moduleContainer}>
            <View style={styles.module}>
              <Image style={styles.moduleImg} source={require('../img/3dna.jpg')}/>
              <Text style={styles.moduleText}>Module 2</Text>
              <Icon style={styles.moduleIcon} name="ios-arrow-dropright" size={18} color="#888"/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="rgba(0,0,0,0)" onPress={() => this._initSingleTask(3)} style={styles.moduleContainer}>
            <View style={styles.module}>
              <Image style={styles.moduleImg} source={require('../img/4dna.jpg')}/>
              <Text style={styles.moduleText}>Module 3</Text>
              <Icon style={styles.moduleIcon} name="ios-arrow-dropright" size={18} color="#888"/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="rgba(0,0,0,0)" onPress={() => this._initSingleTask(4)} style={styles.moduleContainer}>
            <View style={styles.module}>
              <Image style={styles.moduleImg} source={require('../img/5dna.jpg')}/>
              <Text style={styles.moduleText}>Module 4</Text>
              <Icon style={styles.moduleIcon} name="ios-arrow-dropright" size={18} color="#888"/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="rgba(0,0,0,0)" onPress={() => this._initSingleTask(5)} style={styles.moduleContainer}>
            <View style={styles.module}>
              <Image style={styles.moduleImg} source={require('../img/6dna.jpg')}/>
              <Text style={styles.moduleText}>Module 5</Text>
              <Icon style={styles.moduleIcon} name="ios-arrow-dropright" size={18} color="#888"/>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    width: Util.size.width,
    height: Util.size.height - 145,
    backgroundColor:'#f5f5f5',
  },
  content:{
    flexDirection:'row',
    flexWrap:"wrap",
    width: Util.size.width,
    paddingLeft:10,
    paddingTop:10,
    paddingBottom:70,
  },
  tabTitle:{
    marginBottom:10,
    width: Util.size.width,
  },
  moduleContainer:{
    width: 0.5*Util.size.width-10,
    height: 135,
    alignItems:'center',
  },
  module:{
    height: 120,
    width: 0.5*Util.size.width-25,
    marginBottom:15,
    backgroundColor:'#fff',
    shadowColor: "#777",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    },
  },
  moduleImg:{
    width: 0.5*Util.size.width-25,
    height: 95,
  },
  moduleText:{
    height:25,
    fontSize:14,
    fontWeight:'500',
    paddingLeft:5,
    paddingTop:3,
  },
  moduleIcon:{
    position:'absolute',
    right:5,
    bottom:2,
  },
  newContainer:{
    height:25,
    width:0.5*Util.size.width-25,
    flexDirection:'row',
    alignItems:'flex-start',
  },
  new:{    
    backgroundColor:'#8bc34a',
    height: 15,
    paddingBottom:2,
    marginTop:4,
    width: 30,
    marginLeft: 10,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:2,
  },
  newText:{
    color:'#fff',
    fontWeight:'300',
    backgroundColor:'transparent',
  },
})