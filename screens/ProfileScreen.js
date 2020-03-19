import React, { Component } from 'react';
import { Text, View } from 'react-native';

class ProfileScreen extends Component{
	constructor(props){
		super(props);
		this.state={
			token:null,
			
		};
	}
	render(){
		return(
			<View>
				<Text>Profile Screen</Text>
				
			</View>
		);
	}
}

export default ProfileScreen;