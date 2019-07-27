import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

const colorMap = {};

class Drag extends Component {
	state = {
		data: Array.from(Array(200), (_, i) => {
			colorMap[i] = getRandomColor();
			return i;
		})
	};
	render() {
		const { data } = this.state;
		return (
			<View style={styles.root}>
				<FlatList
					style={{ width: '100%' }}
					data={data}
					renderItem={({ item }) => '' + item}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default Drag;
