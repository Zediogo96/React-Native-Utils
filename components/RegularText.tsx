import React, { ReactNode } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { fonts } from "../styles";

/* 
* RegularText

* This is a pretty straightforward component, it's just so I remember the idea in the future.

 React Native Stylling doesn't have by default a method to set a default font family for all the text in the app, as it is done in the web using CSS with the global selector.

 This component is just a wrapper for the Text component that sets a default font family, so I don't have to set it manually every time I use a Text component. 

* The main idea is to use this component instead of the default RN Text component, so I can set a default font family for all the text in the app.

! Dont forget to that any style you pass to the component will override the default style.

?  It can be extended to do more things, or even to use Animated.Text from react-native-reanimated.

*/

type RegularTextProps = {
	children: ReactNode;
	style?: TextStyle | TextStyle[];
};

const RegularText = ({ children, style }: RegularTextProps) => {
	return <Text style={[styles.defaultText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
	defaultText: {
		fontFamily: fonts.ProximaNovaRegular,
	},
});

export default RegularText;
