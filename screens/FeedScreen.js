import React, { Component } from 'react';
import { Text, View } from 'react-native';

class FeedScreen extends Component{
	constructor(props){
		super(props);
		this.state={
			token:null,
			user:{
				user_id:null,
				given_name: null,
				family_name: null,
				email: null
			},
			chit_id:0,
			timestamp:0,
			chit_content:null,
			location:{
				latitude:0,
				longitude:0
			}
		};
	}
	async get_chits(){
		const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/chits',{
			method:'GET',
			headers:{'Content-Type': 'application/json'}
		});
	}
	async post_chits(){
		const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/chits',{
			method:'POST',
			headers:{'Content-Type': 'application/json','X-Authorization':token},
			body:{
				
			}
		});
	}
	render(){
		return(
			<View>
				<Text>Recent Chits</Text>
				
			</View>
		);
	}
}

export default FeedScreen;