'use client';
import { CountrySelectField, FooterLinks, InputField, SelectField } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';

export const INVESTMENT_GOALS_OPTIONS = [
	{ value: 'Growth', label: 'Growth' },
	{ value: 'Income', label: 'Income' },
	{ value: 'Balanced', label: 'Balanced' },
	{ value: 'Conservative', label: 'Conservative' },
];

export const RISK_TOLERANCE_OPTIONS = [
	{ value: 'Low', label: 'Low' },
	{ value: 'Medium', label: 'Medium' },
	{ value: 'High', label: 'High' },
];

export const PREFERRED_INDUSTRIES_OPTIONS = [
	{ value: 'Technology', label: 'Technology' },
	{ value: 'Healthcare', label: 'Healthcare' },
	{ value: 'Finance', label: 'Finance' },
	{ value: 'Energy', label: 'Energy' },
	{ value: 'Consumer Goods', label: 'Consumer Goods' },
];

export default function SignUp() {
	const {
		register,
		handleSubmit,
		clearErrors,
		control,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			country: '',
			investmentGoals: '',
			riskTolerance: '',
			preferredIndustry: '',
		},
		mode: 'onBlur',
	});
	const onSubmit: SubmitHandler<SignUpFormData> = async (data: SignUpFormData) => {
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
					name="fullName"
					label="Full Name"
					placeholder="John Doe"
					register={register}
					clearErrors={clearErrors}
					clearErrorOnEmptyBlur
					error={errors.fullName}
					validation={{
						required: { value: true, message: 'Full name is required' },
						minLength: { value: 3, message: 'Full name must be at least 3 characters long' },
					}}
				/>
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
				<CountrySelectField
					name="country"
					label="Country"
					control={control}
					error={errors.country}
					required
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
				<SelectField
					name="investmentGoals"
					label="Investment Goals"
					placeholder="Select your investment goals"
					options={INVESTMENT_GOALS_OPTIONS}
					control={control}
					error={errors.investmentGoals}
					required
				/>
				<SelectField
					name="riskTolerance"
					label="Risk Tolerance"
					placeholder="Select your risk tolerance"
					options={RISK_TOLERANCE_OPTIONS}
					control={control}
					error={errors.riskTolerance}
					required
				/>
				<SelectField
					name="preferredIndustry"
					label="Preferred Industry"
					placeholder="Select your preferred industry"
					options={PREFERRED_INDUSTRIES_OPTIONS}
					control={control}
					error={errors.preferredIndustry}
					required
				/>
				<Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
					{isSubmitting ? 'Creating account' : 'Start Your Investment Journey'}
				</Button>

				<FooterLinks text="Already have an account?" linkText="Sign in" href="/sign-in" />
			</form>
		</div>
	);
}
