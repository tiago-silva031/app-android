import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, TouchableOpacity } from "react-native";
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons'; // Importando o ícone de olho

export function PasswordItem({ data, removePassword }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [longPressTimeout, setLongPressTimeout] = useState(null);

    const handlePress = () => {
        // Se o temporizador de longo pressionar estiver ativo, limpa-o
        if (longPressTimeout) {
            clearTimeout(longPressTimeout);
            setLongPressTimeout(null);
        }
        // Copia a senha para a área de transferência
        Clipboard.setString(data);
        // Exibe uma mensagem de confirmação
        Alert.alert('Senha copiada!', 'A senha foi copiada para a área de transferência.');
    };

    const handleLongPress = () => {
        // Se o temporizador de curto pressionar estiver ativo, limpa-o
        if (longPressTimeout) {
            clearTimeout(longPressTimeout);
            setLongPressTimeout(null);
        }
        // Remove a senha
        removePassword();
    };

    const handlePressIn = () => {
        // Configura o temporizador para detectar longo pressionar
        const timeout = setTimeout(() => {
            handleLongPress();
        }, 1212); // Tempo para considerar como longo pressionar (1212 ms por exemplo)
        setLongPressTimeout(timeout);
    };

    const handlePressOut = () => {
        // Limpa o temporizador se o usuário soltar antes do tempo
        if (longPressTimeout) {
            clearTimeout(longPressTimeout);
            setLongPressTimeout(null);
        }
    };

    return (
        <View style={styles.container}>
            <Pressable 
                onPress={handlePress} 
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.passwordContainer}
            >
                <Text style={styles.text}>
                    {isPasswordVisible ? data : '*'.repeat(data.length)}
                </Text>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    <Ionicons
                        name={isPasswordVisible ? "eye-off" : "eye"}
                        size={24}
                        color="#FFF"
                    />
                </TouchableOpacity>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0e0e0e",
        padding: 14,
        width: "100%",
        marginBottom: 14,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    text: {
        color: "#FFF",
        flex: 1,
        fontSize: 16
    },
    icon: {
        marginLeft: 10
    }
});
