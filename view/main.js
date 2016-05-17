/**
 * main of GENE
 */
'use strict'

import React, { Component } from 'react';
import {
  AlertIOS,
  Animated,
  Image,
  Modal,
  NavigatorIOS,
  RefreshControl,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  WebView
} from 'react-native';
import Util from './utils';
import {
  getTheme,
  setTheme,
  MKColor,
  MKCheckbox,
  MKButton,
  MKTextField,
  mdl,
} from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Task from './task';
import Config from './config';
import Report from './report';
import Setting from './setting';
import Network from './network';
import Module from './module';

const theme = getTheme();

const FloatInput = mdl.Textfield.textfieldWithFloatingLabel().build();

class UserInfo extends Component{
	constructor(props){
		super(props);
		this.state = {
			username: this.props.username,
		};
	}

	render() {
		return(
			<View style={styles.card}>
				<View style={theme.cardStyle}>
				  <Image source={{uri:'card'}} style={theme.cardImageStyle}/>
				  <View style={styles.iconLetter}>
         		<Text style={styles.iconText}>{this.state.username.charAt(0).toUpperCase()}</Text>
        	</View>
        	<View style={styles.usernameContainer}>
        		<Text style={styles.username}>{this.state.username}</Text>
        		<Text style={styles.email}>fangwei716@gmail.com</Text>
        	</View>
				</View>
			</View>
		)
	}
}

const TabBar = React.createClass({
  selectedTabIcons: [],
  unselectedTabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;

    return (
      <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)} style={styles.tab}>
        <Icon name={name} size={27} color="#8bc34a" style={styles.icon}
              ref={(icon) => { this.selectedTabIcons[page] = icon }}/>
        <Icon name={name} size={27} color='#888' style={styles.icon}
              ref={(icon) => { this.unselectedTabIcons[page] = icon }}/>
      </TouchableOpacity>
    );
  },

  componentDidMount() {
    this.setAnimationValue({value: this.props.activeTab});
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({value}) {
    var currentPage = this.props.activeTab;

    this.unselectedTabIcons.forEach((icon, i) => {
      var iconRef = icon;

      if (!icon.setNativeProps && icon !== null) {
        iconRef = icon.refs.icon_image
      }

      if (value - i >= 0 && value - i <= 1) {
        iconRef.setNativeProps({ style: {opacity: value - i} });
      }
      if (i - value >= 0 &&  i - value <= 1) {
        iconRef.setNativeProps({ style: {opacity: i - value} });
      }
    });
  },

  render() {
    var containerWidth = this.props.containerWidth;
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 2,
      backgroundColor: '#8bc34a',
      bottom: 0,
    };

    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs]
    });

    return (
      <View>
        <View style={[styles.tabs, this.props.style, ]}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
        <Animated.View style={[tabUnderlineStyle, {left}]} />
      </View>
    );
  },
});

class TabView extends Component{
  render() {
    return(
      <View>
        <ScrollableTabView 
          renderTabBar={() => <TabBar />}>
          <Module tabLabel="ios-albums-outline" />
          <Task navigator={this.props.navigator} tabLabel="ios-list-box-outline" />
          <Report tabLabel="ios-contact-outline" />
          <Network tabLabel="ios-people-outline" />
          <Setting exitGene={this.props.exitGene} navigator={this.props.navigator} tabLabel="ios-settings-outline" />
        </ScrollableTabView>
      </View>
    )
  }
}

class MainView extends Component{
	constructor(props) {
		super(props);
    this.state = {
      showModal: false,
      modalTitle: '',
    }
	}

	componentDidMount() {
		StatusBar.setBarStyle(1);
	}

  _hideModal() {
    this.setState({
      showModal: false,
    });
  }

	render() {
    const { modules,moduleChecked,taskConfiguration } = this.state;

		return(
			<View style={styles.container}>
				<UserInfo username="Wei" uid={this.props.uid}/>
        <TabView exitGene={this.props.exitGene} navigator={this.props.navigator}/>
        <Modal
          animated={true}
          transparent={false}
          visible={this.state.showModal}>
          <Config 
            modalTitle={this.state.modalTitle}
            hideModal={() => this._hideModal()}
          />
        </Modal>
				<View style={styles.col,styles.addBtn}>
					<MKButton
					  backgroundColor={MKColor.LightGreen}
					  shadowRadius={2}
					  shadowOffset={{width:0, height:2}}
					  shadowOpacity={.7}
					  shadowColor="black"
					  style={styles.action}
					  onPress={() => {
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
					  }}
					  >
					  <Icon style={styles.actionIcon} name="ios-add" size={35} color="#fff"/>
					</MKButton>
				</View>
			</View>
		)
	}
}

export default class extends Component{
  render() {
    return(
      <NavigatorIOS
        ref='nav'
        style={styles.container}
        initialRoute={{
          title:'main',
          component: MainView,
          navigationBarHidden: true,
          backButtonTitle: 'back',
          shadowHidden: true,
          passProps:{exitGene: this.props.exitGene},
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: Util.size.width,
    height: Util.size.height,
  },
  card:{
  	width:Util.size.width,
  	alignItems: 'stretch',
  	height:100,
    padding:0,
  },
  iconLetter:{
    height:50,
    width:50,
    borderRadius:25,
    marginTop: 20,
    marginBottom:10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    position:'absolute',
    left:15,
    top:15,
  },
  iconText:{
    fontSize:30,
    color:'#fff',
    backgroundColor:'transparent',
  },
  usernameContainer:{
  	position:'absolute',
    left:80,
    top:60,
    backgroundColor:'transparent',
    flexDirection:'row',
  },
  username:{
    fontSize:16,
    fontWeight:'500',
  },
  email:{
  	fontSize:12,
  	fontWeight:'400',
  	paddingLeft:10,
  	paddingTop:4,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 7, marginRight: 7,
  },
  addBtn:{
  	position:'absolute',
  	right:25,
  	bottom:25,
  },
  action:{
  	width:50,
  	height:50,
  	borderRadius:25,
  	alignItems:'center',
    justifyContent:'center',
  },
  actionIcon:{
  	backgroundColor:'transparent',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 7,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor:"#fff",
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 27,
  },
  iconContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:60,
  },
})