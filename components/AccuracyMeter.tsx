import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface AccuracyMeterProps {
  score: number;
}

export const AccuracyMeter = ({ score }: AccuracyMeterProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: score,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [score]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981';
    if (score >= 75) return '#f59e0b';
    if (score >= 60) return '#f97316';
    return '#ef4444';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent!';
    if (score >= 75) return 'Great!';
    if (score >= 60) return 'Good!';
    return 'Keep practicing!';
  };

  return (
    <View style={styles.container}>
      <View style={styles.meterContainer}>
        <View style={styles.meterBackground}>
          <Animated.View
            style={[
              styles.meterFill,
              {
                width: animatedValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: getScoreColor(score),
              },
            ]}
          />
        </View>
        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreText, { color: getScoreColor(score) }]}>
            {score}%
          </Text>
          <Text style={styles.scoreLabel}>{getScoreLabel(score)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  meterContainer: {
    width: '100%',
    maxWidth: 300,
  },
  meterBackground: {
    height: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    borderRadius: 6,
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  scoreText: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
  },
  scoreLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 4,
  },
});