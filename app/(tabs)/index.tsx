import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { Mic, MicOff, Play, RotateCcw, Volume2, CircleCheck as CheckCircle, Circle as XCircle, Target, Flame, Award } from 'lucide-react-native';
import { WaveForm } from '@/components/WaveForm';
import { AccuracyMeter } from '@/components/AccuracyMeter';
import { FeedbackCard } from '@/components/FeedbackCard';

const PRACTICE_PHRASES = [
  {
    id: 1,
    text: "The quick brown fox jumps over the lazy dog.",
    difficulty: "Beginner",
    language: "English",
    category: "Pronunciation"
  },
  {
    id: 2,
    text: "She sells seashells by the seashore.",
    difficulty: "Intermediate",
    language: "English",
    category: "Tongue Twisters"
  },
  {
    id: 3,
    text: "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    difficulty: "Advanced",
    language: "English",
    category: "Tongue Twisters"
  },
  {
    id: 4,
    text: "The weather today is absolutely beautiful.",
    difficulty: "Beginner",
    language: "English",
    category: "Daily Conversation"
  },
];

export default function PracticeScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(PRACTICE_PHRASES[0]);
  const [userTranscription, setUserTranscription] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [streak, setStreak] = useState(7);
  const [todayScore, setTodayScore] = useState(85);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingPermission, setRecordingPermission] = useState<boolean | null>(null);
  
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    if (isRecording) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [isRecording]);

  const requestPermissions = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      setRecordingPermission(status === 'granted');
    } catch (error) {
      console.error('Error requesting permissions:', error);
      setRecordingPermission(false);
    }
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopAnimation = () => {
    animatedValue.setValue(0);
  };

  const startRecording = async () => {
    if (!recordingPermission) {
      await requestPermissions();
      return;
    }

    try {
      setIsRecording(true);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      setIsAnalyzing(true);
      
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      
      // Simulate speech-to-text processing
      setTimeout(() => {
        simulateSpeechAnalysis();
      }, 2000);
      
      setRecording(null);
    } catch (error) {
      console.error('Error stopping recording:', error);
      setIsAnalyzing(false);
    }
  };

  const simulateSpeechAnalysis = () => {
    // Simulate speech recognition and analysis
    const simulatedTranscription = "The quick brown fox jumps over the lazy dog.";
    const simulatedAccuracy = Math.floor(Math.random() * 30) + 70; // 70-100%
    
    setUserTranscription(simulatedTranscription);
    setAccuracy(simulatedAccuracy);
    setFeedback({
      corrections: [
        { word: "fox", suggestion: "fox", type: "correct" },
        { word: "jumps", suggestion: "jumps", type: "correct" },
      ],
      strengths: ["Clear pronunciation", "Good rhythm"],
      improvements: ["Work on 'th' sounds", "Slow down slightly"],
    });
    setIsAnalyzing(false);
  };

  const playOriginalAudio = () => {
    if (Platform.OS !== 'web') {
      Speech.speak(currentPhrase.text, {
        language: 'en-US',
        rate: 0.8,
        pitch: 1.0,
      });
    }
  };

  const playUserAudio = () => {
    if (Platform.OS !== 'web') {
      Speech.speak(userTranscription, {
        language: 'en-US',
        rate: 0.8,
        pitch: 1.0,
      });
    }
  };

  const resetPractice = () => {
    setUserTranscription('');
    setAccuracy(null);
    setFeedback(null);
    setIsAnalyzing(false);
  };

  const nextPhrase = () => {
    const currentIndex = PRACTICE_PHRASES.findIndex(p => p.id === currentPhrase.id);
    const nextIndex = (currentIndex + 1) % PRACTICE_PHRASES.length;
    setCurrentPhrase(PRACTICE_PHRASES[nextIndex]);
    resetPractice();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Stats */}
        <View style={styles.headerStats}>
          <View style={styles.statCard}>
            <Flame size={20} color="#f59e0b" />
            <Text style={styles.statNumber}>{streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Target size={20} color="#10b981" />
            <Text style={styles.statNumber}>{todayScore}%</Text>
            <Text style={styles.statLabel}>Today's Avg</Text>
          </View>
          <View style={styles.statCard}>
            <Award size={20} color="#6366f1" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
        </View>

        {/* Current Phrase Card */}
        <View style={styles.phraseCard}>
          <View style={styles.phraseHeader}>
            <View style={styles.phraseInfo}>
              <Text style={styles.phraseCategory}>{currentPhrase.category}</Text>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(currentPhrase.difficulty) }]}>
                <Text style={styles.difficultyText}>{currentPhrase.difficulty}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={playOriginalAudio} style={styles.playButton}>
              <Volume2 size={20} color="#6366f1" />
            </TouchableOpacity>
          </View>
          <Text style={styles.phraseText}>{currentPhrase.text}</Text>
        </View>

        {/* Recording Controls */}
        <View style={styles.recordingSection}>
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordButtonActive]}
            onPress={isRecording ? stopRecording : startRecording}
            disabled={isAnalyzing}
          >
            <Animated.View style={[
              styles.recordButtonInner,
              {
                transform: [{
                  scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                  }),
                }],
              },
            ]}>
              {isRecording ? (
                <MicOff size={32} color="#ffffff" />
              ) : (
                <Mic size={32} color="#ffffff" />
              )}
            </Animated.View>
          </TouchableOpacity>
          
          <Text style={styles.recordingLabel}>
            {isRecording ? 'Recording...' : isAnalyzing ? 'Analyzing...' : 'Tap to record'}
          </Text>
          
          {isRecording && <WaveForm />}
        </View>

        {/* Accuracy Results */}
        {accuracy !== null && (
          <View style={styles.resultsSection}>
            <AccuracyMeter score={accuracy} />
            
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={playUserAudio} style={styles.actionButton}>
                <Play size={16} color="#6366f1" />
                <Text style={styles.actionButtonText}>Play Recording</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={resetPractice} style={styles.actionButton}>
                <RotateCcw size={16} color="#6366f1" />
                <Text style={styles.actionButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Feedback */}
        {feedback && (
          <FeedbackCard feedback={feedback} />
        )}

        {/* Next Phrase Button */}
        <TouchableOpacity onPress={nextPhrase} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next Phrase</Text>
        </TouchableOpacity>

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
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1f2937',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 2,
  },
  phraseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  phraseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  phraseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phraseCategory: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginRight: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  playButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#f0f0ff',
  },
  phraseText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#1f2937',
    lineHeight: 28,
  },
  recordingSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  recordButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  recordButtonActive: {
    backgroundColor: '#ef4444',
    shadowColor: '#ef4444',
  },
  recordButtonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 20,
  },
  resultsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366f1',
    marginLeft: 8,
  },
  nextButton: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
  },
  bottomSpacing: {
    height: 40,
  },
});