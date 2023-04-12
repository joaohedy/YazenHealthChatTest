import React, { useCallback, useState } from 'react'
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native'
import { Button } from './common/Button'

export type MessageInputProps = {
    buttonText?: string
    placeholder?: string
    onSendMessage?: (messageText: string) => void
} & TextInputProps

export const MessageInput = ({
    buttonText,
    placeholder,
    onSendMessage,
}: MessageInputProps) => {
    const [message, setMessage] = useState('')

    const handlePress = useCallback(() => {
        if (onSendMessage) {
            onSendMessage(message)
            setMessage('')
        }
    }, [message])

    return (
        <View style={messageInputStyle.container}>
            <View style={messageInputStyle.inputContainer}>
                <TextInput
                    style={messageInputStyle.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder={placeholder || 'Your message'}
                />
            </View>

            <Button label={'Send'} onPress={handlePress} />
        </View>
    )
}

const messageInputStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#efefef',
        width: '90%',
        marginTop: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
    },
    inputContainer: {
        width: '70%',
    },
    input: {
        height: 40,
        backgroundColor: '#efefef',
        borderRadius: 5,
        flexDirection: 'row',
        paddingHorizontal: 10,
        fontSize: 18,
    },
})
