import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Avatar, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import IconFeather from 'react-native-vector-icons/Feather';
import Fire from '../tools/Fire';

export function DrawerContent(props) {
	const paperTheme = useTheme();

	const [userValues, setUserValues] = useState({
		user: {
			avatar: null,
			email: '',
			firstname: '',
			name: '',
		},
	});

	React.useEffect(() => {
		const user = Fire.shared.uid;
		Fire.shared.firestore.collection('users').doc(user).onSnapshot(doc => {
			if (doc.data() != undefined) {
				/*this.setState({
                    user: doc.data(),
                    oldAvatar: doc.data().avatar,
                });*/
                setUserValues(prev => ({ ...prev, user: doc.data() }));
			} else {
				alert('Problème utilisateur...');
				this.signOutUser();
			}
		});
	}, []);

	const toggleNotification = () => {
        alert('Pas encore implémenté');
	};

	logout = () => {
		Fire.shared.signOut();
	};

	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						{userValues.user.avatar == null
							? <Avatar.Image source={require('../assets/avatar.png')} size={170} />
							: <Avatar.Image source={{ uri: userValues.user.avatar }} size={170} />}
					</View>

					<Drawer.Section style={styles.drawerContent}>
						<DrawerItem
							icon={({ color, size }) => <IconFeather name="home" color={color} size={size} />}
							label="Accueil"
							onPress={() => {
								props.navigation.navigate('HomeDrawer');
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => <IconFeather name="settings" color={color} size={size} />}
							label="Paramètres"
							onPress={() => {
								props.navigation.navigate('SettingsScreen');
							}}
						/>
					</Drawer.Section>
					<Drawer.Section title="Préférences">
						<TouchableRipple onPress={props.toggleTheme}>
							<View style={styles.preferences}>
								<Text>Thème sombre</Text>
								<View pointerEvents="none">
									<Switch value={paperTheme.dark} />
								</View>
							</View>
						</TouchableRipple>
						<TouchableRipple
							onPress={() => {
								toggleNotification();
							}}
						>
							<View style={styles.preferences}>
								<Text>Notifications</Text>
								<View pointerEvents="none">
									<Switch value={false} />
								</View>
							</View>
						</TouchableRipple>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section>
				<View style={StyleSheet.logoutSection}>
					<DrawerItem
						icon={({ color, size }) => <IconFeather name="log-out" color={color} size={size} />}
						label="Déconnexion"
						onPress={() => {
							logout();
						}}
					/>
				</View>
			</Drawer.Section>
		</View>
	);
}

const styles = StyleSheet.create({
	userInfoSection: {
		alignItems: 'center',
	},
	preferences: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 20,
	},
});
