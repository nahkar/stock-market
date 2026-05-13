'use server';

import { auth } from '@/lib/better-auth/auth';
import { inngest } from '@/lib/inngest/client';

export const signUpWithEmail = async ({
	fullName,
	email,
	password,
	investmentGoals,
	riskTolerance,
	preferredIndustry,
	country,
}: SignUpFormData) => {
	try {
		const response = await auth.api.signUpEmail({
			body: {
				name: fullName,
				email: email,
				password: password,
			},
		});
		if (response) {
			await inngest.send({
				name: 'app/user.created',
				data: {
					email: email,
					fullName: fullName,
					investmentGoals,
					riskTolerance,
					preferredIndustry,
					country,
				},
			});
		}

		return { success: true, data: response };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Something went wrong. Please try again' };
	}
};
