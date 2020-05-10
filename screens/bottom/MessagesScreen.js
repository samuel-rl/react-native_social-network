import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	LayoutAnimation,
	TextInput,
	ScrollView,
	FlatList,
	Platform,
	SafeAreaView,
	StatusBar,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Fire from "../../tools/Fire"
import ProfileListMessage from '../../components/ProfileListMessage';

const myList = [];

const MessagesScreen = () => {
	const { colors } = useTheme();

	const [follows, setFollows] = useState(myList);
	const [search, setSearch] = useState('');

	React.useEffect(() => {
		const user = Fire.shared.uid;
		Fire.shared.getFollow(Fire.shared.uid).then((res) => {
			setFollows(res)
		})
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.containerInput}>
				<TextInput
					style={styles.input}
					value={search}
					placeholder="Rechercher quelqu'un..."
					onChangeText={text => {
						setSearch(text);
					}}
				/>
			</View>
			<FlatList
				keyExtractor={(item, index) => `${index}`}
				data={follows}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) =>
					<ProfileListMessage uid={item.uid} name={item.name} firstname={item.firstname} avatar={item.avatar} />}
			/>
		</SafeAreaView>
	);
};

export default MessagesScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	input: {
		backgroundColor: '#fff',
		marginTop: 20,
		marginBottom: 20,
		marginLeft: 30,
		marginRight: 30,
		height: 40,
		borderRadius: 3,
		borderColor: 'gray',
		paddingLeft: 20,
	},
	containerInput: {
		width: '100%',
		backgroundColor: '#f1cbff',
	},
});
