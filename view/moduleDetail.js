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
  View
} from 'react-native';
import Util from './utils';

export class HISAT extends Component{
  render() {
    return(
      <View style={styles.configContainer}>
        <Text style={styles.configTitle}>HISAT <Text style={styles.configTitleSmall}>Hierarchical Indexing for Spliced Alignment of Transcripts</Text></Text>
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
})