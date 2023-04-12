import {
    addDoc,
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
    where,
    getDocs,
    QuerySnapshot,
    DocumentData,
    QueryDocumentSnapshot,
} from 'firebase/firestore'
import { createContext, useLayoutEffect, useState } from 'react'
import { firestore } from '../configs/firebase'

// const COLLECTION_NAME = 'JoaoHedyYazenHealthTestChat'
const COLLECTION_NAME = 'JoaoHedyTestChat'
const RECORDS_PER_FETCH = 25
export interface MessageContentText {
    type: 'text'
    text: string
}

export type MessageContent = MessageContentText

export interface Message {
    id?: string
    content: MessageContent
    author: string
    timestamp: number
}

type ChatContextProviderProps = {
    children: React.ReactNode
}

interface ChatContextDataInterface {
    displayName: string
    messages: Message[]
    setDisplayName: (name: string) => void
    sendMessage: (messageToSend: MessageContent) => void
    getPreviousMessages: () => void
}

export const ChatContext = createContext<ChatContextDataInterface>(
    {} as ChatContextDataInterface,
)

export const ChatContextProvider: React.FC<ChatContextProviderProps> = ({
    children,
}) => {
    const [displayName, setDisplayName] = useState<string>('')
    const [messages, setMessages] = useState<Message[]>([])
    const [fetching, setFetching] = useState<boolean>(false)

    const messageFromSnapshotDocument = (
        doc: QueryDocumentSnapshot<DocumentData>,
    ): Message => {
        return {
            id: doc.id,
            author: doc.data().author as string,
            timestamp: doc.data().timestamp as number,
            content: doc.data().content as MessageContent,
        }
    }

    const addMessages = (messages: Message[], isFuture = true) => {
        console.log('newMessages', messages)
        isFuture
            ? setMessages(existingMessages => [
                  ...messages,
                  ...existingMessages,
              ])
            : setMessages(existingMessages => [
                  ...existingMessages,
                  ...messages,
              ])
    }

    const addSnapshotMessages = (
        arrivingMessages: QuerySnapshot<DocumentData>,
        isFuture = true,
    ) => {
        console.log('arrivingMessages', arrivingMessages.docs.length)
        const newMessages = arrivingMessages.docs.map(
            messageFromSnapshotDocument,
        )
        addMessages(newMessages, isFuture)
    }

    const getPreviousMessages = () => {
        if (!fetching) {
            console.log('[getPreviousMessages] fetching... ')
            setFetching(true)
            const collectionRef = collection(firestore, COLLECTION_NAME)
            const constrains = [
                orderBy('timestamp', 'desc'),
                ...(messages.length
                    ? [
                          where(
                              'timestamp',
                              '<',
                              messages[messages.length - 1].timestamp,
                          ),
                      ]
                    : []),
                limit(RECORDS_PER_FETCH),
            ]
            const q = query(collectionRef, ...constrains)
            getDocs(q).then(snapshot => {
                addSnapshotMessages(snapshot, false)
                setFetching(false)
            })
        }
    }

    useLayoutEffect(() => {
        console.log('[useLayoutEffect Start] fetching...')
        getPreviousMessages()

        // Subscribe to firestore
        const collectionRef = collection(firestore, COLLECTION_NAME)
        const constrains = [
            orderBy('timestamp', 'desc'),
            where('timestamp', '>', Date.now()),
        ]
        const q = query(collectionRef, ...constrains)
        const unsubscribe = onSnapshot(q, snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    console.log('Subscribed sensed new message')
                    addMessages([messageFromSnapshotDocument(change.doc)])
                }
            })
        })

        return () => unsubscribe()
    }, [])

    const sendMessage = (messageToSend: MessageContent) => {
        const message: Message = {
            author: displayName,
            timestamp: Date.now(),
            content: { ...messageToSend },
        }

        // Store Message to firestore
        addDoc(collection(firestore, COLLECTION_NAME), message)
    }

    return (
        <ChatContext.Provider
            value={{
                displayName,
                messages,
                setDisplayName,
                sendMessage,
                getPreviousMessages,
            }}>
            {children}
        </ChatContext.Provider>
    )
}
