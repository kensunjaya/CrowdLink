import { canister } from './canister';

export async function readUser(userId: any) {
  const user = await canister.read(userId);
  console.log('User data:', user);
}