import { useState, useEffect } from "react";

export function useLowLevelHelpers() {
	const [status, setStatus] = useState(null);
	const [errorTitle, setErrorTitle] = useState(null);

	useEffect(() => {
		// Additional side effects can be added here if needed
	}, [status, errorTitle]);

	const callTimeoutError = (msgTitle, timeout_ms = 5000) => {
		return setTimeout(() => {
			setErrorTitle(msgTitle);
			setStatus(/* error */);
		}, timeout_ms);
	};

	const hexToBytes = (hex) => {
		for (var bytes = [], c = 0; c < hex.length; c += 2)
			bytes.push(parseInt(hex.substr(c, 2), 16));
		return bytes;
	};

	const bytesToHex = (bytes) => {
		for (var hex = [], i = 0; i < bytes.length; i++) {
			var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
			hex.push((current >>> 4).toString(16));
			hex.push((current & 0xf).toString(16));
		}
		return hex.join("");
	};

	const stringToAscii = (str) => {
		let asciiValues = [];
		for (let i = 0; i < str.length; i++) {
			asciiValues.push(str.charCodeAt(i));
		}
		return asciiValues;
	};

	const wordArrayToUint8Array = (wordArray, bytes = -1) => {
		if (bytes == -1) bytes = wordArray.sigBytes;
		bytes = Math.min(bytes, wordArray.sigBytes);
		if (bytes <= 0) return Uint8Array.from([]);

		const words = wordArray.words;
		const arr = new Uint8Array(bytes);

		for (let i = 0; i < bytes; i++) {
			arr[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		}

		return arr;
	};

	const hexStringToDecimalArray = (hexString) => {
		const decimalArray = [];
		for (let i = 0; i < hexString.length; i += 2) {
			const hexSubstring = hexString.substring(i, i + 2);
			const decimalValue = parseInt(hexSubstring, 16);
			decimalArray.push(decimalValue);
		}
		return decimalArray;
	};

	const compareDecimalArrays = (arr1, arr2) => {
		if (arr1.length !== arr2.length) return false;
		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i] !== arr2[i]) return false;
		}
		return true;
	};

	const Utf8ArrayToStr = (array) => {
		var out, i, len, c, char2, char3;

		out = "";
		len = array.length;
		i = 0;
		while (i < len) {
			c = array[i++];
			switch (c >> 4) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
					out += String.fromCharCode(c);
					break;
				case 12:
				case 13:
					char2 = array[i++];
					out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
					break;
				case 14:
					char2 = array[i++];
					char3 = array[i++];
					out += String.fromCharCode(
						((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
					);
					break;
			}
		}

		return out;
	};

	return {
		status,
		errorTitle,
		callTimeoutError,
		hexToBytes,
		bytesToHex,
		stringToAscii,
		wordArrayToUint8Array,
		hexStringToDecimalArray,
		compareDecimalArrays,
		Utf8ArrayToStr,
	};
}
