/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(){
    super();
     this.state = {
      operationSummary: '',
      textNum: ''
    };
    this.buttonPressed = this.buttonPressed.bind(this);
    this.handleChangeTextNum = this.handleChangeTextNum.bind(this);
  }
  handleChangeTextNum = (num) => { 
    num = num.toString();
    this.setState({
      operationSummary: this.state.operationSummary + num[num.length-1],
      textNum: num
    });
  } 
  operand1 = "";
  operand2 = "";
  operator = "";

  clearEntry(){
    this.setState({
      operationSummary: '',
      textNum: ''
    });
    this.operand1 = "";
    this.operand2 = "";
    this.operator = "";
  }
  buttonPressed(c) {

     if(c === 'CE'){
      this.clearEntry();
     }
     else{
      if(this.isOperand(c)){
        if(this.operator.length < 1){
          this.operand1 += c;
        }
        else{
          this.operand2 += c;
        }
      }
     else if(this.isOperator(c)){
       if(this.operator != '' && this.operand2 != ''){
        this.setTotalText();
        this.operator = c;
       }
       else if(this.operator == ''){
        this.operator = c;
       }
       else if(this.operator != '' && this.operand2 == ''){
         c = '';
       }
     }
     else if(c === '='){
      this.setTotalText();
     }

     this.setState({
      operationSummary: this.state.operationSummary + c + ((c !== '=')?'':this.operand1)
      });   

     }

  }

  setTotalText(){
    if(this.operand1 !== '' && this.operand2 !== '' && this.operator !== ''){
      this.operand1 = this.operate(this.operand1,this.operand2,this.operator);
      this.operand2 = "";
      this.operator = "";    
      this.setState({
        textNum: this.operand1.toString()
      });      
    }

  }

  operate(c1,c2,o){
    result = 0;
    c1 = parseFloat(c1);
    c2 = parseFloat(c2);
    switch(o){
      case '*':{
        result = c1 * c2;
      }break;
      case '/':{
        result = c1 / c2;
      }break;
      case '+':{
        result = c1 + c2;
      }break;
      case '-':{
        result = c1 - c2;
      }
    }

    return result;
  }
  isOperator(c){
    var rgx = /[/*+-]/g;
    return rgx.test(c);
  }
  isOperand(c){
    var rgx = /^[0-9]+.*$/;
    return rgx.test(c);
  }
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.operationContainer}>
          <View style={styles.operation}>
            <Text style={styles.operationSummary}>
            {this.state.operationSummary}
            </Text>
          </View>
          <View style={styles.result}>
            <TextInput
              value={this.state.textNum}
              style={styles.operationText}
              underlineColorAndroid='transparent'
              onChangeText={this.handleChangeTextNum} 
            />
          </View>         
        </View>
        <View style={styles.operatorContainer}>
          <View style={styles.numberButtonContainer}>
            <Grid>
              <Row>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('7')}>
                      <Text style={styles.textButton}>7</Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('8')}>
                    <Text style={styles.textButton}>8</Text>
                </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('9')}>
                      <Text style={styles.textButton}>9</Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('*')}>
                      <Text style={styles.textButton}>*</Text>
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('4')}>
                      <Text style={styles.textButton}>4</Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('5')}>
                    <Text style={styles.textButton}>5</Text>
                </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('6')}>
                      <Text style={styles.textButton}>6</Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('/')}>
                      <Text style={styles.textButton}>/</Text>
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('1')}>
                      <Text style={styles.textButton}>1</Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('2')}>
                    <Text style={styles.textButton}>2</Text>
                </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('3')}>
                      <Text style={styles.textButton}>3</Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('-')}>
                      <Text style={styles.textButton}>-</Text>
                  </TouchableOpacity>
                </Col>
              </Row>  
              <Row>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('CE')}>
                      <Text style={styles.textButton}>CE</Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('0')}>
                    <Text style={styles.textButton}>0</Text>
                </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('=')}>
                      <Text style={styles.textButton}>=</Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity style={styles.textButtonContainer}
                  onPress={() => this.buttonPressed('+')}>
                      <Text style={styles.textButton}>+</Text>
                  </TouchableOpacity>
                </Col>
              </Row>             
            </Grid>         
          </View>
         </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
/**calculator */
container: {
  flex: 1,
  flexDirection: 'column',
},
operationSummary: {
  textAlign:'right',
  fontSize: 20,
  color: '#888'
},
operationText: {
  textAlign:'right',
  fontSize: 30
},
operationContainer: {
  padding:10,
  borderBottomWidth: 1,
  borderBottomColor: '#aaa'
},
operatorContainer:{
  flex: 1,
  flexDirection: 'row'
},
numberButtonContainer:{
  flexDirection: 'row',
  flex: 3
},
numberButtonContainerChild:{
  flex: 1,
  flexDirection: 'column'
},
operatorButtonContainer:{
  flex: 1
},
textButtonContainer: {
  backgroundColor: '#ddd',
  height: 100
},
textButton:{
  textAlignVertical:'center', 
  width: '100%', 
  textAlign: 'center', 
  height:'100%',
  color: '#444',
  fontSize: 18
}
});
