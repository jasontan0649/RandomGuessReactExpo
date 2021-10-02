import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Alert } from "react-native";


export default function App() {
  const [guessAttempt, setGuessAttempt] = useState(0);
  const [resultString, setResultString] = useState("No Guess Yet");
  const [lowRange, setLowRange] = useState(0);
  const [upRange, setUpRange] = useState(1000);
  const [compGuess, setCompGuess] = useState(getRandomInt(lowRange, upRange));
  const [userGuess, setUserGuess] = useState(null);

  function getRandomInt (lowRange, upRange) {
    return Math.floor(Math.random() * (upRange - lowRange + 1) + lowRange);
  }

  const setRandomInt = () => {
    setCompGuess(getRandomInt(lowRange, upRange));
  }

  const WinAlert = (title, text) => {
    Alert.alert(title, text, [{text: "OK"}])
  }

  const checkUserInput = () => {
    setGuessAttempt(guessAttempt + 1);
    if (userGuess == compGuess) {
      setResultString("You are right");
      Keyboard.dismiss();
      WinAlert("Congratualtion", "You are right, you spent " + guessAttempt + " times to guess correctly.")
      setGuessAttempt(0);
    }  
    else if (userGuess > compGuess)
      setResultString("Too big");
    else
      setResultString("Too Small");
  }

  return (
    <View style={styles.container}>

      <View style={styles.rangeWrapper}>
        <Text>Low: </Text>
        <TextInput 
          style={styles.rangeInput} 
          placeholder={"Low Range"} 
          value={lowRange.toString()} 
          onChangeText={lowRange => setLowRange(parseInt(lowRange))}
        />
        <Text>Up :</Text>
        <TextInput 
          style={styles.rangeInput} 
          placeholder={"Up Range"} 
          value={upRange.toString()} 
          onChangeText={upRange => setUpRange(parseInt(upRange))}
        />
      </View>

      <TouchableOpacity onPress={() => setRandomInt()}>
        <View style={styles.updateButtonContainer}>
          <Text style={styles.updateText}>Update</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{"Guess Attempt: " + guessAttempt + "\n" + resultString}</Text>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.userGuessContainer}>
        
        <TextInput 
          style={styles.userGuessInput} 
          placeholder={'Guess a number'} 
          onChangeText={text => setUserGuess(parseInt(text))}
          onSubmitEditing={() => checkUserInput()}
        />
      
        <TouchableOpacity onPress={() => checkUserInput()}>
          <View style={styles.userSubmitContainer}>
            <Text style={styles.userSubmitText}>Submit</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  rangeWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  rangeInput: {
    backgroundColor: "#DDD",
    borderRadius: 80,
    borderColor: "#C0C0C0",
    borderWidth: 5,
    width: '30%',
    textAlign: 'center',
    height: '100%'
  },

  updateButtonContainer: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: "#DDD",
    flexDirection: 'row',
    borderRadius: 80,
    borderColor: "#C0C0C0",
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  updateText: {
    fontSize: 17,
    textAlign: 'center',
  },

  resultContainer: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  resultText: {
    fontSize: 25,
  },

  userGuessContainer: {
    position: 'absolute',
    bottom: Platform.OS === "ios" ? 60 : 20,
    width: '100%',
    flexDirection : 'row',
    justifyContent: "space-around",
    alignItems: 'center',
  },

  userGuessInput: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#DDD",
    borderRadius: 80,
    borderColor: "#C0C0C0",
    borderWidth: 5,
    width: 250,
  },

  userSubmitContainer: {
    width: 60,
    height: 60, 
    backgroundColor: "#DDD",
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "#C0C0C0",
    borderWidth: 5,
  }


});
