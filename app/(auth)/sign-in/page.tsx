'use client';
import { CountrySelectField, FooterLinks, InputField, SelectField } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function SignIn() {
	const {
		register,
		handleSubmit,
		clearErrors,
		control,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormData>({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onBlur',
	});
	const onSubmit: SubmitHandler<SignInFormData> = async (data: SignInFormData) => {
		try {
			console.log(data);
		} catch (error) {
			console.error(error);
		} finally {
		}
	};
	return (
		<div>
			<h1 className="form-title">Sign Up & Personalize</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				<InputField
					name="email"
					label="Email"
					placeholder="Enter your email"
					register={register}
					clearErrors={clearErrors}
					clearErrorOnEmptyBlur
					error={errors.email}
					validation={{
						required: { value: true, message: 'Email is required' },
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'Please enter a valid email address',
						},
					}}
				/>
				<InputField
					name="password"
					label="Password"
					placeholder="Enter your password"
					register={register}
					clearErrors={clearErrors}
					clearErrorOnEmptyBlur
					error={errors.password}
					validation={{
						required: { value: true, message: 'Password is required' },
						minLength: { value: 8, message: 'Password must be at least 8 characters long' },
					}}
				/>
				<Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
					{isSubmitting ? 'Signing in' : 'Sign in'}
				</Button>

				<FooterLinks text="Don't have an account?" linkText="Sign up" href="/sign-up" />
			</form>
		</div>
	);
}
