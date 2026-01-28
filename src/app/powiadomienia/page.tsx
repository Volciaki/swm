import { type FC } from "react";
import { Protected } from "@/ui/organisms/Protected";
import { Paragraph } from "@/ui/atoms";

const Notifications: FC = () => (
	<Protected>
		<Paragraph>{"powiadomienia"}</Paragraph>
	</Protected>
);

export default Notifications;
