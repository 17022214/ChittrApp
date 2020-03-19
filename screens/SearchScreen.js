import React, { Component } from 'react';
import { Text, View } from 'react-native';

class SearchScreen extends Component{
	constructor(props){
		super(props);
		this.state={
			token:null,
			
		};
	}
	render(){
		return(
			<View>
				<Text>Search Screen</Text>
				
			</View>
		);
	}
}

export default SearchScreen;