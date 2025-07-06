import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
  color: string;
}

export const StatCard = ({ icon, title, value, trend, color }: StatCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={[styles.trend, { color }]}>{trend}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    minWidth: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginLeft: 6,
  },
  value: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  trend: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
});