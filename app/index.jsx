import { useRouter } from 'expo-router';
import { Button } from 'react-native';

import { View, Image, StyleSheet, Pressable, Text } from 'react-native';

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/GymLogo.png')}
        style={styles.logo}
      />
      <Button
        title="Go to Sign In"
        onPress={() => router.push('/Folder/signin')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F7FF',
  },
  logo: {
    width: 250,
    height: 250,
    borderRadius: 125,
    // iOS shadow
    shadowColor: '#616060',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    // Android shadow
    elevation: 5,
  },
  button: {
    backgroundColor: '#4318FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});