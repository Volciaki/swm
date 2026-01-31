import type { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Paragraph, Flex, Input } from "@/ui/atoms";
import { FormInput } from "@/ui/molecules";

export type FormFieldsProps<T extends FieldValues> = {
	sections: Array<{
		name: string;
		inputs: Array<{
			placeholder: string;
			formKey: keyof T;
			required?: string;
			min?: {
				value: number;
				message: string;
			};
			validate?: (value: string | number) => string | undefined;
		}>;
	}>;
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
};

export const FormFields = <T extends FieldValues>({ sections, register, errors }: FormFieldsProps<T>) => {
	return (
		<>
			{sections.map((section) => (
				<>
					<Paragraph style={{ width: "100%", textAlign: "center", fontSize: "1.75rem" }}>{section.name}</Paragraph>

					<Flex direction={"row"} style={{ gap: "1rem" }} fullWidth>
						{section.inputs.map((input, index) => (
							<FormInput error={errors[input.formKey]} gap={1} key={`form-input-${index}`}>
								<Input
									placeholder={"Ilość rzędów (M)"}
									fontSize={1.5}
									{...register("rows", {
										required: "Podanie ilości rzędów regału jest wymagane.",
										min: {
											value: 1,
											message: "Regał nie może posiadać mniej niż jednego rzędu.",
										},
										validate: (v) =>
											integerOnlyValidator(v.toString(), "Ilość rzędów regału musi być liczbą całkowitą."),
									})}
								/>
							</FormInput>
						))}
					</Flex>
				</>
			))}
		</>
	);
};
