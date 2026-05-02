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
}: FormInputProps) => {
	return (
		<div className="space-y-2">
			<Label htmlFor={name} className="form-label">
				{label}
			</Label>
			<Input
				type={type}
				id={name}
				{...register(name, validation)}
				placeholder={placeholder}
				disabled={disabled}
				value={value}
				className={cn('form-input', { 'opacity-50 cursor-not-allowed': disabled })}
				{...register(name, validation)}
			/>
			{error && <p className="text-red-500 text-sm">{error.message}</p>}
		</div>
	);
};
