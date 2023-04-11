import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const MessageBubble = ({ message, side, moment, author }) => {
    const isLeftSide = side === 'left'

    const containerStyles = isLeftSide
        ? styles.container
        : flattenedStyles.container
    const textContainerStyles = isLeftSide
        ? styles.textContainer
        : flattenedStyles.textContainer
    const textStyles = isLeftSide
        ? flattenedStyles.leftText
        : flattenedStyles.rightText

    return (
        <View style={containerStyles}>
            <View style={textContainerStyles}>
                <Text style={[textStyles, styles.author]}>{author}</Text>
                <Text style={textStyles}>{message}</Text>
                <Text style={[textStyles, styles.time]}>
                    {(moment as Date).toLocaleTimeString()}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textContainer: {
        width: '50%',
        backgroundColor: '#fee6de',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginLeft: 10,
    },
    rightContainer: {
        justifyContent: 'flex-end',
    },
    rightTextContainer: {
        backgroundColor: '#faeccd',
        marginRight: 10,
    },
    leftText: {
        textAlign: 'left',
    },
    rightText: {
        textAlign: 'right',
    },
    text: {
        fontSize: 14,
    },
    time: {
        fontSize: 9,
        color: '#777',
    },
    author: {
        fontSize: 13,
        color: '#444',
        fontStyle: 'italic',
    },
})

const flattenedStyles = {
    container: StyleSheet.flatten([styles.container, styles.rightContainer]),
    textContainer: StyleSheet.flatten([
        styles.textContainer,
        styles.rightTextContainer,
    ]),
    leftText: StyleSheet.flatten([styles.leftText, styles.text]),
    rightText: StyleSheet.flatten([styles.rightText, styles.text]),
}
