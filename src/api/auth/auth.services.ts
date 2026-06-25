import bcrypt from 'bcrypt';
import { signToken } from '../../utils/jwt';
import { User, IUser } from './auth.model';

const SALT_ROUNDS = 10;

export const registerUser = async (data: any): Promise<IUser> => {
  const { name, email, password } = data;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return newUser;
};

export const loginUser = async (data: any): Promise<string> => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = signToken({ id: (user._id as string).toString(), email: user.email });

  return token;
};
