import mongoose from 'mongoose';
import { env } from '../env';
const DATABASE = env.DATABASE

export async function main() {
    if (!DATABASE) {
        console.error('Error: DATABASE is not defined in the environment variables.');
        process.exit(1); 
    }
    await mongoose.connect(DATABASE);
}
