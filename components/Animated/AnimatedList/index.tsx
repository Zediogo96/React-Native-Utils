import { View, FlatList, ViewToken } from "react-native";
import React from "react";
import colors from "../../../styles/colors";

import { ListItem } from "./ListItem";
import { useSharedValue } from "react-native-reanimated";

type TimeEventsListProps = {
	refreshing: boolean;
	onRefresh: () => void;
	data: any;
	onBottomSheetPress: () => void;
	setBottomSheetData: (data: any) => void;
};

const TimeEventsList = (props: TimeEventsListProps) => {
	const viewableItems = useSharedValue<ViewToken[]>([]);

	const handleViewableItemsChanged = React.useCallback(
		({ viewableItems: vItems }: any) => {
			viewableItems.value = vItems;
		},
		[]
	);

	// add id to each item
	const data = props.data.map((item: any, index: number) => {
		return { ...item, id: index };
	});

	return (
		<View
			style={{
				borderTopWidth: 2,
				borderLeftWidth: 2,
				borderRightWidth: 2,
				borderColor: colors.primary,
				borderTopLeftRadius: 15,
				borderTopRightRadius: 15,
				flex: 1,
				backgroundColor: colors.bg_lightGray,
			}}
		>
			<FlatList
				data={data}
				contentContainerStyle={{ paddingTop: 20 }}
				showsVerticalScrollIndicator={false}
				onViewableItemsChanged={handleViewableItemsChanged} // if useCallback is used
				renderItem={({ item }) => {
					return (
						<ListItem
							viewableItems={viewableItems}
							item={item}
							setBottomSheetData={props.setBottomSheetData}
							onBottomSheetPress={props.onBottomSheetPress}
						/>
					);
				}}
			/>
		</View>
	);
};

export default TimeEventsList;
