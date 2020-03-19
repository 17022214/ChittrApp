import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';

class ProfileScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: null,
			given_name: null,
			family_name: null,
			email: null,
			recent_chits: [],
		};
		let profile_image;
		const credentials = {
			token: 'string',
			id: 7,
		};
		this.get_details(this.id);
	}
	async logout() {
		const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Authorization': this.credentials.token,
			},
		});
		if (response.ok) {
			console.log('Logged out');
		} else {
			console.log('Response code: ' + response.status);
		}
	}

	async get_details(props) {
		let url = 'http://10.0.2.2:3333/api/v0.0.5/user/8';
		console.log(url);
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			console.log('Logged out');
			const json = await response.json();
			this.setState({ user_id: json.user_id });
		} else {
			console.log('Response code: ' + response.status);
		}
	}
	async get_user_photo() {
		const response = await fetch(
			'http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/photo',
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			},
		);
		if (response.ok) {
			console.log('Logged out');
		} else {
			console.log('Response code: ' + response.status);
		}
	}

	async post_details() {
		const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			console.log('Logged out');
			const json = response.json();
		} else {
			console.log('Response code: ' + response.status);
		}
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: 'rgba(0,200,255,0.25)',
					padding: 10,
				}}>
				<View>
					<Text style={{ fontSize: 20, textAlign: 'center' }}>Profile</Text>
					<Image source={this.get_user_photo} />
				</View>
				<View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
					<View
						style={{
							flexDirection: 'row',
							padding: 10,
							justifyContent: 'center',
						}}>
						<Button
							title="Go to feed"
							color="mediumseagreen"
							onPress={() => {
								this.props.navigation.navigate('Feed', {
									token: this.token,
									id: this.id,
								});
							}}
						/>
						<View style={{ padding: 5 }}></View>
						<Button
							title="Edit Account"
							color="mediumturquoise"
							onPress={() => {
								this.edit();
							}}
						/>
						<View style={{ padding: 5 }}></View>
						<Button
							title="Logout"
							color="red"
							onPress={() => {
								this.logout();
							}}
						/>
					</View>
				</View>
			</View>
		);
	}
}

export default ProfileScreen;
