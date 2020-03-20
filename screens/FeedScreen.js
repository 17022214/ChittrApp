import React, { Component } from 'react';
import {
	ScrollView,
	RefreshControl,
	Text,
	View,
	Button,
	TextInput,
} from 'react-native';
/* ToDo: 
	-seperate chit response into chits (get_chits)
	-display chits on app
	-get photo for chit and display with chit

	-create a new chit with unique id
	-post new chit info to server (post_chits)
	-add photo to chit post and send to server
	
	-follow
	-unfollow
*/
class FeedScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chit_id: 0,
			timestamp: 0,
			chit_content: 'string', //existing chit content
			refreshing: false,
			new_chit: 'string', //holder for new post content
			location: {
				latitude: 0,
				longitude: 0,
			},
			user: {
				user_id: 0,
				given_name: 'string',
				family_name: 'string',
				email: 'string',
			},
		};
		try {
			//checks params exist in navigation
			let token = this.props.navigation.state.params.token;
			let id = this.props.navigation.state.params.id;
		} catch {
			console.log('No token found');
			const token = 'string';
			const id = 0;
		}
	}
	set_vars() {
		//get props from navigation
		let i = 0;
		try {
			this.setState(user => ({
				email: 'email',
			}));
			this.token = this.props.navigation.state.params.token;
			this.id = this.props.navigation.state.params.id;
		} catch (error) {
			console.log('vars not set');
		}
	}
	async get_chits() {
		// Send GET request to server - get list of chits
		const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			console.log(response);
			const json = await response.json();
			console.log(json);
			try {
				this.setState({
					chit_id: json.chit_id,
					timestamp: json.timestamp,
					chit_content: json.chit_content,
				});
			} catch {
				console.log('error48');
			}
			try {
				this.setState(user => ({
					user_id: json.user_id,
					given_name: json.given_name,
					family_name: json.family_name,
				}));
			} catch {
				console.log('error57');
			}
			try {
				this.setState(location => ({
					latitude: json.latitude,
					longitude: json.longitude,
				}));
			} catch {
				console.log('error65');
			}
			console.log(this.state);
		} else {
			console.log('Response code: ' + response.status);
		}
	}
	async post_chit() {
		//send post request to server - make a new chit
		const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'X-Authorization': token },
			body: JSON.stringify({
				chit_id: this.state.chit_id + 1,
				timestamp: this.state.timestamp,
				chit_content: this.state.new_chit,
				location: {
					latitude: this.state.location.latitude,
					longitude: this.state.location.longitude,
				},
				user: {
					user_id: this.state.user.user_id,
					given_name: this.state.user.given_name,
					family_name: this.state.user.family_name,
					email: this.state.user.email,
				},
			}),
		});
	}
	render() {
		this.set_vars();
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: 'rgba(0,200,255,0.25)',
					padding: 10,
					justifyContent: 'space-evenly',
				}}>
				<Text style={{ fontSize: 20, textAlign: 'center' }}>Recent Chits</Text>
				<Button
					title="Profile"
					color="mediumseagreen"
					onPress={() => {
						//transfers token and id over to profile screen
						this.props.navigation.navigate('Profile', {
							token: this.token,
							id: this.id,
						});
					}}
				/>
				<View>
					<TextInput
						style={{ backgroundColor: 'lightgrey' }}
						value={this.state.chit_body}
						placeholder="Got something to say?"
						underlineColorAndroid="black"
						onChangeText={text => this.setState({ new_chit: text })}
					/>
					<Button
						title="Post"
						color="mediumseagreen"
						onPress={() => {
							this.post_chit();
						}}
					/>
				</View>
				<Button
					title="Refresh"
					color="mediumseagreen"
					onPress={() => {
						this.get_chits();
					}}
				/>
			</View>
		);
	}
}

export default FeedScreen;
