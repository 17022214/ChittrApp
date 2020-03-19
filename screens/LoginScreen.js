import React, { Component } from 'react';
import { Text, View, TextInput, Button, ToastAndroid } from 'react-native';

class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: null,
			given_name: null,
			family_name: null,
			new_user: false,
		};
		if (this.props.navigation.state.params.new_user !== undefined) {
			this.props.navigation.navigate('Login', { new_user: false });
		}
	}

	//POST new user's data to server
	async post_new_user(props) {
		console.log('Creating new account with: ' + this.state);
		const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state),
		});

		if (response.ok) {
			console.log('Success');
			ToastAndroid.show('Account Created Successfully', ToastAndroid.SHORT);
			this.props.navigation.navigate('Login', { new_user: false });
		} //200 - Okay
		else {
			console.log('Response code: ' + response.status);
		} //400 - Bad request, 404 - Not found
		ToastAndroid.show('Account Creation Failed', ToastAndroid.SHORT);
	}

	//POST login details
	async post_login() {
		console.log('logging in...');
		const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
			}),
		});
		try {
			const json = await response.json();
			console.log(json);
		} catch {
			console.log('Invalid JSON');
		}

		if (response.ok) {
			console.log('Success');
			ToastAndroid.show('Welcome back', ToastAndroid.SHORT);
			this.props.navigation.navigate('Feed', { token: json.token });
		} else {
			console.log('Response code: ' + response.status);
		} //500 - Internal Server Error
		ToastAndroid.show('Login Attempt Failed', ToastAndroid.SHORT);
	}

	render() {
		console.log('New user? ' + this.props.navigation.state.params.new_user);
		if (this.props.navigation.state.params.new_user) {
			// Show 'Create account' page - new user
			return (
				<View style={{ padding: 10 }}>
					<Text>Create a new account</Text>
					<Text>Given name</Text>
					<TextInput
						value={this.state.given_name}
						onChangeText={text => this.setState({ given_name: text })}
					/>
					<Text>Family name</Text>
					<TextInput
						value={this.state.family_name}
						onChangeText={text => this.setState({ family_name: text })}
					/>
					<Text>Email address</Text>
					<TextInput
						value={this.state.email}
						onChangeText={text => this.setState({ email: text })}
					/>
					<Text>Password</Text>
					<TextInput
						value={this.state.password}
						onChangeText={text => this.setState({ password: text })}
						secureTextEntry
					/>
					<Button
						title="Submit"
						color="mediumspringgreen"
						onPress={() => this.post_new_user()}
					/>
					<View style={{ padding: 5 }} />
					<Button
						title="Already have an account? Login here"
						color="mediumturquoise"
						onPress={() => {
							this.props.navigation.navigate('Login', { new_user: false });
						}}
					/>
				</View>
			);
		} else {
			// Show login page - existing user
			return (
				<View style={{ padding: 10 }}>
					<Text>Login Screen</Text>
					<Text>Input your account details</Text>
					<Text>Email Address</Text>
					<TextInput
						value={this.state.email}
						onChangeText={text => this.setState({ email: text })}
					/>
					<Text>Password</Text>
					<TextInput
						value={this.state.password}
						onChangeText={text => this.setState({ password: text })}
						secureTextEntry
					/>
					<Button
						title="Submit"
						color="mediumspringgreen"
						onPress={() => this.post_login()}
					/>
					<View style={{ padding: 5 }} />
					<Button
						title="New User? Click here to create an account"
						color="mediumturquoise"
						onPress={() => {
							this.props.navigation.navigate('Login', { new_user: true });
						}}
					/>
				</View>
			);
		}
	}
}

export default LoginScreen;
