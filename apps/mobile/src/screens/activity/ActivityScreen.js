import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView, 
  StatusBar, 
  RefreshControl 
} from 'react-native';
import { THEME } from '../../theme/theme';

export default function ActivityScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [activities] = useState([
    { id: '1', title: 'User Session Authenticated', detail: 'Mobile Android Client', time: '10 mins ago', type: 'LOGIN' },
    { id: '2', title: 'AI Assistant Query Executed', detail: 'Feature: mobile_assistant', time: '2 hours ago', type: 'AI' },
    { id: '3', title: 'Security Token Refreshed', detail: 'Firebase Auth ID Token', time: 'Yesterday', type: 'SECURITY' }
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.dot} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.detail}>{item.detail}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={THEME.colors.canvas} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity Timeline</Text>
        <Text style={styles.headerSubtitle}>Immutable audit history for your account</Text>
      </View>

      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[THEME.colors.forest]} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.canvas
  },
  header: {
    padding: 16,
    backgroundColor: THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.forest
  },
  headerSubtitle: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2
  },
  list: {
    padding: 16,
    gap: 12
  },
  card: {
    backgroundColor: THEME.colors.surface,
    padding: 16,
    borderRadius: THEME.radius.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.colors.olive,
    marginTop: 5
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textPrimary
  },
  detail: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2
  },
  time: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    marginTop: 6
  }
});
