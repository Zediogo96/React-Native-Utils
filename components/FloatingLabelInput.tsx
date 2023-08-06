import React, { useState, useRef } from "react";
import { Animated, Easing, TextInput, StyleSheet } from "react-native";

interface FloatingTextInputProps {
	label?: string;
	value: string;
	titleActiveSize?: number;
	titleInActiveSize?: number;
	titleActiveColor?: string;
	titleInactiveColor?: string;
	width: number;
	height: number;
	textStyle?: object;
	inputStyle?: object;
	style?: object;
	hidden?: boolean;
	handleTextChange?: (text: string) => void;
}

const FloatingLabelInput: React.FC<FloatingTextInputProps> = ({
	label = "Default Label",
	value,
	titleActiveSize = 11.5,
	titleInActiveSize = 15,
	titleActiveColor = "rgb(251,91,9)",
	titleInactiveColor = "white",
	width,
	height,
	textStyle = {},
	inputStyle = {},
	style = {},
	hidden = false,
	handleTextChange = () => {},
}) => {
	const animatedValue = useRef(new Animated.Value(0));

	const returnAnimatedTitleStyles = {
		transform: [
			{
				translateY: animatedValue?.current?.interpolate({
					inputRange: [0, 1],
					outputRange: [22, -4],
					extrapolate: "clamp",
				}),
			},
		],
		fontSize: animatedValue?.current?.interpolate({
			inputRange: [0, 1],
			// ERROR HERE
			outputRange: [titleInActiveSize, titleActiveSize],
			extrapolate: "clamp",
		}),
		color: animatedValue?.current?.interpolate({
			inputRange: [0, 1],
			outputRange: [titleInactiveColor, titleActiveColor],
		}),
	};

	const viewStyles = {
		borderBottomColor: animatedValue?.current?.interpolate({
			inputRange: [0, 1],
			outputRange: [titleInactiveColor, titleActiveColor],
		}),
		borderBottomWidth: 0.8,
		width: width,
		height: height,
	};
	const onFocus = () => {
		Animated.timing(animatedValue?.current, {
			toValue: 1,
			duration: 500,
			easing: Easing.bezier(0.4, 0.0, 0.2, 1),
			useNativeDriver: false,
		}).start();
	};

	const onBlur = () => {
		if (!value) {
			Animated.timing(animatedValue?.current, {
				toValue: 0,
				duration: 500,
				easing: Easing.bezier(0.4, 0.0, 0.2, 1),
				useNativeDriver: false,
			}).start();
		}
	};

	return (
		<Animated.View style={[styles.subContainer, viewStyles]}>
			<Animated.Text style={[returnAnimatedTitleStyles, textStyle]}>
				{label}
			</Animated.Text>
			<TextInput
				value={value}
				style={[styles.textStyle, inputStyle]}
				onBlur={onBlur}
				onFocus={onFocus}
				secureTextEntry={hidden}
				onChangeText={(text) => {
					handleTextChange(text);
				}}
			/>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	subContainer: {
		marginHorizontal: 24,
	},
	textStyle: {
		paddingBottom: 10,
		fontSize: 16,
		color: "white",
	},
});

export default FloatingLabelInput;
