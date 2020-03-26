import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
	const [year, setYear] = useState('');
	const [month, setMonth] = useState('0');
	const [selected, setSelected] = useState(new Date());
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		setShow(false);
		setYear('');
		setMonth('');
		if (selectedDate) {
			setSelected(selectedDate);
		}
	};

	useEffect(() => {
		calculateAge();
	}, [selected]);

	const calculateAge = () => {
		var today = new Date();
		var birthDate = new Date(selected);
		var local_age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();

		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			local_age--;
		}
		setYear(local_age);

		if (m) {
			if (m > 0) {
				setMonth(m);
			} else {
				setMonth(12 + m);
			}
		} else {
			setMonth(0);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.yearWrapper}>
				<Text style={styles.age}>{year}y</Text>
			</View>
			<View style={styles.monthWrapper}>
				<Text style={styles.age}>{month}m</Text>
			</View>
			<View style={styles.buttonWrapper}>
				<Button
					color="#273c75"
					onPress={() => setShow(true)}
					title="Select Date"
				/>
			</View>
			{show && (
				<DateTimePicker
					maximumDate={new Date()}
					value={new Date()}
					mode={'date'}
					display="default"
					onChange={onChange}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 50,
		flex: 1,
		justifyContent: 'space-between',
	},
	buttonWrapper: {
		padding: 20,
	},
	yearWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	monthWrapper: {
		flex: 1,
		alignItems: 'center',
	},
	age: {
		color: '#2c3e50',
		fontSize: 100,
	},
});

export default App;
