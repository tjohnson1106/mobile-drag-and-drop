import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  PanResponder,
  PanResponderInstance,
  Animated
} from "react-native";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const colorMap = {};

class Drag extends Component {
  state = {
    dragging: false,
    data: Array.from(Array(200), (_, i) => {
      colorMap[i] = getRandomColor();
      return i;
    })
  };

  _panResponder: PanResponderInstance;
  // current position
  point = new Animated.ValueXY();

  constructor(props) {
    super(props);

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        console.log(gestureState.y0);
        this.setState({
          dragging: true
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        Animated.event([{ y: this.point.y }])({ y: gestureState.moveY });
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });
  }

  render() {
    const { data, dragging } = this.state;

    const renderItem = ({ item }) => (
      <View
        style={{
          padding: 16,
          backgroundColor: colorMap[item],
          flexDirection: "row"
        }}
      >
        <View {...this._panResponder.panHandlers}>
          <Text
            style={{
              fontSize: 28
            }}
          >
            @
          </Text>
        </View>
        <Text
          style={{
            fontSize: 22,
            textAlign: "center",
            flex: 1
          }}
        >
          {item}
        </Text>
      </View>
    );

    return (
      <View style={styles.root}>
        <Animated.View
          style={{
            backgroundColor: "black",
            zIndex: 2,
            height: 20,
            width: "100%",
            top: this.point.getLayout().top
          }}
        >
          {renderItem({ item: 3 })}
        </Animated.View>
        <FlatList
          scrollEnabled={!dragging}
          style={{ width: "100%" }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => " " + item}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Drag;
