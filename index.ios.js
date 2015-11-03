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
      timeElapsed: null,
      running: null,
      startTime: null,
      lapNumber: 1,
      laps: []
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
              {this.laps()}
            </View>
        </View>
    )
  },
  startStopButton: function(){
    var style = this.state.running ? styles.stopButton : styles.startButton;

    return(
      <TouchableHighlight 
        underlayColor="gray" 
        onPress={this.handleStartPress}
        style={ [styles.button, style] }
        >
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
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
          Lap {this.state.lapNumber ? this.state.lapNumber : ''}
        </Text>
      </TouchableHighlight>
    )
  },
  border: function(color){
    // return{
    //   borderColor: color,
    //   borderWidth: 4
    // }
  },
  handleStartPress: function(){
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({
        running: false,
      });
      return; 
    }

    this.setState({
      startTime: new Date(),
      laps: [],
      lapNumber: 1
    });
    
    this.interval = setInterval( () => {
      // only set values in state with setState
      // never declare as 'this.state.variable = new value' <= antipattern!
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true,
      });
    }, 30);
  },
  handleLapPress: function(){
    var lap = this.state.timeElapsed;
    this.state.lapNumber++;
    this.setState({
      lapNumber: this.state.lapNumber,
      laps: this.state.laps.concat([lap])
    })

    // //resets counter to 00:00 
    // this.setState({
    //   startTime: new Date();
    // });
  },
  laps: function(){
    return(
      this.state.laps.map(function(time, index){
        return (
          <View style={styles.lap}>
            <Text style={styles.lapText}>
              Lap #{index + 1}
            </Text>
            <Text style={styles.lapText}>
              {formatTime(time)}
            </Text>
          </View>
        )
      })
    )
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
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: 'green'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  }, 
  lapText: {
    fontSize: 30
  }

});



// AppRegistry.registerComponent('stopwatch', function(){ return StopWatch });
AppRegistry.registerComponent('stopwatch', () => StopWatch);
