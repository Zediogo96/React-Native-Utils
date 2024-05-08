import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Tabs } from "expo-router";
import React, { memo, useEffect } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";

type TabProps = {
    id: number | string;
    item: {
        route: string;
        label: string;
        icon: IconProps<any>["name"];
        color: string;
    };
    onPress?: () => void;
    accessibilityState: { selected: boolean };
};

const TabButton: React.FC<TabProps> = (props: TabProps) => {
    const { id, item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;

    const scale = useSharedValue(focused ? 0 : 1);
    const opacity = useSharedValue(focused ? 1 : 0);

    useEffect(() => {
        const startAnimation = () => {
            opacity.value = withTiming(focused ? 1 : 0, { duration: 450 });
            scale.value = withSpring(focused ? 1 : 0, {
                damping: 10,
                stiffness: 90,
            });
        };
        startAnimation();
    }, [focused]);

    const animeTextStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    }, [focused]);

    const animeViewStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    }, [focused]);

    return (
        <TouchableOpacity
            id={id.toString()}
            onPress={onPress}
            activeOpacity={1}
            style={[styles.container, { flex: focused ? 1 : 0.65 }]}
        >
            <View>
                <Animated.View
                    style={[
                        StyleSheet.absoluteFillObject,
                        { backgroundColor: item.color, borderRadius: 16 },
                        animeViewStyle,
                    ]}
                />
                <View style={styles.btn}>
                    <Ionicons
                        name={item.icon}
                        size={25}
                        color={focused ? "white" : Colors.mainTheme.darkOlive}
                    />
                    <Animated.View style={animeTextStyle}>
                        {focused && (
                            <Text
                                style={{
                                    color: "white",
                                    paddingHorizontal: 8,
                                    fontWeight: "bold",
                                }}
                            >
                                {item.label}
                            </Text>
                        )}
                    </Animated.View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const TabsDataArray: TabProps["item"][] = [
    {
        route: "home",
        label: "Home",
        icon: "home",
        color: Colors.mainTheme.oliveGreen,
    },
    {
        route: "ChatRooms",
        label: "Chat Rooms",
        icon: "chatbubbles",
        color: Colors.mainTheme.oliveGreen,
    },
    {
        route: "settings",
        label: "Settings",
        icon: "settings",
        color: Colors.mainTheme.oliveGreen,
    },
];

function AnimatedBottomTabs() {
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBarStyle,
                }}
            >
                {TabsDataArray.map((item, index) => (
                    <Tabs.Screen
                        name={item.route}
                        options={{
                            tabBarButton: (props) => {
                                return (
                                    // @ts-expect-error : TS is not recognizing the props
                                    <TabButton
                                        id={index}
                                        item={{
                                            route: item.route,
                                            label: item.label,
                                            icon: item.icon,
                                            color: item.color,
                                        }}
                                        {...props}
                                    />
                                );
                            },
                        }}
                    />
                ))}
            </Tabs>
        </>
    );
}

export default memo(AnimatedBottomTabs);

const styles = StyleSheet.create({
    btn: {
        alignItems: "center",
        borderRadius: 16,
        flexDirection: "row",
        height: 40,
        padding: 5,
    },
    container: {
        alignItems: "center",
        height: 40,
        justifyContent: "center",
    },

    tabBarStyle: {
        backgroundColor: "white",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        bottom: 0,
        height: Platform.OS === "ios" ? 75 : 60,
        paddingTop: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
});
