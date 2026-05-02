import { betterAuth, type Auth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { connectToDatabase } from '@/db/mongoose';
import { nextCookies } from 'better-auth/next-js';

let authInstance: Auth | null = null;

export const getAuth = async () => {
	if (authInstance) return authInstance;

	const mongoose = await connectToDatabase();
	const db = mongoose.connection.db;

	if (!db) throw new Error('MongoDB connection not found');

	authInstance = betterAuth({
		database: mongodbAdapter(db),
		secret: process.env.BETTER_AUTH_SECRET,
		baseURL: process.env.BETTER_AUTH_URL,
		emailAndPassword: {
			enabled: true,
			disableSignUp: false,
			requireEmailVerification: false,
			minPasswordLength: 8,
			maxPasswordLength: 128,
			autoSignIn: true,
		},
		plugins: [nextCookies()],
	}) as unknown as Auth;

	return authInstance;
};

export const auth = await getAuth();
