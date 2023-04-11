import {
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    View,
    FlatList,
    Keyboard,
} from 'react-native'
import { screenStyles } from './styles/general'
import { useContext, useEffect } from 'react'
import { ChatContext, Message } from '../contexts/ChatContextProvider'
import { MessageInput } from '../components/MessageInput'
import { MessageBubble } from '../components/MessageBubble'

export const Chat = () => {
    const { displayName, messages, sendMessage, getPreviousMessages } =
        useContext(ChatContext)

    useEffect(() => {
        Keyboard.dismiss()
    }, [])

    const onSendMessage = (messageText: string) => {
        sendMessage({
            type: 'text',
            text: messageText,
        })
    }

    const _renderItem = ({ item }: { item: Message }) => {
        return (
            <MessageBubble
                key={`${item.id}|${item.timestamp}`}
                author={item.author}
                side={item.author === displayName ? 'right' : 'left'}
                message={item.content.text}
                moment={new Date(item.timestamp)}
            />
        )
    }

    return (
        <SafeAreaView style={screenStyles.fullyCentered}>
            <KeyboardAvoidingView
                style={screenStyles.fullyCentered}
                keyboardVerticalOffset={90}
                behavior="position">
                <FlatList
                    data={messages}
                    renderItem={_renderItem}
                    onEndReached={() => getPreviousMessages()}
                    inverted>
                    <Text>Chat</Text>
                </FlatList>
                <View style={{alignItems: 'center'}}>
                <MessageInput onSendMessage={onSendMessage} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
