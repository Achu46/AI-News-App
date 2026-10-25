import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch, 
  Alert, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { THEME } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of QUE Solutions?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.replace('Auth');
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Request Account Deletion',
      'Account deletion will remove all personal data and revoke access. An administrator will process this request within 48 hours.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Submit Request', 
          style: 'destructive',
          onPress: () => Alert.alert('Request Received', 'Your deletion request has been submitted for audit review.')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={THEME.colors.canvas} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitial}>
              {(user?.displayName || user?.email || 'Q').charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.profileName}>{user?.displayName || 'User'}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
          <View style={styles.uidBadge}>
            <Text style={styles.uidText}>UID: {user?.uid?.substring(0, 16)}...</Text>
          </View>
        </View>

        {/* Preferences Section */}
        <Text style={styles.sectionHeader}>Preferences</Text>
        <View style={styles.settingsGroup}>
          <View style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>Push Notifications</Text>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: THEME.colors.border, true: THEME.colors.forest }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.settingsRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.settingsLabel}>Operational Email Alerts</Text>
            <Switch
              value={emailAlerts}
              onValueChange={setEmailAlerts}
              trackColor={{ false: THEME.colors.border, true: THEME.colors.forest }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Support & Legal */}
        <Text style={styles.sectionHeader}>Support & Legal</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity
            style={styles.settingsRow}
            onPress={() => Alert.alert('Contact Support', 'Call: +91 7092490337\nEmail: que.solutions.service@gmail.com\nHeadquarters: Erode, Tamil Nadu')}
          >
            <Text style={styles.settingsLabel}>Contact Enterprise Support</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsRow}
            onPress={() => Alert.alert('Privacy Policy', 'QUE Solutions strictly safeguards all enterprise and user information with encrypted transmission and access-controlled databases.')}
          >
            <Text style={styles.settingsLabel}>Privacy Policy</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingsRow, { borderBottomWidth: 0 }]}
            onPress={() => Alert.alert('Terms of Service', 'QUE Solutions terms govern customer care, software usage, and operational SLA agreements.')}
          >
            <Text style={styles.settingsLabel}>Terms & Conditions</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Dangerous Operations */}
        <Text style={styles.sectionHeader}>Account Actions</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingsRow} onPress={handleLogout}>
            <Text style={[styles.settingsLabel, { color: THEME.colors.error }]}>Sign Out</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingsRow, { borderBottomWidth: 0 }]}
            onPress={handleDeleteAccount}
          >
            <Text style={[styles.settingsLabel, { color: THEME.colors.textMuted }]}>Request Account Deletion</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>QUE Solutions Mobile Core v1.0.0</Text>
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
  profileCard: {
    backgroundColor: THEME.colors.surface,
    padding: 24,
    borderRadius: THEME.radius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    alignItems: 'center',
    marginBottom: 24
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: THEME.colors.forest,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  avatarInitial: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.forest,
    marginBottom: 4
  },
  profileEmail: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    marginBottom: 8
  },
  uidBadge: {
    backgroundColor: THEME.colors.canvas,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.radius.pill,
    borderWidth: 1,
    borderColor: THEME.colors.border
  },
  uidText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: THEME.colors.textMuted
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
    marginLeft: 4
  },
  settingsGroup: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.radius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 24,
    overflow: 'hidden'
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border
  },
  settingsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.textPrimary
  },
  chevron: {
    fontSize: 18,
    color: THEME.colors.textMuted,
    fontWeight: '300'
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: THEME.colors.textMuted,
    marginTop: 8,
    marginBottom: 24
  }
});
