import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router'; // Use useRouter for navigation
import DashBoard from './Dashboard.jsx';

export default function SignIn() {
  const router = useRouter(); // Initialize useRouter hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError(''); // Clear previous errors

    try {
      // Make the POST request with axios
      const response = await axios.post('http://192.168.1.8:6001/api/v1/admin/login', {
        username: username,
        password: password,
      });

      // Handle the response
      const { data } = response;
      if (response.status === 200) {
        // Store the token securely using expo-secure-store
        await SecureStore.setItemAsync('token', data.token);

        // Navigate to Sidebar screen
        router.push('/Folder/Dashboard'); // Use router.push to navigate to the Sidebar
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        setError('No response from the server. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <DashBoard/>
      <Text style={styles.title}>Sign-in</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F3F7FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B3674',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#2B3674',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#F3F7FF',
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
