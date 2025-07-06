import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Trophy, 
  Medal, 
  Star, 
  Target, 
  Flame, 
  BookOpen,
  Calendar,
  Zap,
  Award,
  Crown
} from 'lucide-react-native';

const ACHIEVEMENTS = [
  {
    id: 1,
    title: 'First Steps',
    description: 'Complete your first practice session',
    icon: Star,
    color: '#10b981',
    unlocked: true,
    unlockedDate: '2024-01-10',
    category: 'Beginner',
  },
  {
    id: 2,
    title: 'Week Warrior',
    description: 'Practice for 7 consecutive days',
    icon: Flame,
    color: '#f59e0b',
    unlocked: true,
    unlockedDate: '2024-01-15',
    category: 'Consistency',
  },
  {
    id: 3,
    title: 'Perfect Score',
    description: 'Achieve 100% accuracy in a session',
    icon: Trophy,
    color: '#6366f1',
    unlocked: true,
    unlockedDate: '2024-01-12',
    category: 'Accuracy',
  },
  {
    id: 4,
    title: 'Speed Demon',
    description: 'Complete 10 sessions in one day',
    icon: Zap,
    color: '#8b5cf6',
    unlocked: false,
    category: 'Speed',
  },
  {
    id: 5,
    title: 'Grammar Master',
    description: 'Score 90% or higher in grammar exercises',
    icon: BookOpen,
    color: '#ef4444',
    unlocked: true,
    unlockedDate: '2024-01-14',
    category: 'Skills',
  },
  {
    id: 6,
    title: 'Monthly Champion',
    description: 'Practice every day for a month',
    icon: Calendar,
    color: '#06b6d4',
    unlocked: false,
    category: 'Consistency',
  },
  {
    id: 7,
    title: 'Pronunciation Pro',
    description: 'Master 50 difficult words',
    icon: Target,
    color: '#10b981',
    unlocked: false,
    category: 'Skills',
  },
  {
    id: 8,
    title: 'Legend',
    description: 'Reach 1000 total practice sessions',
    icon: Crown,
    color: '#f59e0b',
    unlocked: false,
    category: 'Milestones',
  },
];

const CATEGORIES = ['All', 'Beginner', 'Consistency', 'Accuracy', 'Speed', 'Skills', 'Milestones'];

export default function AchievementsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredAchievements = selectedCategory === 'All' 
    ? ACHIEVEMENTS 
    : ACHIEVEMENTS.filter(achievement => achievement.category === selectedCategory);

  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length;
  const totalCount = ACHIEVEMENTS.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Achievements</Text>
          <Text style={styles.subtitle}>
            {unlockedCount} of {totalCount} unlocked
          </Text>
        </View>

        {/* Progress Overview */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Award size={24} color="#6366f1" />
            <Text style={styles.progressTitle}>Your Progress</Text>
          </View>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Text style={styles.progressNumber}>{unlockedCount}</Text>
              <Text style={styles.progressLabel}>Unlocked</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressNumber}>{totalCount - unlockedCount}</Text>
              <Text style={styles.progressLabel}>Remaining</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressNumber}>{Math.round((unlockedCount / totalCount) * 100)}%</Text>
              <Text style={styles.progressLabel}>Complete</Text>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${(unlockedCount / totalCount) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryFilter}
          contentContainerStyle={styles.categoryFilterContent}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Achievements Grid */}
        <View style={styles.achievementsGrid}>
          {filteredAchievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View style={[
                styles.achievementIcon,
                { backgroundColor: achievement.unlocked ? `${achievement.color}20` : '#f3f4f6' }
              ]}>
                <achievement.icon 
                  size={28} 
                  color={achievement.unlocked ? achievement.color : '#9ca3af'} 
                />
              </View>
              <View style={styles.achievementContent}>
                <Text style={[
                  styles.achievementTitle,
                  { color: achievement.unlocked ? '#1f2937' : '#9ca3af' }
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  { color: achievement.unlocked ? '#6b7280' : '#d1d5db' }
                ]}>
                  {achievement.description}
                </Text>
                {achievement.unlocked && achievement.unlockedDate && (
                  <Text style={styles.achievementDate}>
                    Unlocked {achievement.unlockedDate}
                  </Text>
                )}
                <View style={[
                  styles.categoryBadge,
                  { backgroundColor: achievement.unlocked ? `${achievement.color}10` : '#f9fafb' }
                ]}>
                  <Text style={[
                    styles.categoryBadgeText,
                    { color: achievement.unlocked ? achievement.color : '#9ca3af' }
                  ]}>
                    {achievement.category}
                  </Text>
                </View>
              </View>
              {achievement.unlocked && (
                <View style={styles.unlockedBadge}>
                  <Medal size={16} color="#10b981" />
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

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
  progressCard: {
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
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
    marginLeft: 8,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  progressStat: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1f2937',
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 2,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  categoryFilter: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  categoryFilterContent: {
    paddingHorizontal: 0,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: '#6366f1',
  },
  categoryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  achievementsGrid: {
    paddingHorizontal: 20,
    gap: 16,
  },
  achievementCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 8,
  },
  achievementDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#10b981',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  unlockedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpacing: {
    height: 40,
  },
});