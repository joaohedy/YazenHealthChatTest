import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export const Button = ({ label = 'Act', disabled = false, onPress, style = null }) => {
    return (
        <TouchableOpacity
            style={[localStyle.container, disabled ? localStyle.containerDisabled : null, style]}
            onPress={onPress}
            disabled={disabled}>
            <Text style={localStyle.text}>{label}</Text>
        </TouchableOpacity>
    )
}

const localStyle = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#ff581d',
        // width: '90%',
        alignItems: 'center',
    },
    containerDisabled: {
        opacity: 0.5,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
})
