import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';

class FeedScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				user_id: null,
				given_name: null,
				family_name: null,
				email: null,
			},
			chit_id: 0,
			timestamp: 0,
			chit_content: null,
			location: {
				latitude: 0,
				longitude: 0,
			},
		};
		let token = 'string';
		let id = 0;
	}
	async get_chits() {
		const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			console.log('Logged out');
			const json = response.json();
			this.state.user.setState({
				user_id: json.user_id,
				given_name: json.given_name,
				family_name: json.family_name,
			});
			this.setState({
				chit_id: json.chit_id,
				timestamp: json.timestamp,
				chit_content: json.chit_content,
			});
			this.state.location.setState({
				latitude: json.latitude,
				longitude: json.longitude,
			});
		} else {
			console.log('Response code: ' + response.status);
		}
	}
	async post_chit() {
		const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'X-Authorization': token },
			body: {},
		});
	}
	render() {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: 'rgba(0,200,255,0.25)',
					padding: 10,
				}}>
				<Text style={{ fontSize: 20, textAlign: 'center' }}>Recent Chits</Text>
				<Text></Text>
				<Button
					title="Profile"
					color="mediumseagreen"
					onPress={() => {
						this.props.navigation.navigate('Profile', {
							token: this.token,
							id: this.id,
						});
					}}
				/>
				<TextInput
					style={{ backgroundColor: 'lightgrey' }}
					value={this.state.chit_body}
					onChangeText={text => this.setState({ chit_body: text })}
				/>
				<Button
					title="Post"
					color="mediumseagreen"
					onPress={() => {
						this.post_chit();
					}}
				/>
			</View>
		);
	}
}

export default FeedScreen;
