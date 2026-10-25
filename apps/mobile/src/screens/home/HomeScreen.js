import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  RefreshControl, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { THEME } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const quickActions = [
    { title: 'Gemini AI Assistant', subtitle: 'Business reasoning', screen: 'AiAssistant', badge: 'Active' },
    { title: 'Activity History', subtitle: 'View audit timeline', screen: 'Activity', badge: null },
    { title: 'Call Centre Services', subtitle: 'Inbound & Outbound SLA', screen: 'Support', badge: '24/7' },
    { title: 'Profile & Security', subtitle: 'Settings & permissions', screen: 'Profile', badge: null }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={THEME.colors.canvas} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[THEME.colors.forest]} />}
      >
        {/* Top Header */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.welcomeSubtitle}>Good day,</Text>
            <Text style={styles.userName}>{user?.displayName || 'QUE Partner'}</Text>
          </View>

          <TouchableOpacity
            style={styles.avatarButton}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.8}
          >
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitial}>
                {(user?.displayName || user?.email || 'Q').charAt(0).toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Corporate Brand Card */}
        <View style={styles.brandCard}>
          <View style={styles.brandContent}>
            <View style={styles.brandPill}>
              <Text style={styles.brandPillText}>QUE SOLUTIONS</Text>
            </View>
            <Text style={styles.brandTitle}>People • Process • Progress</Text>
            <Text style={styles.brandSubtitle}>
              Customer Care & Call Centre Services, Website Development & Digital Acceleration.
            </Text>
          </View>
          <Image
            source={require('../../assets/logo/que_logo.png')}
            style={styles.cardLogo}
            resizeMode="contain"
          />
        </View>

        {/* Quick Action Cards Grid */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.grid}>
          {quickActions.map((action, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.gridCard}
              onPress={() => navigation.navigate(action.screen)}
              activeOpacity={0.75}
            >
              {action.badge ? (
                <View style={styles.cardBadge}>
                  <Text style={styles.cardBadgeText}>{action.badge}</Text>
                </View>
              ) : null}
              <Text style={styles.gridTitle}>{action.title}</Text>
              <Text style={styles.gridSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Announcements */}
        <Text style={styles.sectionTitle}>Operational Announcement</Text>
        <View style={styles.announcementCard}>
          <Text style={styles.announcementTitle}>24/7 Omnichannel Operations Active</Text>
          <Text style={styles.announcementBody}>
            QUE Solutions customer support desks and Gemini automated gateways are running under full SLA compliance.
          </Text>
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Account Activity</Text>
        <View style={styles.activityFeed}>
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.activityAction}>Authenticated via Mobile Client</Text>
              <Text style={styles.activityTime}>Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.canvas
  },
  scrollContent: {
    padding: THEME.spacing.lg
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    fontWeight: '500'
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.forest
  },
  avatarButton: {
    padding: 2
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: THEME.colors.forest,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700'
  },
  brandCard: {
    backgroundColor: THEME.colors.forest,
    borderRadius: THEME.radius.lg,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
    elevation: 3
  },
  brandContent: {
    flex: 1,
    paddingRight: 12
  },
  brandPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: THEME.radius.pill,
    marginBottom: 8
  },
  brandPillText: {
    color: THEME.colors.oliveTint,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6
  },
  brandSubtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: '#CCD6CD'
  },
  cardLogo: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.forest,
    marginBottom: 12,
    marginTop: 4
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24
  },
  gridCard: {
    width: '48%',
    backgroundColor: THEME.colors.surface,
    padding: 16,
    borderRadius: THEME.radius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    minHeight: 100,
    justifyContent: 'center',
    position: 'relative'
  },
  cardBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: THEME.colors.oliveTint,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: THEME.radius.pill
  },
  cardBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: THEME.colors.olive
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 4
  },
  gridSubtitle: {
    fontSize: 12,
    color: THEME.colors.textSecondary
  },
  announcementCard: {
    backgroundColor: THEME.colors.surface,
    padding: 16,
    borderRadius: THEME.radius.md,
    borderLeftWidth: 4,
    borderLeftColor: THEME.colors.olive,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 24
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginBottom: 4
  },
  announcementBody: {
    fontSize: 13,
    lineHeight: 19,
    color: THEME.colors.textSecondary
  },
  activityFeed: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.radius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    padding: 16
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.colors.olive
  },
  activityAction: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textPrimary
  },
  activityTime: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    marginTop: 2
  }
});
