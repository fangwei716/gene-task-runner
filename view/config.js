'use strict'

import React, { Component } from 'react';
import {
  AlertIOS,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Util from './utils';
import {
  setTheme,
  MKColor,
  MKCheckbox,
} from 'react-native-material-kit';

import { HISAT } from './moduleDetail';

setTheme({checkboxStyle: {
  fillColor: MKColor.LightGreen,
  borderOnColor: MKColor.LightGreen,
  borderOffColor: MKColor.LightGreen,
  rippleColor: 'rgba(139,195,74,.15)',
}});

export class SingleConfig extends Component{
  constructor(props){
    super(props);
  }

  _addSingleTask() {
    // fetch
    // read config
    this.props.hideModal();
  }

  _selectModule() {
    switch(this.props.moduleSelected){
      case 1:
        return <HISAT/>;
        break;
      default:
        return <HISAT/>;
        break;
    }
  }

  render() {
    return(
      <View style={styles.modalContainer}>
        <View style={styles.modalNav}>
          <TouchableHighlight underlayColor={MKColor.LightGreen} onPress={() => this.props.hideModal()}><Text style={[styles.btnText,{width:80,textAlign:"left"}]}>Cancle</Text></TouchableHighlight>
          <Text style={styles.navTitle}>Task Configuration</Text>
          <TouchableHighlight underlayColor={MKColor.LightGreen} onPress={() => this._addSingleTask()}><Text style={[styles.btnText,,{width:80,textAlign:"right"}]}>Add Task</Text></TouchableHighlight>
        </View>
        <ScrollView style={styles.modalContent}>
          {this._selectModule()}
        </ScrollView>
      </View>
    )
  }
}

export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modules: ['HISAT','module 2','module 3','module 4','module 5'],
      moduleChecked: [false,false,false,false,false],
      taskConfiguration: false,
    }
  }

  _closeModal() {
    this.setState({
      modalTitle: '',
      moduleChecked: [false,false,false,false,false],
    });
    this.props.hideModal();
  }

  _continue() {
    const { moduleChecked } = this.state;
    let counter = 0;
    for (let isChecked of moduleChecked) {
      if (isChecked) {
        counter ++;
      }
    }
    if (counter>1) {
      AlertIOS.alert(
       'Add multi-module Task',
       `You choosed ${counter} modules. Please confirm to add a quick multi-module task with default settings.`,
       [{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this._addMultiTask(moduleChecked)}]
      );
    }else if (counter === 1){
      this.setState({
        taskConfiguration: true,
      })
    }else{
      AlertIOS.alert('At least select one module.')
    }
  }

  _addSingleTask() {
    // fetch
    // read config
    this.props.hideModal();
  }

  _addMultiTask(moduleChecked) {
    //fetch add a new multi-task
    //callback, return new task list data and force task list to update
    this._closeModal();
  }

  _back() {
    this.setState({
      taskConfiguration: false,
    });
  }

  _switchCheck(index) {
    const { moduleChecked } = this.state;
    moduleChecked[index] = !moduleChecked[index];
    this.setState({
      moduleChecked
    });
  }

  render() {
    const { modules,moduleChecked,taskConfiguration } = this.state;

    const moduleList = modules.map((elem, index) => {
      return (
        <View key={"checkbox"+index} style={styles.module}>
          <Text style={styles.moduleText}>{elem}</Text>
          <MKCheckbox style={styles.checkBox} checked={false} onCheckedChange={() => this._switchCheck(index)}/>
        </View>
      );
    })

    return(
      <View style={styles.modalContainer}>
        { taskConfiguration?
          <View style={styles.modalNav}>
            <TouchableHighlight underlayColor={MKColor.LightGreen} onPress={() => this._back()}><Text style={[styles.btnText,{width:80,textAlign:"left"}]}>Back</Text></TouchableHighlight>
              <Text style={styles.navTitle}>Task Configuration</Text>
              <TouchableHighlight underlayColor={MKColor.LightGreen} onPress={() => this._addSingleTask()}><Text style={[styles.btnText,,{width:80,textAlign:"right"}]}>Add Task</Text></TouchableHighlight>
          </View>:
          <View style={styles.modalNav}>
            <TouchableHighlight underlayColor={MKColor.LightGreen} onPress={() => this._closeModal()}><Text style={[styles.btnText,{width:80,textAlign:"left"}]}>Cancle</Text></TouchableHighlight>
              <Text style={styles.navTitle}>{this.props.modalTitle}</Text>
              <TouchableHighlight underlayColor={MKColor.LightGreen} onPress={() => this._continue()}><Text style={[styles.btnText,,{width:80,textAlign:"right"}]}>Continue</Text></TouchableHighlight>
          </View>
        }
        <ScrollView style={styles.modalContent}>
          { taskConfiguration?
            <HISAT title={this.props.modalTitle}/>:
            moduleList
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  checkBox:{
    position:'absolute',
    top:0,
    right:0,
  },
  modalContainer:{
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor:"#f5f5f5"
  },
  modalNav:{
    position:"absolute",
    height:60,
    width:Util.size.width,
    backgroundColor:MKColor.LightGreen,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingTop:20,
    paddingLeft:15,
    paddingRight:15
  },
  modalContent:{
    width:Util.size.width,
    height:Util.size.height-60,
    marginTop:60
  },
  btnText:{
    color:"#f5f5f5",
    fontSize:16,
    paddingTop:10,
  },
  navTitle:{
    paddingTop:8,
    fontWeight:"500",
    color:"#fff",
    fontSize:18
  },
  module:{
    padding: 15,
    paddingLeft:25,
    height:50,
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#ddd',
    flexDirection:'row',
  },
  moduleText:{
    color: '#222',
    fontWeight: '500',
    fontSize:16,
    width: Util.size.width - 100,
  },
})