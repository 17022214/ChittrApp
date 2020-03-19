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
			<View
				style={{
					padding: 10,
					justifyContent: 'center',
					flex: 1,
					backgroundColor: 'rgba(0,200,255,0.25)',
				}}>
				<Text style={{ fontSize: 26, textAlign: 'center', padding: 25 }}>
					Please login or {'\n'} create an account
				</Text>
				<Button
					title="Login"
					color="mediumseagreen"
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
