import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Volume2, Globe, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Mic, Target, Palette, Download } from 'lucide-react-native';

const SETTINGS_SECTIONS = [
  {
    title: 'Profile',
    items: [
      { 
        id: 'profile', 
        title: 'Edit Profile', 
        icon: User, 
        type: 'navigation',
        description: 'Update your personal information'
      },
      { 
        id: 'language', 
        title: 'Learning Language', 
        icon: Globe, 
        type: 'navigation',
        value: 'English (US)',
        description: 'Choose your target language'
      },
      { 
        id: 'difficulty', 
        title: 'Difficulty Level', 
        icon: Target, 
        type: 'navigation',
        value: 'Intermediate',
        description: 'Adjust the challenge level'
      },
    ],
  },
  {
    title: 'Audio & Speech',
    items: [
      { 
        id: 'voice', 
        title: 'Voice Settings', 
        icon: Volume2, 
        type: 'navigation',
        description: 'Adjust speech rate and voice'
      },
      { 
        id: 'microphone', 
        title: 'Microphone Sensitivity', 
        icon: Mic, 
        type: 'navigation',
        description: 'Calibrate recording sensitivity'
      },
      { 
        id: 'playback', 
        title: 'Auto-playback', 
        icon: Volume2, 
        type: 'toggle',
        value: true,
        description: 'Play corrections automatically'
      },
    ],
  },
  {
    title: 'App Settings',
    items: [
      { 
        id: 'notifications', 
        title: 'Notifications', 
        icon: Bell, 
        type: 'toggle',
        value: true,
        description: 'Daily practice reminders'
      },
      { 
        id: 'offline', 
        title: 'Offline Mode', 
        icon: Download, 
        type: 'toggle',
        value: false,
        description: 'Download content for offline use'
      },
      { 
        id: 'theme', 
        title: 'Theme', 
        icon: Palette, 
        type: 'navigation',
        value: 'Light',
        description: 'Choose your preferred theme'
      },
    ],
  },
  {
    title: 'Support & Legal',
    items: [
      { 
        id: 'help', 
        title: 'Help Center', 
        icon: HelpCircle, 
        type: 'navigation',
        description: 'Get help and support'
      },
      { 
        id: 'privacy', 
        title: 'Privacy Policy', 
        icon: Shield, 
        type: 'navigation',
        description: 'View our privacy policy'
      },
      { 
        id: 'logout', 
        title: 'Sign Out', 
        icon: LogOut, 
        type: 'action',
        color: '#ef4444',
        description: 'Sign out of your account'
      },
    ],
  },
];

export default function SettingsScreen() {
  const [settingsState, setSettingsState] = useState({
    playback: true,
    notifications: true,
    offline: false,
  });

  const toggleSetting = (id: string) => {
    setSettingsState(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev],
    }));
  };

  const handleSettingPress = (item: any) => {
    if (item.type === 'toggle') {
      toggleSetting(item.id);
    } else if (item.type === 'navigation') {
      // Handle navigation
      console.log('Navigate to:', item.id);
    } else if (item.type === 'action') {
      // Handle action
      console.log('Action:', item.id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your learning experience</Text>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <User size={32} color="#6366f1" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
            <View style={styles.profileStats}>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatNumber}>87%</Text>
                <Text style={styles.profileStatLabel}>Avg Score</Text>
              </View>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatNumber}>7</Text>
                <Text style={styles.profileStatLabel}>Day Streak</Text>
              </View>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatNumber}>23</Text>
                <Text style={styles.profileStatLabel}>Sessions</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Settings Sections */}
        {SETTINGS_SECTIONS.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionItems}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingItem,
                    itemIndex === section.items.length - 1 && styles.settingItemLast
                  ]}
                  onPress={() => handleSettingPress(item)}
                >
                  <View style={styles.settingIcon}>
                    <item.icon size={20} color={item.color || '#6b7280'} />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={[
                      styles.settingTitle,
                      item.color && { color: item.color }
                    ]}>
                      {item.title}
                    </Text>
                    <Text style={styles.settingDescription}>
                      {item.description}
                    </Text>
                    {item.value && (
                      <Text style={styles.settingValue}>{item.value}</Text>
                    )}
                  </View>
                  <View style={styles.settingAction}>
                    {item.type === 'toggle' ? (
                      <Switch
                        value={settingsState[item.id as keyof typeof settingsState]}
                        onValueChange={() => toggleSetting(item.id)}
                        trackColor={{ false: '#f3f4f6', true: '#6366f1' }}
                        thumbColor={settingsState[item.id as keyof typeof settingsState] ? '#ffffff' : '#ffffff'}
                      />
                    ) : (
                      <ChevronRight size={16} color="#9ca3af" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Language Tutor v1.0.0</Text>
          <Text style={styles.appInfoText}>© 2024 Language Learning Co.</Text>
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
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f0f0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  profileStats: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  profileStat: {
    alignItems: 'center',
  },
  profileStatNumber: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
  },
  profileStatLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 2,
  },
  settingsSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  sectionItems: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  settingDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  settingValue: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6366f1',
    marginTop: 4,
  },
  settingAction: {
    marginLeft: 12,
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  appInfoText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 40,
  },
});