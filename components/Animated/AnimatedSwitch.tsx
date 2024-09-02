import { StyleSheet, TouchableWithoutFeedback, ViewStyle } from "react-native";
import React, { useEffect } from "react";
import Animated, {
   interpolateColor,
   useSharedValue,
   useAnimatedStyle,
   withSpring,
   withTiming,
   useDerivedValue,
} from "react-native-reanimated";

// @ts-expect-error: ReactNativeHapticFeedback is not typed
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

type CustomSwitchProps = {
   activeColor?: string;
   inActiveColor?: string;
   isActive?: boolean;
   setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;

   contentContainerStyleOverride?: ViewStyle;
};

const CustomSwitch: React.FC<CustomSwitchProps> = (props) => {
   const {
      activeColor = "#3A8DFF",
      inActiveColor = "#F2F5F7",
      isActive = false,
      setIsActive,
      contentContainerStyleOverride,
   } = props;

   // value for Switch Animation
   const switchTranslate = useSharedValue(0);
   // state for activate Switch

   // Progress Value
   const progress = useDerivedValue(() => {
      return withTiming(isActive ? 22 : 0);
   });

   // useEffect for change the switchTranslate Value
   useEffect(() => {
      if (isActive) switchTranslate.value = 22;
      else switchTranslate.value = 4;
   }, [isActive, switchTranslate]);

   // Circle Animation
   const customSpringStyles = useAnimatedStyle(() => {
      return {
         transform: [
            {
               translateX: withSpring(switchTranslate.value, {
                  mass: 1,
                  damping: 15,
                  stiffness: 120,
                  overshootClamping: false,
                  restSpeedThreshold: 0.001,
                  restDisplacementThreshold: 0.001,
               }),
            },
         ],
      };
   });

   // Background Color Animation
   const backgroundColorStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
         progress.value,
         [0, 22],
         [inActiveColor, activeColor]
      );
      return {
         backgroundColor,
      };
   });

   return (
      <TouchableWithoutFeedback
         style={contentContainerStyleOverride}
         onPress={() => {
            ReactNativeHapticFeedback.trigger("impactLight");
            setIsActive && setIsActive(!isActive);
         }}
      >
         <Animated.View style={[styles.container, backgroundColorStyle]}>
            <Animated.View style={[styles.circle, customSpringStyles]} />
         </Animated.View>
      </TouchableWithoutFeedback>
   );
};

export default CustomSwitch;

const styles = StyleSheet.create({
   container: {
      width: 50,
      height: 28,
      borderRadius: 30,
      justifyContent: "center",
      backgroundColor: "#F2F5F7",
   },
   circle: {
      width: 24,
      height: 24,
      borderRadius: 30,
      backgroundColor: "white",
      shadowColor: "black",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.5,
      elevation: 4,
   },
});
