import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Avatar } from 'react-native-paper';
import Fire from '../tools/Fire';

class ProfileListMessage extends Component {

	test = () => {
		this.props.navigation.push('Conversation')
	}

	render() {
		return (
			<TouchableOpacity style={styles.container}
			onPress={this.test}>
				<View style={styles.avatar}>
					<Avatar.Image
						source={this.props.avatar ? { uri: this.props.avatar } : require('../assets/avatar.png')}
						size={50}
					/>
				</View>
				<View style={styles.containerDescription}>
					<Text style={styles.name}>
						{this.props.firstname + ' ' + this.props.name}
					</Text>
					<Text style={styles.message}>exemple de message</Text>
				</View>
				<View
					style={{
						backgroundColor: "#452263",
						width: '80%',
						height: 1,
						position: 'absolute',
						bottom: 0,
                        marginLeft: "10%",
                        marginRight: "10%",
					}}
				/>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		marginVertical: 10,
	},
	avatar: {
        marginLeft: 20,
		alignSelf: 'center',
	},
	containerDescription: {
		flex: 2,
		height: 100,
	},
	name: {
		paddingLeft: 30,
		fontSize: 18,
	},
	message: {
		paddingTop: 10,
		alignSelf: 'center',
		color: '#828f89',
	},
});

export default ProfileListMessage;
