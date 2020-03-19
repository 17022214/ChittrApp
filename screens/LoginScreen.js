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
		};
		let new_user = false;
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
		if (response.ok) {
			console.log('Success');
			try {
				const json = await response.json();
				console.log(json);
				ToastAndroid.show('Welcome back', ToastAndroid.SHORT);
				try {
					this.props.navigation.navigate('Feed', {
						token: json.token,
						id: json.id,
					});
				} catch (error) {
					console.error(error);
				}
			} catch (error) {
				console.log('Invalid JSON');
			}
		} else {
			console.log('Response code: ' + response.status);
			ToastAndroid.show('Login Attempt Failed', ToastAndroid.SHORT);
		} //500 - Internal Server Error
	}

	//Checks that a variable exists and error corrects
	set_var() {
		const params = this.props.navigation.state.params;
		try {
			//console.log('New user? ' + params.new_user);
			if (this.state.new_user != params.new_user) {
				this.new_user = params.new_user;
			}
			return this.new_user;
		} catch {
			console.log('variable not ready');
			//this.props.navigation.navigate('Login', { new_user: false }); //Re-load screen with variable
		}
	}

	render() {
		if (this.set_var()) {
			// Show 'Create account' page - new user
			return (
				<View
					style={{
						flex: 1,
						padding: 10,
						backgroundColor: 'rgba(0,200,255,0.25)',
					}}>
					<Text style={{ fontSize: 20 }}>Create a new account</Text>
					<Text style={{ fontSize: 16 }}>Given name</Text>
					<TextInput
						style={{ backgroundColor: 'lightgrey' }}
						value={this.state.given_name}
						onChangeText={text => this.setState({ given_name: text })}
					/>
					<Text style={{ fontSize: 16 }}>Family name</Text>
					<TextInput
						style={{ backgroundColor: 'lightgrey' }}
						value={this.state.family_name}
						onChangeText={text => this.setState({ family_name: text })}
					/>
					<Text style={{ fontSize: 16 }}>Email address</Text>
					<TextInput
						style={{ backgroundColor: 'lightgrey' }}
						value={this.state.email}
						onChangeText={text => this.setState({ email: text })}
					/>
					<Text style={{ fontSize: 16 }}>Password</Text>
					<TextInput
						style={{ backgroundColor: 'lightgrey', marginBottom: 10 }}
						value={this.state.password}
						onChangeText={text => this.setState({ password: text })}
						secureTextEntry
					/>
					<Button
						title="Submit"
						color="mediumseagreen"
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
				<View
					style={{
						flex: 1,
						padding: 10,
						backgroundColor: 'rgba(0,200,255,0.25)',
					}}>
					<Text style={{ fontSize: 20, textAlign: 'center' }}>
						Login Screen
					</Text>
					<Text
						style={{
							fontSize: 18,
							paddingTop: 3,
							paddingBottom: 3,
							textAlign: 'center',
						}}>
						Input your account details
					</Text>
					<Text style={{ fontSize: 16 }}>Email Address</Text>
					<TextInput
						style={{ backgroundColor: 'lightgrey' }}
						value={this.state.email}
						onChangeText={text => this.setState({ email: text })}
					/>
					<Text style={{ fontSize: 16 }}>Password</Text>
					<TextInput
						style={{ backgroundColor: 'lightgrey', marginBottom: 10 }}
						value={this.state.password}
						onChangeText={text => this.setState({ password: text })}
						secureTextEntry
					/>
					<Button
						title="Submit"
						color="mediumseagreen"
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
