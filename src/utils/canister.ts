import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory, canisterId } from '../declarations/backend'

const agent = new HttpAgent({ host: 'http://localhost:4943' });
agent.fetchRootKey(); // Remove this in production

export const canister = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});