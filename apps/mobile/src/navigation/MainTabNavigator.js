import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/home/HomeScreen';
import AiAssistantScreen from '../screens/ai/AiAssistantScreen';
import ActivityScreen from '../screens/activity/ActivityScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { THEME } from '../theme/theme';

const Tab = createBottomTabNavigator();

function TabIcon({ label, focused }) {
  return (
    <View style={styles.iconContainer}>
      <View style={[styles.dot, focused && styles.activeDot]} />
      <Text style={[styles.label, focused && styles.activeLabel]}>
        {label}
      </Text>
    </View>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: THEME.colors.surface,
          borderTopColor: THEME.colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8
        },
        tabBarShowLabel: false
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Home" focused={focused} />
        }}
      />
      <Tab.Screen
        name="AiAssistant"
        component={AiAssistantScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Gemini AI" focused={focused} />
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Activity" focused={focused} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Profile" focused={focused} />
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'transparent'
  },
  activeDot: {
    backgroundColor: THEME.colors.forest
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textMuted
  },
  activeLabel: {
    color: THEME.colors.forest,
    fontWeight: '700'
  }
});
