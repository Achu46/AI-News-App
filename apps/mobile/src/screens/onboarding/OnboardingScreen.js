import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  useWindowDimensions, 
  StatusBar, 
  SafeAreaView 
} from 'react-native';
import { THEME } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

const ONBOARDING_SLIDES = [
  {
    id: '1',
    badge: 'Customer Care Services',
    title: 'People at the Heart of Every Conversation',
    description: 'Premier 24/7 omnichannel call centre support engineered to deliver seamless, empathetic customer experiences everyday.'
  },
  {
    id: '2',
    badge: 'Technology & Web Engineering',
    title: 'Modern High-Velocity Digital Solutions',
    description: 'Enterprise React web portals, cloud databases, and continuous IT support built to scale with your organization.'
  },
  {
    id: '3',
    badge: 'AI & Process Optimization',
    title: 'Empowering Progress with Gemini AI',
    description: 'Automate business inquiries, analyze customer telemetry, and accelerate everyday workflows with intelligent AI assistance.'
  }
];

export default function OnboardingScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { completeOnboarding } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    await completeOnboarding();
    navigation.replace('Auth');
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{item.badge}</Text>
      </View>

      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={styles.slideDescription}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={THEME.colors.canvas} />

      {/* Skip Button */}
      <View style={styles.header}>
        {currentIndex < ONBOARDING_SLIDES.length - 1 ? (
          <TouchableOpacity onPress={handleFinish} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ height: 36 }} />
        )}
      </View>

      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_SLIDES}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />

      {/* Pagination & Next/Get Started Button */}
      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {ONBOARDING_SLIDES.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                currentIndex === idx && styles.activeDot
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>
            {currentIndex === ONBOARDING_SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.canvas
  },
  header: {
    paddingHorizontal: THEME.spacing.lg,
    paddingTop: THEME.spacing.md,
    alignItems: 'flex-end'
  },
  skipButton: {
    padding: 8
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.textSecondary
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: THEME.colors.oliveTint,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.radius.pill,
    marginBottom: THEME.spacing.lg
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.olive,
    textTransform: 'uppercase',
    letterSpacing: 0.6
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: THEME.colors.forest,
    lineHeight: 36,
    marginBottom: THEME.spacing.base
  },
  slideDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: THEME.colors.textSecondary
  },
  footer: {
    padding: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.colors.borderStrong
  },
  activeDot: {
    width: 24,
    backgroundColor: THEME.colors.forest
  },
  actionButton: {
    backgroundColor: THEME.colors.forest,
    paddingHorizontal: 28,
    height: 48,
    borderRadius: THEME.radius.md,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700'
  }
});
