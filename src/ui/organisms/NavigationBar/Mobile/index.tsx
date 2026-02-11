import type { ReactNode, FC, CSSProperties, PointerEvent } from "react";
import { useCallback, useRef, useState } from "react";
import { clsx } from "clsx";
import { RiMenuLine, RiHomeLine } from "react-icons/ri";
import { LiaUser } from "react-icons/lia";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { Button, Flex, Link, Paragraph, Separator } from "@/ui/atoms";
import { useAuthData } from "@/ui/providers";
import type { routes, Route } from "@/utils";
import type { UseStateSetter } from "@/ui/types";
import styles from "./index.module.scss";

const iconColor = "#A7A7A7";

const sharedRouteIconStyles: { style: CSSProperties; size: `${number}rem` } = {
	style: { color: iconColor, minWidth: "1.75rem" },
	size: "1.75rem",
};

const sharedNavigationIconProps = {
	color: "#A7A7A7",
	size: "2rem",
};

type Routes = typeof routes;
type RoutesHref = Routes[keyof Routes][number]["href"];
export const getRouteIconByHref: Record<RoutesHref, ReactNode> = {
	"/": <RiHomeLine {...sharedRouteIconStyles} />,
	"/centrum-zarzadzania": <BsBoxSeam {...sharedRouteIconStyles} />,
	"/powiadomienia": <IoMdNotificationsOutline {...sharedRouteIconStyles} />,
};

type NavigationRoutesProps = {
	routes: readonly Route[];
	areRoutesShown: boolean;
	setAreRoutesShown: UseStateSetter<boolean>;
};

const NavigationRoutes: FC<NavigationRoutesProps> = ({ routes, areRoutesShown, setAreRoutesShown }) => {
	const isDragging = useRef(false);
	const startY = useRef(0);
	const [changeY, setChangeY] = useState(0);

	const onPointerMove = useCallback((e: PointerEvent) => {
		if (!isDragging.current) return;

		const change = e.clientY - startY.current;

		if (change > 0) {
			setChangeY(0);
			return;
		}

		setChangeY(change);
	}, []);

	const onPointerDown = useCallback((e: PointerEvent) => {
		startY.current = e.clientY;
		isDragging.current = true;
	}, []);

	const onPointerUp = useCallback(
		(e: PointerEvent) => {
			const change = e.clientY - startY.current;

			if (change < -100) setAreRoutesShown(false);

			isDragging.current = false;
			setChangeY(0);
		},
		[setAreRoutesShown]
	);

	return (
		<div
			className={clsx([styles["routes-container"], { [styles["opened"]]: areRoutesShown }])}
			style={{ transform: changeY === 0 ? undefined : `translateY(${changeY}px)`, touchAction: "none" }}
			onPointerMove={onPointerMove}
			onPointerUp={onPointerUp}
			onPointerDown={onPointerDown}
		>
			{routes.map((route, index) => (
				<Flex direction={"column"} style={{ gap: "0.5rem" }} key={`route-${index}`}>
					<Flex direction={"row"} align={"center"} style={{ gap: "0.5rem" }}>
						{getRouteIconByHref[route.href as RoutesHref]}

						<div onClick={() => setAreRoutesShown(false)}>
							<Link href={route.href} style={{ textDecoration: "none" }}>
								<Paragraph fontSize={1.75} ellipsisOverflow>
									{route.text}
								</Paragraph>
							</Link>
						</div>
					</Flex>

					{index + 1 !== routes.length && <Separator variant={"secondary"} />}
				</Flex>
			))}

			<div className={styles["grab-handle"]}>
				<Separator variant={"secondary"} />
			</div>
		</div>
	);
};

export type MobileNavigationBarProps = {
	onLogout: () => void;
	routes: readonly Route[];
};

export const MobileNavigationBar: FC<MobileNavigationBarProps> = ({ onLogout, routes }) => {
	const { authData } = useAuthData();
	const [areUserDetailsShown, setAreUserDetailsShown] = useState(false);
	const [areRoutesShown, setAreRoutesShown] = useState(false);

	const handleUserMenuClick = useCallback(() => {
		setAreRoutesShown(false);
		setAreUserDetailsShown((current) => !current);
	}, []);

	const handleHamburgerClick = useCallback(() => {
		setAreUserDetailsShown(false);
		setAreRoutesShown((current) => !current);
	}, []);

	return (
		<>
			<div className={styles["container"]}>
				{authData === null ? (
					<Link href={"/login"} style={{ textDecoration: "none" }}>
						<Paragraph fontSize={1} variant={"secondary"} style={{ fontWeight: "bold" }}>
							{"Zaloguj się"}
						</Paragraph>
					</Link>
				) : areUserDetailsShown ? (
					<IoCloseOutline {...sharedNavigationIconProps} onClick={() => handleUserMenuClick()} />
				) : (
					<LiaUser {...sharedNavigationIconProps} onClick={() => handleUserMenuClick()} />
				)}

				<Link href={"/"} style={{ textDecoration: "none" }}>
					<Paragraph style={{ marginInline: "auto" }} fontSize={2.5}>
						{"SWM"}
					</Paragraph>
				</Link>

				<div onClick={() => handleHamburgerClick()} style={{ justifySelf: "end" }}>
					{areRoutesShown ? (
						<IoCloseOutline {...sharedNavigationIconProps} />
					) : (
						<RiMenuLine {...sharedNavigationIconProps} />
					)}
				</div>
			</div>

			{authData && areUserDetailsShown && (
				<Flex direction={"column"} className={styles["user-details-container"]}>
					<Link href={`/centrum-zarzadzania/uzytkownicy/${authData.id}/edytuj`}>
						<Button style={{ width: "100%" }} onClick={() => setAreUserDetailsShown(false)}>
							<Paragraph fontSize={1}>{authData.name}</Paragraph>
						</Button>
					</Link>

					<Paragraph fontSize={1} ellipsisOverflow>{`Login: ${authData.name}`}</Paragraph>
					<Paragraph fontSize={1} ellipsisOverflow>{`Email: ${authData.email}`}</Paragraph>
					<Paragraph fontSize={1} ellipsisOverflow>
						{`Typ konta: ${authData.isAdmin ? "Administrator" : "Użytkownik"}`}
					</Paragraph>

					<Button
						onClick={() => {
							onLogout();
							setAreUserDetailsShown(false);
						}}
						danger
					>
						<Paragraph fontSize={1}>{"Wyloguj"}</Paragraph>
					</Button>
				</Flex>
			)}

			<NavigationRoutes routes={routes} setAreRoutesShown={setAreRoutesShown} areRoutesShown={areRoutesShown} />
		</>
	);
};
