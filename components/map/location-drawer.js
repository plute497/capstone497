import React, { Component } from 'react';
import { Modal,
	Text,
	TouchableHighlight, 
	View,
	StyleSheet,
	Alert
} from 'react-native';

const styles = StyleSheet.create ({
	pullDrawer: {
		bottom: 0,
		margin: 20
	},
	pullText: {
		fontSize: 20,
		alignSelf: 'center'
	},
	hideText: {
		fontSize: 20
	},
	title: {
		fontSize: 30,
		alignSelf: 'center'
	},
	fullDrawer: {
		marginTop: 50
	}
})

export default class LocationDrawer extends Component {
	state = {
		modalVisible: false,
	}

	//calls whenever the props are changed, we'll want to make some decision here as to what to show in the modal, whether to open it or close it, etc
	/*componentDidUpdate(oldProps) {//oldProps are what the props were before the change was fired
		//check if the location is different
		if (oldProps.location !== this.props.location) {
			console.log("location has changed");
			console.log(this.props.location);
			//here we'll test whether location is null or not, and if it has gone from null to set, we'll want to open the modal if it isn't already
		}
	}*/


	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	toggleButton = () => {
		if(this.props.location) {
			return (
				<View
					visible={this.state.drawerVisible}
				>
					<TouchableHighlight 
						style={styles.pullDrawer}
						onPress={() => {
							this.setModalVisible(!this.state.modalVisible);
					}}>
						<Text style={styles.pullText}>{this.props.location.name}</Text>
					</TouchableHighlight>
				</View>
			)
		} else {
			return null;
		}
	}

	drawerTitle = () => {
		return(
			<Text style={styles.title}>
				{this.props.location.name}
			</Text>
		)
	}

	render() {
		return (
			<View>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}>
					<View style={styles.fullDrawer}>
						<TouchableHighlight
							onPress={() => {
								this.setModalVisible(!this.state.modalVisible);
							}}>
							<Text style={styles.hideText}>Hide Modal</Text>
						</TouchableHighlight>
						{this.drawerTitle()}

					</View>
				</Modal>

				{this.toggleButton()}

			</View>
		);
	}
}