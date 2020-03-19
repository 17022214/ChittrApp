import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';

const AppTabNav = createBottomTabNavigator({
	Home: { screen: HomeScreen },
	Login: { screen: LoginScreen },
	Feed: { screen: FeedScreen },
	Profile: { screen: ProfileScreen },
	Search: { screen: SearchScreen },
});
const AppContainer = createAppContainer(AppTabNav);

export default AppContainer;
