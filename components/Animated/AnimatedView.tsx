import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

type AnimatedViewProps = {
	from?: {
		x?: number;
		y?: number;
		opacity?: number;
		scale?: number;
		rotate?: string;
	};
	to?: {
		x?: number;
		y?: number;
		opacity?: number;
		scale?: number;
		rotate?: string;
	};
	duration?: number;
	delay?: number;
	children: any;
	viewStyle?: any;
};

const AnimatedView = (props: AnimatedViewProps) => {
	const {
		from = { x: 0, y: 0, opacity: 1, scale: 1, rotate: "0deg" },
		to = { x: 0, y: 0, opacity: 1, scale: 1, rotate: "0deg" },
		duration = 1000,
		delay = 0,
		children,
		viewStyle,
	} = props;

	const translateX = useRef(
		new Animated.Value(from.x !== undefined ? from.x : 0)
	).current;
	const translateY = useRef(
		new Animated.Value(from.y !== undefined ? from.y : 0)
	).current;
	const opacity = useRef(
		new Animated.Value(from.opacity !== undefined ? from.opacity : 1)
	).current;
	const scale = useRef(
		new Animated.Value(from.scale !== undefined ? from.scale : 1)
	).current;

	useEffect(() => {
		Animated.parallel([
			Animated.timing(translateX, {
				toValue: to.x || 0,
				duration,
				delay,
				easing: Easing.ease,
				useNativeDriver: true,
			}),
			Animated.timing(translateY, {
				toValue: to.y || 0,
				duration,
				delay,
				easing: Easing.ease,
				useNativeDriver: true,
			}),
			Animated.timing(opacity, {
				toValue: to.opacity || 1,
				duration,
				delay,
				easing: Easing.ease,
				useNativeDriver: true,
			}),
			Animated.timing(scale, {
				toValue: to.scale || 1,
				duration,
				delay,
				easing: Easing.ease,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	return (
		<Animated.View
			style={[
				viewStyle,
				{
					transform: [{ translateX }, { translateY }, { scale }],
					opacity,
				},
			]}
		>
			{children}
		</Animated.View>
	);
};

export default AnimatedView;
