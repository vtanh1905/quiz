import * as crypto from 'crypto';

const KEY = '0123456789abcdef0123456789abcdef';
const IV = '0123456789abcdef';

export function encryptDataByAES256(data: string): string {
  const cipher = crypto.createCipheriv('aes-256-cbc', KEY, IV);
  let encryptedData: string = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}

export function decryptDataByAES256(encryptedData: string): string {
  const decipher = crypto.createDecipheriv('aes-256-cbc', KEY, IV);
  let decryptedData: string = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}
