import { useContext } from 'react';
import { canister } from './canister';
import { Users } from './interfaces';

export async function readUser(userId: any) {
  const user = await canister.read(userId);
  console.log('User data:', user);
}

export async function readAllUser() {
  try {
    const users = await canister.readAll();
    console.log(users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function createUser(username: string, email: string, password: string) {
  try {
    await canister.createUser({ username: username, email: email, password: password, balance: 0 });
    return true; // success
  }
  catch (error) {
    console.error("Failed creating new user:", error);
    return false; // fail
  }

}


export async function getUserByEmail(email: string) {
  try {
    const user = await canister.read(email) as any;
    return user[0];
  }
  catch (error) {
    console.error("Error fetching user with email:", email);
    return null;
  }

}


export async function createCampaign(author: string, title: string, description: string, targetFund: number, dueDate: string) {
  try {
    await canister.createCampaign({ author: author, title: title, description: description, targetFund: targetFund, dueDate: dueDate, currentFund: 0, totalParticipant: 0 });
    return true;
  }
  catch (error) {
    console.error("Error creating campaign:", error);
    return false;
  }
}

export async function getAllCampaigns() {
  try {
    const campaigns = await canister.readAllCampaign();
    return campaigns;
  }
  catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
}