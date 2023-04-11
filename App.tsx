import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Home } from './screens/Home'
import { Chat } from './screens/Chat'
import { ChatContextProvider } from './contexts/ChatContextProvider'

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

const Stack = createNativeStackNavigator()
const ChatStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    )
}

const RootNavigator = () => {
    return (
        <ChatContextProvider>
            <NavigationContainer>
                <ChatStack />
            </NavigationContainer>
        </ChatContextProvider>
    )
}

export default function App() {
    return (
        <SafeAreaProvider>
            <RootNavigator />
        </SafeAreaProvider>
        // <View style={styles.container}>
        //   <Text>Open up App.js to start working on your app!</Text>
        //   <StatusBar style="auto" />
        // </View>
    )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
