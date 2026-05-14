import { Inngest } from 'inngest';

export const inngest = new Inngest({
	id: 'stock-market',
	ai: {
		model: 'gemini-2.5-flash',
		apiKey: process.env.GEMINI_API_KEY,
	},
	steps: {
		hello: {
			data: {
				name: '{{event.data.name}}',
			},
		},
	},
});
