import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react-native';
import { ProgressChart } from '@/components/ProgressChart';
import { StatCard } from '@/components/StatCard';
import { WeeklyProgress } from '@/components/WeeklyProgress';

const { width } = Dimensions.get('window');

const PROGRESS_DATA = {
  weeklyAccuracy: [78, 82, 85, 88, 92, 89, 94],
  monthlyStats: {
    totalPracticeTime: 12.5,
    averageAccuracy: 87,
    streakDays: 7,
    completedSessions: 23,
  },
  recentAchievements: [
    { id: 1, title: '7-Day Streak', description: 'Practiced for 7 days straight', date: '2024-01-15' },
    { id: 2, title: 'High Accuracy', description: 'Achieved 95% accuracy', date: '2024-01-14' },
    { id: 3, title: 'Speed Master', description: 'Completed 10 sessions', date: '2024-01-12' },
  ],
  skillBreakdown: [
    { skill: 'Pronunciation', score: 92, trend: 'up' },
    { skill: 'Fluency', score: 85, trend: 'up' },
    { skill: 'Vocabulary', score: 88, trend: 'stable' },
    { skill: 'Grammar', score: 81, trend: 'up' },
  ],
};

export default function ProgressScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Keep up the great work!</Text>
        </View>

        {/* Key Stats */}
        <View style={styles.statsGrid}>
          <StatCard
            icon={<TrendingUp size={20} color="#10b981" />}
            title="Avg Accuracy"
            value={`${PROGRESS_DATA.monthlyStats.averageAccuracy}%`}
            trend="+5%"
            color="#10b981"
          />
          <StatCard
            icon={<Calendar size={20} color="#6366f1" />}
            title="Streak"
            value={`${PROGRESS_DATA.monthlyStats.streakDays} days`}
            trend="Current"
            color="#6366f1"
          />
          <StatCard
            icon={<Target size={20} color="#f59e0b" />}
            title="Sessions"
            value={`${PROGRESS_DATA.monthlyStats.completedSessions}`}
            trend="This month"
            color="#f59e0b"
          />
          <StatCard
            icon={<Award size={20} color="#8b5cf6" />}
            title="Hours"
            value={`${PROGRESS_DATA.monthlyStats.totalPracticeTime}h`}
            trend="Total"
            color="#8b5cf6"
          />
        </View>

        {/* Weekly Progress Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Weekly Accuracy</Text>
          <ProgressChart data={PROGRESS_DATA.weeklyAccuracy} />
        </View>

        {/* Weekly Progress Grid */}
        <View style={styles.weeklySection}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <WeeklyProgress data={PROGRESS_DATA.weeklyAccuracy} />
        </View>

        {/* Skills Breakdown */}
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills Breakdown</Text>
          <View style={styles.skillsList}>
            {PROGRESS_DATA.skillBreakdown.map((skill, index) => (
              <View key={index} style={styles.skillItem}>
                <View style={styles.skillInfo}>
                  <Text style={styles.skillName}>{skill.skill}</Text>
                  <View style={styles.skillTrend}>
                    <Text style={styles.skillScore}>{skill.score}%</Text>
                    <TrendingUp 
                      size={14} 
                      color={skill.trend === 'up' ? '#10b981' : '#6b7280'} 
                    />
                  </View>
                </View>
                <View style={styles.skillBarContainer}>
                  <View 
                    style={[
                      styles.skillBar, 
                      { width: `${skill.score}%`, backgroundColor: getSkillColor(skill.skill) }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementsList}>
            {PROGRESS_DATA.recentAchievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementItem}>
                <View style={styles.achievementIcon}>
                  <Award size={20} color="#f59e0b" />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  <Text style={styles.achievementDate}>{achievement.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const getSkillColor = (skill: string) => {
  const colors = {
    'Pronunciation': '#6366f1',
    'Fluency': '#10b981',
    'Vocabulary': '#f59e0b',
    'Grammar': '#8b5cf6',
  };
  return colors[skill as keyof typeof colors] || '#6b7280';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 12,
  },
  chartSection: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  weeklySection: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  skillsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  achievementsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  skillsList: {
    gap: 16,
  },
  skillItem: {
    gap: 8,
  },
  skillInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  skillTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  skillScore: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  skillBarContainer: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  skillBar: {
    height: '100%',
    borderRadius: 4,
  },
  achievementsList: {
    gap: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  achievementDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  achievementDate: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 2,
  },
  bottomSpacing: {
    height: 40,
  },
});