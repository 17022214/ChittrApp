import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: null,
		};
	}
	render() {
		return (
			<View style={{ padding: 10 }}>
				<Text>Home Screen</Text>
				<Button
					title="Login"
					color="mediumspringgreen"
					onPress={() =>
						this.props.navigation.navigate('Login', { new_user: false })
					}
				/>
				<View style={{ padding: 5 }} />
				<Button
					title="Create Account"
					color="mediumturquoise"
					onPress={() =>
						this.props.navigation.navigate('Login', { new_user: true })
					}
				/>
			</View>
		);
	}
}

export default HomeScreen;
