import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const WAVE_BARS = 8;

export const WaveForm = () => {
  const animatedValues = useRef(
    Array.from({ length: WAVE_BARS }, () => new Animated.Value(0.2))
  ).current;

  useEffect(() => {
    const animations = animatedValues.map((animatedValue, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 400 + index * 100,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0.2,
            duration: 400 + index * 100,
            useNativeDriver: false,
          }),
        ])
      );
    });

    animations.forEach((animation, index) => {
      setTimeout(() => animation.start(), index * 100);
    });

    return () => {
      animations.forEach(animation => animation.stop());
    };
  }, []);

  return (
    <View style={styles.container}>
      {animatedValues.map((animatedValue, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              height: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [8, 40],
              }),
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    gap: 4,
  },
  bar: {
    width: 4,
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
});