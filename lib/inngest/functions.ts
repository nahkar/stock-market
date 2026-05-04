import { inngest } from './client';
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from './prompts';

export const sendSingUpEmail = inngest.createFunction(
	{
		id: 'send-sing-up-email',
		triggers: { event: 'app/user.created' },
	},
	async ({ event, step, runId }) => {
		const userProfile = `
    - Country: ${event.data.country}
    - Investment Goals: ${event.data.investmentGoals}
    - Risk Tolerance: ${event.data.riskTolerance}
    - Preferred Industry: ${event.data.preferredIndustry}
    `;

		const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile);

		const response = await step.ai.infer('generate-welcome-intro', {
			model: step.ai.models.gemini({ model: 'gemini-2.5-flash' }),
			body: {
				contents: [
					{
						role: 'user',
						parts: [
							{
								text: prompt,
							},
						],
					},
				],
			},
		});
		await step.run('send-welcome-email', async () => {
			const part = response.candidates?.[0]?.content?.parts?.[0];
			const introText =
				(part && 'text' in part ? part.text : null) || 'Thanks for joining Signalist!';
			// ! Email send logic here
		});
		return {
			success: true,
			message: 'Welcome email sent successfully',
		};
	}
);
