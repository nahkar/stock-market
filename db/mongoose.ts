import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

type MongooseConnection = Awaited<ReturnType<typeof mongoose.connect>>;

declare global {
	var mongooseCache:
		| {
				conn: MongooseConnection | null;
				promise: Promise<MongooseConnection> | null;
		  }
		| undefined;
}

let cached = global.mongooseCache;

if (!cached) {
	cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async (): Promise<MongooseConnection> => {
	if (!MONGODB_URI) {
		throw new Error('MONGODB_URI must be set in the environment variables');
	}

	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGODB_URI, {
			bufferCommands: false,
		});
	}

	try {
		cached.conn = await cached.promise;
	} catch (error) {
		cached.promise = null;
		throw error;
	}

	console.log('Connected to MongoDB successfully');
	return cached.conn;
};
