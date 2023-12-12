import React from "react";
import {
	StyleSheet,
	TouchableOpacity,
	View,
	ViewToken,
	Text,
} from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
import { colors, fonts } from "../../../styles";
import {
	getDayFromDateString,
	getShortMonthFromDateString,
	secondsToFullHours,
} from "../../../utils/time";
import strings from "../../../consts/strings";

type ListItemProps = {
	viewableItems: Animated.SharedValue<ViewToken[]>;
	item: any;
	setBottomSheetData: (data: any) => void;
	onBottomSheetPress: () => void;
};

const SPACING = 20;
const AVATAR_SIZE = 65;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 2.5;

const ListItem: React.FC<ListItemProps> = React.memo((props) => {
	const rStyle = useAnimatedStyle(() => {
		const isVisible = Boolean(
			props.viewableItems.value.find((item) => item.key === props.item.id)
		);

		const scale = isVisible ? 1 : 0.2;
		const opacity = isVisible ? 1 : 0;

		// Apply different animations for even and odd indices
		const animationDuration = 700;
		const easing = Easing.inOut(Easing.quad);

		const scaleAnimation = withTiming(scale, {
			duration: animationDuration,
			easing,
		});
		const opacityAnimation = withTiming(opacity, {
			duration: animationDuration,
			easing,
		});

		return {
			opacity: opacityAnimation,
			transform: [
				{
					scale: scaleAnimation,
				},
			],
		};
	}, []);

	return (
		<TouchableOpacity
			onPress={() => {
				props.setBottomSheetData(props.item);
				props.onBottomSheetPress();
			}}
		>
			<Animated.View style={[styles.container, rStyle]}>
				<View style={styles.dateContainer}>
					<Text style={styles.day}>
						{getDayFromDateString(props.item.Date)}
					</Text>

					<Text style={styles.shortMonth}>
						{getShortMonthFromDateString(props.item.Date)}
					</Text>
				</View>

				<View>
					<Text
						style={[
							styles.itemInfoText,
							{ color: colors.primary, fontSize: 25 },
						]}
					>
						{`${strings.flex_shedule_month_clocking} ${props.item.TimeEventsNumber}`}
					</Text>
					<Text
						style={[
							styles.itemInfoText,
							{
								color: "gray",
								fontSize: 18,
								marginTop: 5,
								marginLeft: 2,
								alignSelf: "flex-end",
							},
						]}
					>
						{`${strings.flex_shedule_month_balance} `}
						<Text
							style={{
								opacity: 0.8,
								color: props.item.Balance >= 0 ? "green" : "red",
								fontSize: 16,
							}}
						>
							{secondsToFullHours(props.item.Balance)}
						</Text>
					</Text>
				</View>
			</Animated.View>
		</TouchableOpacity>
	);
});

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 30,
		marginBottom: SPACING,
		shadowColor: colors.primary,
		shadowOffset: {
			width: -1,
			height: 5,
		},
		height: ITEM_SIZE - 30,
		width: "95%",
		alignSelf: "center",
		shadowOpacity: 0.5,
		shadowRadius: 7,
		borderRadius: 15,
		backgroundColor: "white",
		marginHorizontal: 10,
	},
	itemInfoText: {
		fontFamily: fonts.primaryRegular,
	},
	day: {
		color: colors.white,
		fontFamily: fonts.primaryRegular,
		fontSize: 28,
		fontWeight: "bold",
		textShadowColor: "black",
		textShadowRadius: 1,
		textShadowOffset: {
			width: 2,
			height: 2,
		},
	},
	shortMonth: {
		color: colors.white,
		fontFamily: fonts.primaryRegular,
		fontSize: 10,
		fontWeight: "bold",
		textShadowColor: "black",
		textShadowRadius: 1,
		textShadowOffset: {
			width: 2,
			height: 2,
		},
	},
	dateContainer: {
		height: AVATAR_SIZE,
		width: AVATAR_SIZE,
		borderRadius: 20,
		backgroundColor: colors.primary,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 2,
		borderColor: colors.primary,
	},
});

export { ListItem };
