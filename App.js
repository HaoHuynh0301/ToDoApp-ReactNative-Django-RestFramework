import React, { Component } from 'react';
import {
	Keyboard,
	StyleSheet,
	Text,
	View,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	Platform,
	Alert,
	ScrollView
} from 'react-native';
import Task from  "./components/Tasks.js";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			task: "",
			tasks: []
		};
	}

	getTaskFromApi = async () => {
		try {
			fetch('http://192.168.1.2:8000/api/task-list/', {
				method: "GET",
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			})
			.then((response) => response.json())
			.then((data) => {
				for(item in data) {
					this.setState({
						tasks: [...this.state.tasks, data[item]['content']]
					});
				}
			})
		} catch(error) {
			console.log(error);
		}
	}

	handleTextChange = (text) => {
		this.setState({
			task: text
		});
	}

	handleCompleteTask = (index) => {
		fetch("http://192.168.1.2:8000/api/task-detail/" + index + "/", {
			method: "DELETE",
			"Content-Type": "application/json"
		})
		.then((response) => {
			if(response.status === "200") {
				console.log("OK");
			}
		})
		.catch((error) => {console.log(error)});
	}

	handleAddPress = () => {
		fetch("http://192.168.1.2:8000/api/create-task/", {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: this.state.task
			})
		})
		.then((response) => {
			if(response.status === 201) {
				Alert.alert(
					"Alert Title",
					"Create new task successfully!",
					[
					  {
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel"
					  },
					  { text: "OK", onPress: () => console.log("OK Pressed") }
					]
				);
				Keyboard.dismiss();
			}
		})
		.catch((err) => {
			console.log(err);
		})
		this.setState({
			tasks: [...this.state.tasks, this.state.task],
			task: ""
		})
	}

	componentDidMount() {
		this.getTaskFromApi();
	}

	render() {
		return (
			<View style = {styles.container}>
				<View style = {styles.taskWrapper}>
					<Text style = {styles.sectionTitle}>Today's Tasks</Text>
					<ScrollView>
						<View style = {styles.item}>
							{this.state.tasks.map((item, index) => {
								console.log(index);
								return(
									<TouchableOpacity key = {index} onPress = {() => {this.handleCompleteTask(index)}}>
										<Task text = {item}/>
									</TouchableOpacity>	
								);
							})}
					</View>
					</ScrollView>
					
				</View>
				
				<KeyboardAvoidingView
					behavior = {Platform.OS === "ios" ? "padding" : "height"}
					style = {styles.writeWrapper}
				>
					<TextInput 
						style = {styles.input} 
						placeholder = {"Write a new task"} 
						onChangeText = {text => {this.handleTextChange(text);}}
						value = {this.state.task}
					></TextInput>
					<TouchableOpacity onPress = {() => {this.handleAddPress()}}>
						<View style = {styles.addWrapper}>
							<Text style = {styles.addText}>+</Text>
						</View>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ecf2f8"
	},
	taskWrapper: {
		paddingTop: 50,
		paddingLeft: 20,
	},
	sectionTitle: {
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 20
	},
	writeWrapper: {
		flexDirection: "row",
		justifyContent: "space-around",
		position: "absolute",
		alignItems: "center",
		bottom: 60,
		width: "100%"

	}, 
	input: {
		width: 270,
		height: 60,
		backgroundColor: "#FFF",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#C0C0C0",
		paddingHorizontal: 10,
		fontSize: 15
	},
	addWrapper: {
		height: 60,
		width: 60,
		borderRadius: 20,
		borderColor: "#C0C0C0",
		borderWidth: 2,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFF"
	},
	addText: {
		fontSize: 15
	}
});

export default App;
