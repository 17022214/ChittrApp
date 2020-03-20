import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';

/* ToDo:
 * 	-View user image
 * 	-show user details on app
 * 	-edit account, patch details to server
 * 	-
 */

class ProfileScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: 0,
			given_name: 'given',
			family_name: 'family',
			email: 'g.family@email.com',
			recent_chits: [],
		};
		let profile_image;
		let id = 7;
		const credentials = {
			token: 'string',
			id: 3, //Temp value, reset to 0 when working - 3 used to test '/user/{id}'
		};
		this.get_details();
	}

	//remove users credentials/logout
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
			this.credentials = {
				token: 'string',
				id: 0,
			}; //resets credentials to a 'blank' object
			this.props.navigation.navigate('Feed', {
				token: 'string',
				id: 0,
			});
		} else {
			console.log('Response code: ' + response.status);
		}
	}
	//retrieve user's information from server
	async get_details() {
		let url = 'http://10.0.2.2:3333/api/v0.0.5/user/'; //Add valid id to end

		try {
			//Add id to end of URL
			url = 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.credentials.id;
		} catch (error) {
			//id 0 forces a 404 error on server
			url = 'http://10.0.2.2:3333/api/v0.0.5/user/0';
		}

		//console.log(url);//Debug
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		}); //Send GET request to server
		if (response.ok) {
			//console.log('Account Details Recieved');//Debug
			const json = await response.json();
			this.setState({
				user_id: json.user_id,
				given_name: json.given_name,
				family_name: json.family_name,
				email: json.email,
				recent_chits: json.recent_chits,
			});
		} else {
			console.log('get_details, Response code: ' + response.status);
		}
	}
	async get_user_photo() {
		const response = await fetch(
			'http://10.0.2.2:3333/api/v0.0.5/user/' + this.credentials.id + '/photo',
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			},
		); //
		if (response.ok) {
			console.log('Image recieved');
		} else {
			console.log('get_user_photo, Response code: ' + response.status);
		}
	}

	async patch_details() {
		//sends all data to server in JSON format
		const response = await fetch(
			'http://10.0.2.2:3333/api/v0.0.5/user/' + this.credentials.id,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'X-Authorization': this.credentials.token,
				},
				body: JSON.stringify(this.state),
			},
		);
		if (response.ok) {
			console.log('Account updated');
			const json = await response.json();
		} else {
			console.log('patch_details, Response code: ' + response.status);
		}
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: 'rgba(0,200,255,0.25)',
					padding: 10,
					justifyContent: 'space-around',
				}}>
				<Text style={{ fontSize: 20, textAlign: 'center' }}>Profile</Text>
				<View>
					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<Image source={this.get_user_photo} />
						<TextInput
							style={{
								fontSize: 18,
								textAlign: 'left',
								paddingRight: 2,
								paddingLeft: 20,
							}}
							editable={this.state.TextInputDisableHolder}
							value={this.state.given_name}
						/>
						<TextInput
							style={{
								fontSize: 18,
								textAlign: 'left',
								paddingRight: 20,
								paddingLeft: 2,
							}}
							editable={this.state.TextInputDisableHolder}
							value={this.state.family_name}
						/>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<TextInput
							style={{ fontSize: 14, textAlign: 'left', paddingBottom: 20 }}
							editable={this.state.TextInputDisableHolder}
							value={this.state.email}
						/>
					</View>
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
								this.patch_details();
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
