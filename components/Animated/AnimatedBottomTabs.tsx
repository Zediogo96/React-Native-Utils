import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { memo, useEffect, useMemo, useRef } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import useEmployeeData from "../../React-Query/employee";
import I18n from "../../locales";
import { useSelector, RootStateOrAny } from "react-redux";

type TabArrType = {
    route: string;
    label: string;
    icon: string;
    component: React.FC | React.FC<any>;
    color: string;
    filterField: string;
};

type TabProps = {
    item: {
        route: string;
        label: string;
        icon: string;
        component: React.FC;
        color: string;
    };
    onPress: () => void;
    accessibilityState: { selected: boolean };
};

const Tab = createBottomTabNavigator();

const TabButton: React.FC<TabProps> = (props: TabProps) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;

    const scale = useSharedValue(focused ? 0 : 1);
    const opacity = useSharedValue(focused ? 1 : 0);

    useEffect(() => {
        const startAnimation = () => {
            opacity.value = withTiming(focused ? 1 : 0, { duration: 550 });
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
                    <MaterialIcon
                        name={item.icon}
                        size={25}
                        color={focused ? "white" : "black"}
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

function AnimatedBottomTabs() {
    const { data: employee, isLoading } = useEmployeeData();

    const language = useSelector((state: RootStateOrAny) => state.language);
    I18n.locale = language.preferred;

    const TabArr: TabArrType[] = useRef([]).current;

    const allowedTabs = useMemo(() => {
        return TabArr.filter((item) => validatePermission(item));
    }, []);

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBarStyle,
                }}
            >
                {allowedTabs.map((item: TabArrType, index: number) => {
                    return (
                        <Tab.Screen
                            key={index}
                            name={item.route}
                            component={item.component as any}
                            options={{
                                tabBarShowLabel: false,
                                // @ts-expect-error - item is not assignable to type 'RouteProp<ParamListBase, string>'
                                tabBarButton: (props) => (
                                    <TabButton {...props} item={item} />
                                ),
                            }}
                        />
                    );
                })}
            </Tab.Navigator>
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
        borderRadiusTopLeft: 16,
        borderRadiusTopRight: 16,
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
