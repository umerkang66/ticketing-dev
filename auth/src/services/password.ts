import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  // Static methods are the methods that can be access without creating an instance of class (it can be accessed from the class itself)
  static async toHash(password: string) {
    // Async process are handled in event loop but heavy processes like hashing (crypto module) are sent off to the libuv library
    // Salt is the part of hashing process
    const salt = randomBytes(8).toString('hex');
    // Hashing || This returns a buffer (a buffer is like an array with raw data in it)
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    // We have to create a buffer from salt we got from
    const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buffer.toString('hex') === hashedPassword;
  }
}
