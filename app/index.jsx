import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Debugging statement to confirm the router object
    console.log('Router object:', router);

    // Delay navigation slightly to ensure router is ready
    const timeout = setTimeout(() => {
      try {
        // Attempt to navigate to the SignIn screen
        router.replace('/Folder/SignIn');
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }, 100); // Small delay

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
