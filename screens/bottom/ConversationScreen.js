import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, SafeAreaView, StatusBar , Text} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Fire from '../../tools/Fire';
import ProfileListMessage from '../../components/ProfileListMessage';

const myList = [];

const ConversationScreen = ({ navigation }) => {
	const { colors } = useTheme();

	return (
		<View style={styles.container}>
			<Text style={{ color: colors.text }}>Settings Screen</Text>
		</View>
	);
};

export default ConversationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
});
