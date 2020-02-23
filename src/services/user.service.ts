import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { generateHash, verifyHash } from '../utilities/encryptionUtils';
import { sanitizeUser } from '../utilities/apiUtilities';

/**
 * Gets an User due its Id
 *
 * @param userId user Id
 * @returns The user
 */
const getUserById = async (userId: number) => {
  try {
    return await sanitizeUser(
      await getRepository(User).findOne({ id: userId })
    );
  } catch (e) {
    return null;
  }
};

/**
 * Gets an User due its email
 *
 * @param email User email
 * @param [getHash=false]
 * @returns The user
 */
const getUserByEmail = async (email: string, getHash: boolean = false) => {
  try {
    return await getRepository(User).findOne({ email });
  } catch (e) {
    return null;
  }
};

/**
 * Creates a new User
 *
 * @param email New user email
 * @param pass New user password
 * @param [name=''] New user name
 * @returns The new user
 */
const createUser = async (email: string, pass: string, name: string = '') => {
  const newUser = new User();
  newUser.email = email;
  newUser.password = await generateHash(pass, 10);
  newUser.name = name;
  return sanitizeUser(await getRepository(User).save(newUser));
};

/**
 * Updates an user
 *
 * @param user New user to update
 * @returns The new user
 */
const updateUser = async (user: User) => {
  return await getRepository(User).save(user);
};

/**
 * Login a user
 *
 * @param email Email to login
 * @param password Password to login
 * @returns
 */
const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email, true);
  if (user) {
    if (await verifyHash(password, user.password)) {
      user.lastLogin = new Date().getTime().toString();
      updateUser(user); // save user login time
      return sanitizeUser(user);
    }
  }
  return null;
};

export default {
  createUser,
  loginUser,
  getUserById,
};
