import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const InputField = ({
	label,
	name,
	placeholder,
	type = 'text',
	register,
	error,
	validation,
	disabled,
	value,
	clearErrors,
	clearErrorOnEmptyBlur = false,
}: FormInputProps) => {
	const { ref, onChange, onBlur, name: fieldName } = register(name, validation);
	return (
		<div className="space-y-2">
			<Label htmlFor={name} className="form-label">
				{label}
			</Label>
			<Input
				type={type}
				id={name}
				ref={ref}
				name={fieldName}
				onChange={onChange}
				onBlur={(e) => {
					void onBlur(e);
					if (clearErrorOnEmptyBlur && clearErrors && e.currentTarget.value.trim() === '') {
						clearErrors(name);
					}
				}}
				placeholder={placeholder}
				disabled={disabled}
				value={value}
				className={cn('form-input', { 'opacity-50 cursor-not-allowed': disabled })}
			/>
			{error && <p className="text-red-500 text-sm">{error.message}</p>}
		</div>
	);
};
