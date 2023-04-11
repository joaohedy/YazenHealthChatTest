import { StyleSheet, Text, TouchableOpacity } from "react-native"

export const Button = ({disabled, onPress}) => {
    return (
        <TouchableOpacity
            style={[style.container, disabled ? style.containerDisabled : null]}
            onPress={onPress}
            disabled={disabled}>
            <Text
                style={style.text}>
                Chat!
            </Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#ff581d',
        width: '90%',
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