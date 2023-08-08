import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

// Custom hook to manage data in AsyncStorage
export default function useAsyncStorage(key: string) {
	// State to hold the value retrieved from AsyncStorage
	const [value, setValue] = useState<string | null>(null);

	// Fetch the value from AsyncStorage when the component mounts or the key changes
	useEffect(() => {
		(async () => {
			const value = await AsyncStorage.getItem(key);
			setValue(value);
		})();
	}, [key]);

	// Callback function to set a value in AsyncStorage
	const set = useCallback(
		async (value: string) => {
			setValue(value);
			await AsyncStorage.setItem(key, value);
		},
		[key]
	);

	// Callback function to remove a value from AsyncStorage
	const remove = useCallback(async () => {
		setValue(null);
		await AsyncStorage.removeItem(key);
	}, [key]);

	// Return the value, set function, and remove function
	return [value, set, remove] as const;
}

// Example usage:

/*

const [token, setToken, removeToken] = useAsyncStorage('token');

setToken('123'); // Store a value in AsyncStorage
console.log(token); // Output: 123

removeToken(); // Remove the stored value from AsyncStorage
console.log(token); // Output: null

*/
