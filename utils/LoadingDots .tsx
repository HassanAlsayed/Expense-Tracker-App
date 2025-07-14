import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const LoadingDots = ({ 
  size = 8, 
  color = '#007bff', 
  animationDuration = 600,
  style 
}) => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      const animateDot = (dot, delay) => {
        return Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: animationDuration / 2,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: animationDuration / 2,
            useNativeDriver: true,
          }),
        ]);
      };

      Animated.loop(
        Animated.parallel([
          animateDot(dot1, 0),
          animateDot(dot2, animationDuration / 3),
          animateDot(dot3, (animationDuration / 3) * 2),
        ])
      ).start();
    };

    animate();
  }, [dot1, dot2, dot3, animationDuration]);

  const dotStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    marginHorizontal: size / 4,
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          dotStyle,
          {
            opacity: dot1,
            transform: [
              {
                scale: dot1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1.2],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          dotStyle,
          {
            opacity: dot2,
            transform: [
              {
                scale: dot2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1.2],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          dotStyle,
          {
            opacity: dot3,
            transform: [
              {
                scale: dot3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1.2],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingDots;