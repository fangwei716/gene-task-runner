/**
 * define module detail here
 * hardcode for each module basically
 */
'use strict'

import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import Util from './utils';
import {
  MKColor,
  MKRadioButton,
  setTheme,
} from 'react-native-material-kit';

setTheme({radioStyle: {
  fillColor: 'rgba(139,195,74,.8)',
  borderOnColor: 'rgba(139,195,74,.6)',
  borderOffColor: 'rgba(139,195,74,.3)',
  rippleColor: 'rgba(139,195,74,.15)',
}});

export class HISAT extends Component{
  constructor() {
    super();
    this.state = {
      thread: '',
      entry: '',
      feature: '',
      run:1,
      clip:1,
    };
    this.run = new MKRadioButton.Group();
    this.clip = new MKRadioButton.Group();
  }

  _gatherInfo() {
    return this.state;
  }

  _changeRadio(state, group, index) {
    this.setState({
      [group]:index,
    });
  }

  render() {
    return(
      <View style={styles.configContainer}>
        <Text style={styles.configTitle}>HISAT <Text style={styles.configTitleSmall}>Hierarchical Indexing for Spliced Alignment of Transcripts</Text></Text>
        <Text>Configurations:</Text>
        <View style={styles.textfield}>
          <TextInput
            placeholder="number of thread"
            keyboardType = "number-pad"
            defaultValue = "4"
            style = {styles.input}
            onSubmitEditing={(event) => {this._entry.focus();}} 
          />
        </View>
        <Text style={styles.textfieldText}>number of thread</Text>
        <View style={styles.textfield}>
          <TextInput
            placeholder="maximum queue entry"
            defaultValue = "2000000"
            keyboardType = "number-pad"
            style={styles.input}
            onSubmitEditing={(event) => {this._feature.focus();}} 
          />
        </View>
        <Text style={styles.textfieldText}>maximum queue entry</Text>
        <View style={styles.textfield}>
          <TextInput
            placeholder="feature type"
            defaultValue = "exon"
            style={styles.input}
            onChangeText={(text) => this.setState({feature:text})}
          />
        </View>
        <Text style={styles.textfieldText}>feature type</Text>
        <View style={styles.textfield}>
          <View style={styles.radioContainer}>
            <MKRadioButton
              checked={true}
              group={this.run}
              onCheckedChange={(state) => this._changeRadio(state,'run',1)}
            />
            <Text>alignReads</Text>
          </View>
          <View style={styles.radioContainer}>
            <MKRadioButton
              checked={false}
              group={this.run}
              onCheckedChange={(state) => this._changeRadio(state,'run',2)}
            />
            <Text>genomeGenerate</Text>
          </View>
          <View style={[styles.radioContainer,{marginBottom:10}]}>
            <MKRadioButton
              checked={false}
              group={this.run}
              onCheckedChange={(state) => this._changeRadio(state,'run',3)}
            />
            <Text>inputAlignmentsFromBAM</Text>
          </View>
        </View>
        <Text style={styles.textfieldText}>run mode</Text>
        <View style={styles.textfield}>
          <View style={styles.radioContainer}>
            <MKRadioButton
              checked={true}
              group={this.clip}
              onCheckedChange={(state) => this._changeRadio(state,'clip',1)}
            />
            <Text>true</Text>
          </View>
          <View style={[styles.radioContainer,{marginBottom:10}]}>
            <MKRadioButton
              checked={false}
              group={this.clip}
              onCheckedChange={(state) => this._changeRadio(state,'clip',2)}
            />
            <Text>false</Text>
          </View>
        </View>
        <Text style={styles.textfieldText}>align soft clip</Text>
        <Text style={styles.configDes}>HISAT is a fast and sensitive spliced alignment program for mapping RNA-seq reads. In addition to one global FM index that represents a whole genome, HISAT uses a large set of small FM indexes that collectively cover the whole genome (each index represents a genomic region of ~64,000 bp and ~48,000 indexes are needed to cover the human genome). These small indexes (called local indexes) combined with several alignment strategies enable effective alignment of RNA-seq reads, in particular, reads spanning multiple exons. The memory footprint of HISAT is relatively low (~4.3GB for the human genome). We have developed HISAT based on the Bowtie2 implementation to handle most of the operations on the FM index. </Text>
        <Text style={styles.configInfo}>Version: <Text style={styles.configInfoSmall}>1.0</Text></Text>
        <Text style={styles.configInfo}>Author：<Text style={styles.configInfoSmall}>The Center for Computational Biology</Text></Text>
        <Text style={styles.configInfo}>Publish-date: <Text style={styles.configInfoSmall}>2016-05-09</Text></Text>
        <Text style={styles.configInfo}>Source-Language: <Text style={styles.configInfoSmall}>Python</Text></Text>
        <Text style={styles.configInfo}>Category: <Text style={styles.configInfoSmall}>Alignment</Text></Text>
        <Text style={styles.configInfo}>Tags: <Text style={styles.configInfoSmall}>Alignment, HISAT, FASTQ, SAM, BAM</Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  configContainer:{
    padding: 15,
  },
  configTitle:{
    fontSize:18,
    fontWeight:'500',
    paddingBottom:15,
  },
  configTitleSmall:{
    fontSize:14,
    fontWeight:'300',
  },
  configDes:{
    fontSize: 14,
    fontWeight:'300',
    paddingBottom: 15,
    marginTop: 20,
  },
  configInfo:{
    fontSize:14,
    fontWeight:'500',
    paddingBottom:5,
  },
  configInfoSmall:{
    fontSize:14,
    fontWeight:'300',
  },
  textfield:{
    marginTop:5,
    width:Util.size.width - 30,
    borderBottomWidth:2,
    borderBottomColor: MKColor.LightGreen,
  },
  radioContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  input:{
    width: Util.size.width - 30,
    fontSize: 16,
    height: 30,
    paddingLeft:10,
  },
  textfieldText:{
    color:'#555',
    fontSize:12,
  }
})