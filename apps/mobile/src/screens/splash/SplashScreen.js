import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, ActivityIndicator, StatusBar } from 'react-native';
import { THEME } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function SplashScreen({ navigation }) {
  const { user, hasCompletedOnboarding, loading } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    // Smooth logo entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true
      })
    ]).start();

    // After animation and loading state check, navigate
    const timer = setTimeout(() => {
      if (!loading) {
        if (!hasCompletedOnboarding) {
          navigation.replace('Onboarding');
        } else if (user) {
          navigation.replace('Main');
        } else {
          navigation.replace('Auth');
        }
      }
    }, 1600);

    return () => clearTimeout(timer);
  }, [loading, user, hasCompletedOnboarding]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={THEME.colors.forest} />

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Image
          source={require('../../assets/logo/que_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>QUE SOLUTIONS</Text>
        <Text style={styles.tagline}>People • Process • Progress</Text>
      </Animated.View>

      <View style={styles.footer}>
        <ActivityIndicator color={THEME.colors.olive} size="small" />
        <Text style={styles.loadingText}>Loading enterprise workspace...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.forest,
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.spacing.xl
  },
  content: {
    alignItems: 'center'
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: THEME.spacing.lg
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginBottom: 6
  },
  tagline: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.oliveTint,
    letterSpacing: 2,
    textTransform: 'uppercase'
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    alignItems: 'center',
    gap: 8
  },
  loadingText: {
    fontSize: 12,
    color: '#8E9E90',
    fontWeight: '500'
  }
});
