import React, { Component } from 'react';
import { Text, View } from 'react-native';

class SearchScreen extends Component {
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
					flex: 1,
					backgroundColor: 'rgba(0,200,255,0.25)',
					padding: 10,
				}}>
				<Text>Search Screen</Text>
			</View>
		);
	}
}

export default SearchScreen;
