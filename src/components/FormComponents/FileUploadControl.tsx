import { Button, SvgIcon, styled } from "@mui/joy";
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const InputFileUpload = <T extends FieldValues>({ control, name, rules, label="Upload a file" }: { 
    control: Control<T>, 
    name: Path<T>, 
    rules: Omit<RegisterOptions<T, Path<T>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">,
    label?: string
}) => {
  return (
    <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange } }) => (
            <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color="neutral"
            startDecorator={
                <SvgIcon>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        />
                    </svg>
                </SvgIcon>
            }
            >
            {label}
            <VisuallyHiddenInput type="file" onChange={e => onChange(e.target.files)} id={name} />
            </Button>
        )}
    />
  );
}

export default InputFileUpload;