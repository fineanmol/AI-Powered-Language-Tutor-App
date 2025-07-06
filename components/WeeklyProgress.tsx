import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';

interface WeeklyProgressProps {
  data: number[];
}

export const WeeklyProgress = ({ data }: WeeklyProgressProps) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getStatusColor = (value: number) => {
    if (value >= 85) return '#10b981';
    if (value >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const getStatusIcon = (value: number) => {
    if (value >= 85) return <CheckCircle size={16} color="#10b981" />;
    if (value >= 70) return <CheckCircle size={16} color="#f59e0b" />;
    return <XCircle size={16} color="#ef4444" />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {days.map((day, index) => (
          <View key={index} style={styles.dayCard}>
            <View style={styles.dayHeader}>
              {getStatusIcon(data[index])}
              <Text style={styles.dayName}>{day}</Text>
            </View>
            <View 
              style={[
                styles.scoreCircle,
                { backgroundColor: `${getStatusColor(data[index])}20` }
              ]}
            >
              <Text style={[
                styles.scoreText,
                { color: getStatusColor(data[index]) }
              ]}>
                {data[index]}%
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  dayCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: '13%',
    minWidth: 42,
  },
  dayHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  dayName: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#6b7280',
    marginTop: 2,
  },
  scoreCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
});