'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var StopWatch = React.createClass({ 
  render: function(){

  }
});

// AppRegistry.registerComponent('stopwatch', function(){ return StopWatch });
AppRegistry.registerComponent('stopwatch', () => StopWatch);
