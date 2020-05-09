import React from "react";
import { View, Text, StyleSheet, TextInput} from "react-native";
import { useTheme } from "@react-navigation/native";


const HomeScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
