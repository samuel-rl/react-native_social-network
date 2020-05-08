import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import MainTabScreen from './screens/MainTabScreen';

import { DrawerContent } from './screens/DrawerContent';
import SettingsScreen from './screens/drawer/SettingsScreen';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/login/LoginScreen';

import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import {
	DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme,
	Provider as PaperProvider,
} from 'react-native-paper';

export default function App() {
	const [isAuthed, setIsAuthed] = React.useState(false);

	const CombinedDefaultTheme = {
		...PaperDefaultTheme,
		...NavigationDefaultTheme,
	};
	const CombinedDarkTheme = { ...PaperDarkTheme, ...NavigationDarkTheme };

	const [isDarkTheme, setIsDarkTheme] = React.useState(false);

	const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme; // Use Light/Dark theme based on a state

	function toggleTheme() {
		// We will pass this function to Drawer and invoke it on theme switch press
		setIsDarkTheme(isDark => !isDark);
	}

	const Drawer = createDrawerNavigator();

	const SettingsStack = createStackNavigator();

	const SettingsStackScreen = ({ navigation }) =>
		<SettingsStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#FF6F69',
				},
				headerTintColor: '#fff',
			}}
		>
			<SettingsStack.Screen
				name="Home"
				component={SettingsScreen}
				options={{
					title: 'Paramètres',
					headerLeft: () =>
						<Icon.Button
							name="ios-menu"
							size={25}
							backgroundColor="#FF6F69"
							onPress={() => navigation.openDrawer()}
						/>,
				}}
			/>
		</SettingsStack.Navigator>;

	const defineRoutes = () => {
		if (isAuthed === null) {
			return (<SplashScreen></SplashScreen>);
		} else if(isAuthed === false){
            return (<LoginScreen></LoginScreen>)
        }
		return (
			<React.Fragment>
				<Drawer.Navigator drawerContent={props => <DrawerContent {...props} toggleTheme={toggleTheme} />}>
					<Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
					<Drawer.Screen name="SettingsScreen" component={SettingsStackScreen} />
				</Drawer.Navigator>
			</React.Fragment>
		);
	};

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer theme={theme}>
                {defineRoutes()}
			</NavigationContainer>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({});
