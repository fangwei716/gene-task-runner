/**
 * settings
 */
'use strict'

import React, { Component } from 'react';
import {
  ActionSheetIOS,
  NavigatorIOS,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  WebView,
} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  MKTextField,
  MKColor,
  MKButton,
  mdl,
} from 'react-native-material-kit';

class Help extends Component{
  render() {
    return(
      <WebView
        automaticallyAdjustContentInsets={false}
        source={{uri:"http://www.google.com"}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
      />
    )
  }
}

class About extends Component{
  render() {
    return(
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutText}>Gene is ...</Text>
      </View>
    )
  }
}

class Reset extends Component{
  constructor() {
    super();
    this.state = {
      current:"",
      new:"",
    };
  }

  _updatePassword() {
    // fetch
    // update password
  }

  render() {
    return(
      <View style={styles.resetContainer}>
        <MKTextField
          tintColor="#ddd"
          highlightColor={MKColor.LightGreen}
          placeholder="current password"
          returnKeyType = {"next"} 
          style={styles.textfield}
          onChangeText={(text) => this.setState({current:text})}
          onSubmitEditing={(event) => {this._new.focus();}} 
        />
        <MKTextField
          tintColor="#ddd"
          highlightColor={MKColor.LightGreen}
          ref={component => this._new = component} 
          placeholder="new password"
          style={styles.textfield}
          onChangeText={(text) => this.setState({new:text})}
          onSubmitEditing={(event) => {this._updatePassword();}} 
        />
        <MKButton
          style={styles.resetBtn}
          backgroundColor={MKColor.LightGreen}
          shadowRadius={2}
          shadowOffset={{width:0, height:2}}
          shadowOpacity={.2}
          shadowColor="black"
          onPress={() => this._updatePassword()}
        >
          <Text 
            pointerEvents="none"
            style={{color: 'white', fontWeight: '700',}}
          >
            Change password
          </Text>
        </MKButton>
      </View>
    )
  }
}

export default class extends Component{
  _onResetPress() {
    this.props.navigator.push({
      title:"Change Password",
      tintColor:'#f5f5f5',
      barTintColor:'#8bc34a',
      titleTextColor:'#fff',
      component: Reset,
    });
  }

  _onHelpPress() {
    this.props.navigator.push({
      title:"Help Center",
      tintColor:'#f5f5f5',
      barTintColor:'#8bc34a',
      titleTextColor:'#fff',
      component: Help,
    });
  }

  _onSharePress() {
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: "http://gene.city.edu.hk",
      message: "Gene Sequencing Analysis",
    },
    (error) => console.log(error),
    (success, method) => {
    });
  }

  _onAboutPress() {
    this.props.navigator.push({
      title:"About Gene",
      tintColor:'#f5f5f5',
      barTintColor:'#8bc34a',
      titleTextColor:'#fff',
      component: About,
    });
  }

  render() {
    return(
      <ScrollView style={styles.settingContainer}>
        <View style={styles.setting}>
          <Text style={styles.tabTitle}>Settings</Text>
          <TouchableHighlight  underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={() => this._onResetPress()}>
            <View style={styles.userMenu}>
              <Icon style={styles.itemNavIcon} name="ios-lock-outline" size={20}></Icon>
              <Text>Change password</Text>
              <Icon style={styles.itemNavMenu} name="ios-arrow-forward" size={20}></Icon>
            </View>
          </TouchableHighlight>
          <TouchableHighlight  underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={() => this._onHelpPress()}>
            <View style={styles.userMenu}>
              <Icon style={styles.itemNavIcon} name="ios-help-circle-outline" size={20}></Icon>
              <Text>Help center</Text>
              <Icon style={styles.itemNavMenu} name="ios-arrow-forward" size={20}></Icon>
            </View>
          </TouchableHighlight>
          <TouchableHighlight  underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={() => this._onSharePress()}>
            <View style={styles.userMenu}>
              <Icon style={styles.itemNavIcon} name="ios-share-outline" size={20}></Icon>
              <Text>Share this app</Text>
              <Icon style={styles.itemNavMenu} name="ios-arrow-forward" size={20}></Icon>
            </View>
          </TouchableHighlight>
          <TouchableHighlight  underlayColor="#f1f1f1" style={styles.userMenuContainer} onPress={() => this._onAboutPress()}>
            <View style={styles.userMenu}>
              <Icon style={styles.itemNavIcon} name="ios-information-circle-outline" size={20}></Icon>
              <Text>About Gene</Text>
              <Icon style={styles.itemNavMenu} name="ios-arrow-forward" size={20}></Icon>
            </View>
          </TouchableHighlight>
          <MKButton
            style={styles.logoutBtn}
            backgroundColor={MKColor.DeepOrange}
            shadowRadius={2}
            shadowOffset={{width:0, height:2}}
            shadowOpacity={.2}
            shadowColor="black"
            onPress={() => this.props.exitGene()}
          >
            <Text 
              pointerEvents="none"
              style={{color: 'white', fontWeight: '700',}}
            >
              Log out
            </Text>
          </MKButton>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  settingContainer:{
    width: Util.size.width,
    height: Util.size.height - 145,
    backgroundColor:'#f5f5f5',
  },
  setting:{
    paddingTop:10,
    paddingBottom:70,
  },
  tabTitle:{
    paddingLeft:10,
    marginBottom:10,
  },
  itemNavMenu:{
    position:"absolute",
    top:12,
    right:20,
    color: "#bbb",
    backgroundColor:"transparent"
  },
  itemNavText:{
    position:"absolute",
    top:13,
    right:30,
    color: "#777",
    backgroundColor:"transparent"
  },
  userMenuContainer:{
    height:45,
    borderTopWidth: Util.pixel,
    borderTopColor:"#bbb",
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#bbb",
    backgroundColor:"#fff",
    flex:1,
    marginBottom:20,
  },
  userMenu:{
    paddingLeft:50,
    height:45,
    justifyContent:'center',
  },
  itemNavIcon:{
    position:"absolute",
    top:12,
    left:20,
    color: "#454545",
    backgroundColor:"transparent"
  },
  aboutText:{
    marginTop:80,
    paddingLeft: 15,
    paddingRight: 15,
  },
  aboutContainer:{
    width: Util.size.width,
    height: Util.size.height,
    backgroundColor:'#f5f5f5',
  },
  resetContainer:{
    width: Util.size.width,
    height: Util.size.height,
    paddingTop: 80,
    backgroundColor:'#f5f5f5',
    alignItems:'center',
  },
  logoutBtn: {
    marginTop:20,
    height:35,
    width:Util.size.width -80,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:40,
  },
  resetBtn: {
    marginTop:35,
    height:35,
    width:Util.size.width -80,
    alignItems:'center',
    justifyContent:'center',
  },
  textfield:{
    marginTop:20,
    height:35,
    width:Util.size.width -80,
  },
})