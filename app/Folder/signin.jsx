import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router'; // Use useRouter for navigation

export default function SignIn() {
  const router = useRouter(); // Initialize useRouter hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError(''); // Clear previous errors

    try {
      // Make the POST request with axios
      const response = await axios.post('http://192.168.152.207:6001/api/v1/admin/login', {
        username,
        password,
      });

      // Handle the response
      const { data } = response;
      if (response.status === 200) {
        // Store the token securely using expo-secure-store
        await SecureStore.setItemAsync('token', data.token);

        // Navigate to the Tab navigation screen
        router.push('/Folder/Tabs'); // Ensure this path matches your tab navigation route
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
      <Text style={styles.title}>Log In</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
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
    fontWeight: '400',
  },
  button: {
    backgroundColor: '#2B3674',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 280,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
