import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

class SearchScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
		};
		let token = null;
		let id = 0;
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
				<Text style={{ fontSize: 20, textAlign: 'center' }}>Search Users</Text>
				<TextInput
					style={{ backgroundColor: 'lightgrey' }}
					placeholder="Enter Your Userame"
					underlineColorAndroid="transparent"
					//					value={this.state.user}
					onChangeText={text => this.setState({ user: text })}
				/>
				<Button
					title="Search"
					color="mediumturquoise"
					onPress={() => {
						this.search(this.state.user);
					}}
				/>
			</View>
		);
	}
}

export default SearchScreen;
