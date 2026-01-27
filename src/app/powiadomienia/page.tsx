import { type FC } from "react";
import { Protected } from "@/ui/organisms/Protected";
import { CenteredOnPage } from "@/ui/molecules";
import { Paragraph } from "@/ui/atoms";

const Notifications: FC = () => (
	<CenteredOnPage>
		<Protected>
			<Paragraph>{"powiadomienia"}</Paragraph>
		</Protected>
	</CenteredOnPage>
);

export default Notifications;
