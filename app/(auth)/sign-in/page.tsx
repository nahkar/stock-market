'use client';
import { FooterLinks, InputField } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { signInWithEmail } from '@/lib/actions/auth.actions';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function SignIn() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		clearErrors,
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
			const res = await signInWithEmail(data);
			if (res.success) {
				router.push('/');
			} else {
				toast.error('Failed to sign in.', {
					description: res?.message || 'Please try again later',
				});
			}
		} catch (error) {
			toast.error('Failed to sign in.', {
				description: error instanceof Error ? error.message : 'Please try again later',
			});
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
					type="password"
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
