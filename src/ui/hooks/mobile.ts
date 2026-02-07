import { useState, useEffect } from "react";

// This should stay in sync with $mobile-width SCSS constant.
const MOBILE_WIDTH = 1300;

export const useMobile = (customWidth?: number) => {
	const [isMobile, setIsMobile] = useState(false);
	// If `defaultValue` is true, `isMobile` has a default
	// value (the media query hasn't actually run yet).
	const [defaultValue, setDefaultValue] = useState(true);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const checkWidthAndUpdateState = () => {
			setIsMobile(window.innerWidth <= (customWidth ?? MOBILE_WIDTH));
		};

		checkWidthAndUpdateState();
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setDefaultValue(false);

		window.addEventListener("resize", checkWidthAndUpdateState);
		return () => window.removeEventListener("resize", checkWidthAndUpdateState);
	}, [customWidth]);

	return { mobile: isMobile, mobileDefault: defaultValue };
};
