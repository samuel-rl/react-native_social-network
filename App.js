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
import RegisterScreen from './screens/login/RegisterScreen';

import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import {
	DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme,
	Provider as PaperProvider,
} from 'react-native-paper';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Fire from './tools/Fire';

export default function App() {
    const [isAuthed, setIsAuthed] = React.useState(null);
    toggleAuth = (res) => {
        setIsAuthed(res)
    }

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




    const LoginStack = createStackNavigator();
    const LoginStackScreen = () =>
            <LoginStack.Navigator
                initialRouteName="Login"
                headerMode="none"
            >
                <LoginStack.Screen
                    name="Login"
                    component={LoginScreen}
                />
                <LoginStack.Screen
                    name="Register"
                    component={RegisterScreen}
                />
            </LoginStack.Navigator>;


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
        const Drawer = createDrawerNavigator();
		if (isAuthed === null) {
			return (<SplashScreen toggleAuth={this.toggleAuth}></SplashScreen>);
        } 
        if(isAuthed === false){
            return (<LoginStackScreen></LoginStackScreen>)
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
