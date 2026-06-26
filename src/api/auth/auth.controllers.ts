import { Request, Response } from 'express'
import { registerUser, loginUser } from './auth.services'

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body
    const user = await registerUser({ name, email, password })
    res.status(201).json({ message: 'User registered successfully', userId: user._id })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const token = await loginUser({ email, password })
    res.status(200).json({ token })
  } catch (error: any) {
    res.status(401).json({ error: error.message })
  }
}
