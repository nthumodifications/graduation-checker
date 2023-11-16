import { Textarea, TextareaProps } from '@mui/joy';
import {Controller, Path, Control, FieldValues} from 'react-hook-form';

const TextareaControl = <T extends FieldValues>({ control, name, rules = {}, ...rest }: { control: Control<T>, rules?: any, name: Path<T> } & TextareaProps) => {
    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: { value, onChange}}) => (
            <Textarea
                id={name}
                value={value}
                onChange={onChange}
                {...rest}
                />
        )}
    />
}

export default TextareaControl;