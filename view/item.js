'use strict'

import React, { Component } from 'react';
import {
  ActionSheetIOS,
  AlertIOS,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  TouchableHighlight,
  View,
  WebView
} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';

class Report extends Component{
	render() {
		return(
			<WebView
        automaticallyAdjustContentInsets={false}
        source={{uri:this.props.link}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
      />
		)
	}
}

export default class extends Component{
	constructor(props) {
		super(props);
	}

	_showShareActionSheet(link,title) {
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: link,
      message: title,
    },
    (error) => console.log(error),
    (success, method) => {
    });
  }

  _showReport(link, title) {
  	this.props.navigator.push({
      title,
      tintColor:'#f5f5f5',
      barTintColor:'#8bc34a',
      titleTextColor:'#fff',
      component: Report,
      passProps:{link},
    })
  }

  _showAlert(index) {
  	AlertIOS.alert(
		 'Delete Task',
		 'Are you sure you want to delete this task? This action can not be undo.',
		 [{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    	{text: 'OK', onPress: () => this.props.deleteTask(index)}]
		);
  }

	render() {
		const { index,title,created,completed,component,link } = this.props.data;
		return(
			<View style={styles.container}>
				<TouchableHighlight underlayColor="#f5f5f5" onPress={()=>this._showReport(link,title)}>
					<View style={styles.textContainer}>
						<Text style={styles.tiny}>{created}</Text>
						<Text style={styles.title}>{title}</Text>
						<Text style={styles.tiny}>{component}</Text>
					</View>
				</TouchableHighlight>
				<View style={styles.actionContainer}>
					<View style={styles.progress}>
						<View style={{height:40, width: (Util.size.width-100)*completed/100, backgroundColor: '#dbe675',}}></View>
						<Text style={styles.completed}>Completed: {completed}%</Text>
					</View>
					<TouchableHighlight underlayColor="#f5f5f5" style={styles.icon} onPress={()=>this._showShareActionSheet(link,title)}>
						<Icon name="ios-share-outline" size={25} color="#888"/>
					</TouchableHighlight>
					<TouchableHighlight underlayColor="#f5f5f5" style={styles.icon} onPress={()=>this._showAlert(index)}>
						<Icon name="ios-trash-outline" size={25} color="#888"/>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		width:Util.size.width-20,
		height: 120,
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
	textContainer:{
		paddingTop: 10,
		paddingBottom:10,
		paddingLeft:15,
		paddingRight:15,
		height:80,
	},
	tiny:{
		fontSize:12,
		color:'#333',
	},
	title:{
		fontSize:15,
		fontWeight:'700',
		color:'#111',
		paddingTop:5,
		paddingBottom:5,
	},
	completed:{
		width: Util.size.width - 100,
		height: 40,
		position: 'absolute',
		left: 0,
		top: 0,
		backgroundColor: 'transparent',
		paddingLeft:15,
		paddingTop: 13,
		fontSize:12,
	},
	actionContainer:{
		height:40,
		borderTopWidth: Util.pixel,
		borderTopColor: '#ddd',
		flexDirection: 'row',
	},
	progress:{
		width: Util.size.width - 100,
	},
	icon:{
		width:40,
		borderLeftWidth: Util.pixel,
		borderLeftColor: '#ddd',
		alignItems:'center',
    	justifyContent:'center',
	},
})