import React from 'react';
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

import ProfileListItem from '../../components/ProfileListItem'

const myList = [];

export default class AddScreen extends React.Component {
	state = {
		value: '',
		data: myList,
		loading: false,
	};


	search = async text => {
		this.setState({
			value: text,
		});
		if(text == ""){
			this.setState({
				data: myList,
			});
		}else{
			Fire.shared.searchUserByName(text).then(res => {
				this.setState({
					data: res,
				});
			});
		}
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.containerInput}>
					<TextInput
						style={styles.input}
						value={this.state.value}
						placeholder="Rechercher quelqu'un..."
						onChangeText={text => this.search(text)}
					/>
				</View>
				<FlatList
					keyExtractor={(item, index) => `${index}`}
					extraData={this.state}
					data={this.state.data}
                    showsVerticalScrollIndicator={false}
					renderItem={({ item }) =>
						<ProfileListItem
							uid={item.uid}
							name={item.name}
							firstname={item.firstname}
							avatar={item.avatar}
						/>}
				/>
			</SafeAreaView>
		);
	}
}

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
        paddingLeft: 20
	},
	containerInput: {
		width: '100%',
		backgroundColor: '#c9c9ff',
	},
});
