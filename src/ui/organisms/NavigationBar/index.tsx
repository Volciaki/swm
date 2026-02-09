"use client";

import { useCallback, useMemo, type FC } from "react";
import { useMobile } from "@/ui/hooks";
import { apiClient, useAuthData } from "@/ui/providers";
import { routes as routeDefinitions } from "@/utils";
import { DesktopNavigationBar } from "./Desktop";
import { MobileNavigationBar } from "./Mobile";

export const NavigationBar: FC = () => {
	const { mobile } = useMobile();
	const { authData, refreshAuthData } = useAuthData();
	const logout = apiClient.identity.logout.useMutation();
	const isAuthenticated = authData !== null;
	const routes = useMemo(
		() => (isAuthenticated ? routeDefinitions.loggedIn : routeDefinitions.unauthenticated),
		[isAuthenticated]
	);

	const onLogout = useCallback(async () => {
		await logout.mutateAsync();
		refreshAuthData();
	}, [logout, refreshAuthData]);

	if (mobile) return <MobileNavigationBar onLogout={onLogout} routes={routes} />;

	return <DesktopNavigationBar onLogout={onLogout} routes={routes} />;
};
