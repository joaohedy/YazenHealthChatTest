import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { screenStyles } from './styles/general'
import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ChatContext } from '../contexts/ChatContextProvider'
import { Button } from '../components/common/Button'

export const Home = () => {
    const { displayName, setDisplayName } = useContext(ChatContext)
    const navigation = useNavigation()

    const useNamePressed = () => {
        Keyboard.dismiss()
        navigation.navigate('Chat' as never)
    }

    return (
        <SafeAreaView style={screenStyles.fullyCentered}>
            <KeyboardAvoidingView
                style={[screenStyles.fullyCentered]}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View
                    style={[screenStyles.verticallyCentered, { width: '90%' }]}>
                    <Text style={style.nameFieldLabel}>Display name</Text>
                    <TextInput
                        placeholder="Your display name"
                        style={style.nameField}
                        value={displayName}
                        onChangeText={setDisplayName}
                    />
                </View>
                <Button
                    label={'Chat!'}
                    onPress={useNamePressed}
                    disabled={displayName.length < 3}
                    style={{ width: '90%' }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    nameFieldLabel: {
        fontSize: 30,
        fontWeight: '700',
        paddingVertical: 20,
    },
    nameField: {
        fontSize: 20,
        backgroundColor: '#efefef',
        padding: 20,
        width: '100%',
        borderRadius: 10,
    },
})
