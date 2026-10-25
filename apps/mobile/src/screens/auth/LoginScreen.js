import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  ActivityIndicator, 
  StatusBar 
} from 'react-native';
import { THEME } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await login(email, password);
      // Main navigator will automatically transition on auth state change
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
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
        {/* Logo and Brand */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/logo/que_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>QUE SOLUTIONS</Text>
          <Text style={styles.tagline}>People • Process • Progress</Text>
        </View>

        {/* Error Message Banner */}
        {error ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Form */}
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

          <View style={styles.inputGroup}>
            <View style={styles.passwordHeader}>
              <Text style={styles.label}>Password</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotText}>Forgot?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, { flex: 1, paddingRight: 48 }]}
                placeholder="Enter password"
                placeholderTextColor={THEME.colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Text style={styles.eyeText}>{showPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    marginBottom: 32
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.forest,
    letterSpacing: 1
  },
  tagline: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.olive,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 4
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
  form: {
    backgroundColor: THEME.colors.surface,
    padding: 24,
    borderRadius: THEME.radius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    elevation: 2
  },
  inputGroup: {
    marginBottom: 18
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
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.olive
  },
  passwordWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center'
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 4
  },
  eyeText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.olive
  },
  primaryButton: {
    backgroundColor: THEME.colors.forest,
    height: 48,
    borderRadius: THEME.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  buttonDisabled: {
    opacity: 0.7
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24
  },
  footerText: {
    fontSize: 14,
    color: THEME.colors.textSecondary
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.forest
  }
});
