/**
 * log in page
 * the first time: username+password
 * later on choose Touch ID or enter password
 */
'use strict'

import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Util from './utils';
import {
  MKTextField,
  MKColor,
  MKButton,
  mdl,
} from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchID from 'react-native-touch-id';

const FloatInput = mdl.Textfield.textfieldWithFloatingLabel().build();

class LoginForm extends Component{
  static propTypes = {
    enterGene: React.PropTypes.func.isRequired,
  };

	constructor(props) {
		super(props);
		this.state = {
      username: '',
      password: '',
		};
	}

  componentDidMount() {
    AsyncStorage.getItem("username").then((value) =>{
      if (value !== '') {
        this.setState({
          username:value,
        });
      }
    });
  }

  clearText() {
    this._username.setNativeProps({text: ''});
    this._password.setNativeProps({text: ''});
    this.setState({
      username: '',
      password: '',
    });
  }

  _submit() {
    //fetch
    // if success
    const username = this.state.username;
    AsyncStorage.setItem('username',username);
    AsyncStorage.setItem('uid','jdkhfkdshfsbdbwqk');
    AsyncStorage.setItem('idReady','true');
    this.props.enterGene();
  }

	render() {
		return(
      <View style={styles.formContainer}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>
            {this.state.username.charAt(0)?this.state.username.charAt(0).toUpperCase():<Icon name="ios-help" size={60} color="#fff" />}
          </Text>
        </View>
  			<View style={styles.col}>
  				<FloatInput 
            style={styles.textfieldWithFloatingLabel}
            defaultValue={this.state.username}
            ref={component => this._username = component} 
            returnKeyType = {"next"} 
            placeholder="Username"
            highlightColor={MKColor.LightGreen}
            onChangeText={(text) => this.setState({username:text})}
            onSubmitEditing={(event) => {this._password.focus();}} 
          />
        	<FloatInput 
            style={styles.textfieldWithFloatingLabel}
            ref={component => this._password = component} 
            placeholder="Password" 
            password={true}
            highlightColor={MKColor.LightGreen}
            onChangeText={(text) => this.setState({password:text})}
            onSubmitEditing={(event) => this._submit()}       
          />
      	</View>
        <View style={styles.col}>
          <MKButton
            style={styles.loginBtn}
            backgroundColor={MKColor.LightGreen}
            shadowRadius={2}
            shadowOffset={{width:0, height:2}}
            shadowOpacity={.2}
            shadowColor="black"
            onPress={() => this._submit()}
            >
            <Text pointerEvents="none"
                  style={{color: 'white', fontWeight: '700',}}>
              Log in 
            </Text>
          </MKButton>
        </View>
      </View>
		)
	}
}

export default class extends Component{
  static propTypes = {
    enterGene: React.PropTypes.func.isRequired,
  };

	constructor() {
		super();
    this.state = {
      username:'',
    }
	}
  
  componentDidMount() {
    AsyncStorage.getItem("idReady").then((value) =>{
      if (value === 'true') {
        this._touchID();
      }
    });
  }

  _touchID = () => {
    TouchID.authenticate('Unlock GENE')
    .then(success => {
      this.props.enterGene();
    })
    .catch(error => {
      console.log('touch id error');
    });
  };

	render() {
		return(
			<View style={styles.container}>
        <Image style={styles.logo} source={{uri:'gene'}}/>
        <Text style={styles.logoText}>A Sequencing Analysis Task Runner.</Text>
        <Text style={styles.logoText}>Get Started on gene.cityu.edu.hk</Text>
				<LoginForm enterGene={()=>this.props.enterGene()}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: Util.size.width,
    height: Util.size.height,
    paddingBottom:20,
  },
  formContainer:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width:Util.size.width-160,
    height:80,
    marginBottom:10,
  },
  logoText:{
    fontSize:11,
    color:'#555',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 7, marginRight: 7,
  },
  icon:{
    height:80,
    width:80,
    borderRadius:40,
    marginTop: 50,
    marginBottom:10,
    backgroundColor: '#ccc',
    alignItems:'center',
    justifyContent:'center',
  },
  iconText:{
    fontSize:50,
    color:'#fff',
    backgroundColor:'transparent',
  },
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10,
    width: Util.size.width -80,
  },
  loginBtn: {
    marginTop:50,
    height:35,
    width:Util.size.width -80,
    alignItems:'center',
    justifyContent:'center',
  },
});