'use server';

import { connectToDatabase } from '@/db/mongoose';

export const getAllUsersForNewsEmail = async () => {
	try {
		const mongoose = await connectToDatabase();
		const db = await mongoose.connection.db;
		if (!db) {
			throw new Error('Failed to connect to database');
		}
		const users = await db
			.collection('user')
			.find(
				{ email: { $exists: true, $ne: null } },
				{
					projection: { email: 1, id: 1, _id: 1, country: 1, name: 1 },
				}
			)
			.toArray();
		console.log(123, users);
		return users
			.filter((user) => user.email && user.name)
			.map(({ email, id, name }) => ({ email, id, name }));
	} catch (error) {
		console.error(error);
		return [];
	}
};
