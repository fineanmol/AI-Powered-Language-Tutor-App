import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleCheck as CheckCircle, Circle as XCircle, Lightbulb, TrendingUp } from 'lucide-react-native';

interface FeedbackCardProps {
  feedback: {
    corrections: Array<{
      word: string;
      suggestion: string;
      type: 'correct' | 'incorrect' | 'suggestion';
    }>;
    strengths: string[];
    improvements: string[];
  };
}

export const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detailed Feedback</Text>
      
      {/* Strengths */}
      {feedback.strengths.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CheckCircle size={20} color="#10b981" />
            <Text style={styles.sectionTitle}>What you did well</Text>
          </View>
          {feedback.strengths.map((strength, index) => (
            <View key={index} style={styles.feedbackItem}>
              <Text style={styles.feedbackText}>{strength}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Improvements */}
      {feedback.improvements.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#f59e0b" />
            <Text style={styles.sectionTitle}>Areas for improvement</Text>
          </View>
          {feedback.improvements.map((improvement, index) => (
            <View key={index} style={styles.feedbackItem}>
              <Text style={styles.feedbackText}>{improvement}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Tips */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Lightbulb size={20} color="#6366f1" />
          <Text style={styles.sectionTitle}>Practice tip</Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            Try practicing tongue twisters daily to improve your pronunciation clarity. 
            Focus on speaking slowly and clearly before increasing speed.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginLeft: 8,
  },
  feedbackItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 4,
  },
  feedbackText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
  },
  tipCard: {
    backgroundColor: '#f0f0ff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    lineHeight: 20,
  },
});