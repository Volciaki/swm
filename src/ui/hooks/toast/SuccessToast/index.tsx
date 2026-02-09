import type { FC } from "react";
import { Flex, Paragraph, Separator } from "@/ui/atoms";
import { useMobile } from "../../mobile";
import type { ToastProps } from "../hook";

export const SuccessToast: FC<ToastProps> = ({ title, message }) => {
	const { mobile } = useMobile();

	return (
		<Flex direction={"column"} style={{ height: "100%", gap: "0.5rem" }} fullWidth>
			<Paragraph fontSize={mobile ? 1.25 : 1.5} ellipsisOverflow>
				{title}
			</Paragraph>

			<Separator />

			<Paragraph fontSize={mobile ? 1 : 1.25} variant={"secondary"} ellipsisOverflow>
				{message}
			</Paragraph>
		</Flex>
	);
};
