import { useCallback, useState } from "react";
import { Button, FormError, Loading, Paragraph } from "@/ui/atoms";
import type { TRPCMutation } from "@/ui/types";
import type { APIError } from "@/ui/utils";
import { defaultErrorHandler } from "@/ui/utils";

export type GenerateReportButtonProps<T extends TRPCMutation = TRPCMutation> = {
	mutation: T;
	onSuccess: (data: T["data"]) => void;
	text?: string;
};

export const GenerateReportButton = <T extends TRPCMutation = TRPCMutation>({
	mutation,
	onSuccess,
	text = "Generuj",
}: GenerateReportButtonProps<T>) => {
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onClickHandler = useCallback(async () => {
		setIsLoading(true);

		mutation.mutate(undefined, {
			onError: (e) => defaultErrorHandler(e as APIError, (message) => setError(message)),
			onSuccess: (data) => onSuccess(data),
			onSettled: () => setIsLoading(false),
		});
	}, [mutation, onSuccess]);

	return (
		<>
			<Button onClick={async () => await onClickHandler()}>
				<Paragraph fontSize={1.5}>{text}</Paragraph>
			</Button>

			{error && <FormError>{error}</FormError>}

			{isLoading && <Loading />}
		</>
	);
};
