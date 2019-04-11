import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';

export default class LocationDrawer extends Component {
	state = {
		modalVisible: false,
		locName: "blank"
	};

	//calls whenever the props are changed, we'll want to make some decision here as to what to show in the modal, whether to open it or close it, etc
	componentDidUpdate(oldProps) {//oldProps are what the props were before the change was fired
		//check if the location is different
		if (oldProps.location !== this.props.location) {
			console.log("location has changed");
			//here we'll test whether location is null or not, and if it has gone from null to set, we'll want to open the modal if it isn't already
		}
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	test = () => {
		console.log("HELLO");
		this.state.locName = this.props.locName;
		console.log(this.state.locName);
	}

	render() {
		this.test()
		return (
			<View style={{ marginTop: 22 }}>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}>
					<View style={{ marginTop: 22 }}>
						<View>
							<Text>Hello World!</Text>

							<TouchableHighlight
								onPress={() => {
									this.setModalVisible(!this.state.modalVisible);
								}}>
								<Text>Hide Modal</Text>
							</TouchableHighlight>
						</View>
					</View>
				</Modal>

				<TouchableHighlight
					onPress={() => {
						this.setModalVisible(true);
					}}>
					<Text>Show Modal</Text>
				</TouchableHighlight>
			</View>
		);
	}
}