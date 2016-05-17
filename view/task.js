/**
 * main of GENE
 */
'use strict'

import React, { Component } from 'react';
import {
  NavigatorIOS,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import {
  MKColor,
} from 'react-native-material-kit';
import Util from './utils';
import Item from './item';

export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        index:0,
        title:'Some name for the task',
        created: '2016.05.12 16:18',
        completed: 10,
        link: 'http://www.google.com',
        component:'module3',
      },{
        index:1,
        title:'My fifth task',
        created: '2016.05.12 14:28',
        completed: 30,
        link: 'http://www.google.com',
        component:'module4',
      },{
        index:2,
        title:'A task for analyzing something',
        created: '2016.05.12 11:56',
        completed: 60,
        link: 'http://www.google.com',
        component:'module2',
      },{
        index:3,
        title:'My third task',
        created: '2016.05.12 08:52',
        completed: 80,
        link: 'http://www.google.com',
        component:'module1, module2',
      },{
        index:4,
        title:'Another task of mine',
        created: '2016.05.02 16:39',
        completed: 100,
        link: 'http://www.google.com',
        component:'module4',
      },{
        index:5,
        title:'My first task',
        created: '2016.04.18 17:39',
        completed: 100,
        link: 'http://www.google.com',
        component:'module3',
      }],
      isRefreshing: false,
      refreshTitle: "pull down to update"
    }
  }

  componentWillMount() {
    // fetch
    // Util.post("http://dnafw.com:8100/iosapp/all_orders/",{uid:this.props.uid},(resData) => {
    //     if (resData.error!=="true") {
    //       console.log(resData);
    //       this.setState({
    //         rowData: resData,
    //       });
    //     }
    // });
  }

  _deleteTask(index) {
    const {data} = this.state;
    for (var i = 0; i < data.length; i++) {
      if(data[i].index === index){
        data.splice(i,1)
      }
    }
    this.setState({
      data
    })
    //fetch 
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
      refreshTitle: "updating"
    });

    // fetch
    // Util.post("http://dnafw.com:8100/iosapp/all_orders/",{uid:this.props.uid},(resData) => {
    //     if (resData.error!=="true") {
    //       this.setState({
    //         isRefreshing: false,
    //         data: resData,
    //         refreshTitle: "更新完毕",
    //       });
    //     }else{
    //       this.setState({
    //         isRefreshing: false,
    //         refreshTitle: "更新失败",
    //       });
    //     }
    //     setTimeout(() => {
    //       this.setState({
    //         refreshTitle: "下拉更新"
    //       });
    //     }, 1000);
    // });
  }

  render() {
    const items = this.state.data.map((elem, index) => {
      return (
        <Item deleteTask={(i) => this._deleteTask(i)}key={'item'+index} data={elem} navigator={this.props.navigator}/>
      );
    })

    return(
      <ScrollView 
        style={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            title={this.state.refreshTitle}
            onRefresh={() => this._onRefresh()}
            tintColor="#ddd"
          />
        }
      >
        <View style={styles.list}>
          <Text style={styles.tabTitle}>My Tasks (6)</Text>
          {items}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  listContainer:{
    width: Util.size.width,
    height: Util.size.height - 145,
    backgroundColor:'#f5f5f5',
  },
  list:{
    paddingLeft:10,
    paddingTop:10,
    paddingBottom:70,
  },
  tabTitle:{
    marginBottom:10,
  },
})
