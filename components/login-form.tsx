import { StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "./themed-text";


export default function LoginForm() {
    return (
        <View style={{ padding: 20 }}>
            <ThemedText style={s.loginForm}>Logga in eller registrera dig</ThemedText>
            <TextInput style={s.textinput} placeholder="Användarnamn" />
            <TextInput style={s.textinput} placeholder="Lösenord" secureTextEntry />
        </View>
    );
}

const s = StyleSheet.create({
    loginForm: {
        fontSize: 28,
        lineHeight: 34,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
    textinput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    }
});
