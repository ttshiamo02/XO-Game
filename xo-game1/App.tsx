import { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Game: { player1: string; player2: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: { navigation: any }) {
  const [player1, setPlayer1] = useState<string>('');
  const [player2, setPlayer2] = useState<string>('');
  
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.subtitle}>Enter Player Names</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Player 1"
          placeholderTextColor="#AAA"
          value={player1}
          onChangeText={setPlayer1}
        />

        <TextInput
          style={styles.input}
          placeholder="Player 2"
          placeholderTextColor="#AAA"
          value={player2}
          onChangeText={setPlayer2}
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Game', { player1, player2 })}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

function GameScreen({ route }: { route: any }) {
  const { player1, player2 } = route.params;
  
  return (
    <View style={styles.gameContainer}>
      <View style={styles.header}>
        <Text style={styles.vsText}>{player1} vs {player2}</Text>
      </View>
      
      <View style={styles.board}>
        {Array.from({ length: 9 }).map((_, i) => (
          <TouchableOpacity key={i} style={styles.cell}>
            <Text style={styles.cellText}>{i % 2 === 0 ? 'X' : 'O'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#8A2BE2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Tic Tac Toe' }}
        />
        <Stack.Screen 
          name="Game" 
          component={GameScreen}
          options={({ route }) => ({ title: `${route.params.player1} vs ${route.params.player2}` })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  gameContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    marginBottom: 30,
  },
  vsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 2,
    borderColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0E6FF',
  },
  cellText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4B0082',
  },
});