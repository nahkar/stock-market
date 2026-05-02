'use client';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function SignUp() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			country: 'US',
			investmentGoals: 'Growth',
			riskTolerance: 'Medium',
			preferredIndustry: 'Technology ',
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
				<Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
					{isSubmitting ? 'Creating account' : 'Start Your Investment Journey'}
				</Button>
			</form>
		</div>
	);
}
