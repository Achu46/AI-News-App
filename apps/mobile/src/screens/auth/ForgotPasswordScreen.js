import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  ActivityIndicator, 
  StatusBar 
} from 'react-native';
import { THEME } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { forgotPassword } = useAuth();

  const handleSendReset = async () => {
    if (!email.trim()) {
      setError('Please enter your account email.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor={THEME.colors.canvas} />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email and we'll send you instructions to reset your password.
          </Text>
        </View>

        {error ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {sent ? (
          <View style={styles.successBanner}>
            <Text style={styles.successTitle}>Check Your Inbox</Text>
            <Text style={styles.successText}>
              A password reset link has been dispatched to {email}. Follow the instructions in the email to set a new password.
            </Text>
            <TouchableOpacity
              style={[styles.primaryButton, { marginTop: 20 }]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.primaryButtonText}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="user@example.com"
                placeholderTextColor={THEME.colors.textMuted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <TouchableOpacity
              style={[styles.primaryButton, loading && styles.buttonDisabled]}
              onPress={handleSendReset}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.primaryButtonText}>Send Reset Link</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Cancel & Go Back</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.canvas
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: THEME.spacing.xl
  },
  header: {
    marginBottom: 24
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: THEME.colors.forest,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: THEME.colors.textSecondary
  },
  errorBanner: {
    backgroundColor: THEME.colors.errorBg,
    borderColor: '#FFCDD2',
    borderWidth: 1,
    borderRadius: THEME.radius.md,
    padding: 12,
    marginBottom: 16
  },
  errorText: {
    color: THEME.colors.error,
    fontSize: 13,
    fontWeight: '500'
  },
  successBanner: {
    backgroundColor: THEME.colors.surface,
    padding: 24,
    borderRadius: THEME.radius.lg,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    alignItems: 'center'
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.success,
    marginBottom: 8
  },
  successText: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20
  },
  form: {
    backgroundColor: THEME.colors.surface,
    padding: 24,
    borderRadius: THEME.radius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.border
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
    marginBottom: 6
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.radius.md,
    paddingHorizontal: 14,
    fontSize: 15,
    color: THEME.colors.textPrimary,
    backgroundColor: THEME.colors.surface
  },
  primaryButton: {
    backgroundColor: THEME.colors.forest,
    height: 48,
    borderRadius: THEME.radius.md,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonDisabled: {
    opacity: 0.7
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700'
  },
  backButton: {
    marginTop: 16,
    alignItems: 'center',
    padding: 8
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.textSecondary
  }
});
