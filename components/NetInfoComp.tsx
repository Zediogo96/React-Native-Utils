import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import { StyleSheet, Text, View } from "react-native";
import Animated, { BounceIn, FadeInDown, FadeOutDown } from "react-native-reanimated";
import { Colors } from "@global/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ShadowedView, shadowStyle } from "react-native-fast-shadow";

const AnimatedShadowedView = Animated.createAnimatedComponent(ShadowedView);

const NetInfoComp = () => {
   const [hasInternet, setHasInternet] = useState(true);

   useFocusEffect(
      useCallback(() => {
         const netInfoSubscription = NetInfo.addEventListener((state: any) => {
            setHasInternet(state.isConnected);
         });
         return () => {
            netInfoSubscription();
         };
      }, [])
   );

   return hasInternet ? (
      <AnimatedShadowedView
         exiting={FadeOutDown.springify()}
         entering={FadeInDown.springify()}
         style={[
            styles.container,
            shadowStyle({
               color: "black",
               opacity: 0.5,
               offset: [0, 2],
               radius: 5,
            }),
         ]}
      >
         <View style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }}>
            <Icon name="wifi-off" size={15} color={Colors.ORANGE} />
            <Text style={styles.text1}>No internet connection</Text>
         </View>
         <Text numberOfLines={1} style={styles.text2}>
            Check your internet connection and try again!
         </Text>
      </AnimatedShadowedView>
   ) : null;
};

const styles = StyleSheet.create({
   container: {
      padding: 20,
      paddingVertical: 15,

      position: "absolute",
      zIndex: 1,
      bottom: 30,

      alignSelf: "center",
      backgroundColor: "white",
      borderRadius: 10,

      borderStartWidth: 5,
      borderColor: Colors.ORANGE,
      width: "80%",
   },
   text1: { textAlign: "left", fontSize: 14, fontWeight: "500" },
   text2: {
      textAlign: "left",
      fontWeight: "500",
      fontSize: 12,
      color: Colors.NEW_GRAY,
      marginTop: 10,
   },
});

export default NetInfoComp;
