'use strict';

var React = require('react-native');
var formatTime = require('minutes-seconds-milliseconds');
var Button = require('react-native-button');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;



var StopWatch = React.createClass({ 
  getInitialState: function(){
    return {
      timeElapsed: null
    }
  },
  render: function(){
    return (
        <View style={styles.container}>
          <View style={ [styles.header, this.border('yellow')] }> 
            <View style={ [styles.timerWrapper, this.border('red')] }> 
              <Text style={styles.timer}>
                { formatTime(this.state.timeElapsed) }
              </Text>
            </View>
            <View style={ [styles.buttonWrapper, this.border('green')] }> 
              {this.startStopButton()}
              {this.lapButton()}
            </View>
          </View>
          <View style={ [styles.footer, this.border('blue')] }> 
            <Text>
              list of Laps
            </Text>
            </View>
        </View>
    )
  },
  startStopButton: function(){
    return(
      <TouchableHighlight 
        underlayColor="gray" 
        onPress={this.handleStartPress}
        style={styles.button}
        >
        <Text>
          Start button
        </Text>
      </TouchableHighlight>
    )
  },
  lapButton: function(){
    return(
      <TouchableHighlight 
        underlayColor="gray" 
        onPress={this.handleLapPress}
        style={styles.button}
        >
        <Text>
          Lap button
        </Text>
      </TouchableHighlight>
    )
  },
  border: function(color){
    return{
      borderColor: color,
      borderWidth: 4
    }
  },
  handleStartPress: function(){
    var startTime = new Date();
    
    setInterval( () => {
      // only set values in state with setState
      // never declare as 'this.state.variable = new value' <= antipattern!
      this.setState({
        timeElapsed: new Date() - startTime
      });
    }, 30);
  },
  handleLapPress: function(){

  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1, // fill entire screen
    alignItems: 'stretch', // every child runs horizontal to edges
  },
  header: {
    // yellow
    flex: 1
  },
  footer: {
    // blue
    flex: 1
  },
  button: {
    borderColor: 'orange'
  },
  timerWrapper: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  timer: {
    fontSize: 60
  }

});



// AppRegistry.registerComponent('stopwatch', function(){ return StopWatch });
AppRegistry.registerComponent('stopwatch', () => StopWatch);
