import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
	useSharedValue,
	withTiming,
	Easing,
	withRepeat,
	useAnimatedProps,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";

import loadingAnimation from "@/assets/animations/newLoading.json";

const HEIGHT = Dimensions.get("window").height;

const CentralLoadingSpinner: React.FC = () => {
	// Create an animated LottieView component
	const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

	// Create a shared value to control the animation progress, this value is shared between JS and the native thread
	const progress = useSharedValue(0);

	const animatedProps = useAnimatedProps(() => {
		return {
			// Bind the progress value to the animated property
			progress: progress.value,
		};
	});

	// Set up the useEffect hook to start and repeat the animation
	useEffect(() => {
		// Set the progress value with repeat and timing for a continuous looping animation
		progress.value = withRepeat(
			withTiming(1, { duration: 1000, easing: Easing.linear }),
			-1,
			true // discovered this by mistake, but looks cool as hell
		);
	}, [progress]);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				marginTop: -HEIGHT / 7, // Adjust the margin to vertically center the spinner
			}}
		>
			<AnimatedLottieView
				style={{
					width: 200,
					height: 200,
				}}
				// Pass the animated properties to the LottieView
				animatedProps={animatedProps}
				// Set the source of the LottieView to the loading animation
				source={loadingAnimation}
			/>
		</View>
	);
};

export default CentralLoadingSpinner;
