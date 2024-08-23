import { useContext } from 'react';
import { canister } from './canister';
import { CampaignInterface, Users } from './interfaces';

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


export async function createCampaign(author: string, title: string, description: string, targetFund: number, dueDate: number) {
  try {
    await canister.createCampaign(author, title, dueDate, description, targetFund);
    return true;
  }
  catch (error) {
    console.error("Error creating campaign:", error);
    return false;
  }
}

export async function getCampaignsSize() {
  try {
    const size = await canister.getCampaignsSize();
    return size;
  }
  catch (error) {
    console.error("Error fetching campaigns size:", error);
    return 0;
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

export const fetchCampaigns = async () => {
  try {
    const data = await getAllCampaigns() as [number, CampaignInterface][];
    data?.forEach(async (element) => {
      await updateCampaign(element[0], Number(element[1].dueDate) - Date.now() * 1000000);
    });
    const allCampaigns = await getAllCampaigns() as [number, CampaignInterface][];
    return allCampaigns;
  }
  catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
}

export async function updateCampaign(campaignId: number, remainingTime: number) {
  try {
    const success = await canister.updateCampaign(campaignId, remainingTime);
    return true;
  }
  catch (error) {
    console.error("Error updating campaigns:", error);
    return false
  }
}

export async function afterPayment(userId: string, campaignId: number, amount: number) {
  try {
    await canister.afterPayment(userId, campaignId, amount);
    return true;
  }
  catch (error) {
    console.error("Error after payment:", error);
    return false;
  }
}

export async function topUp(userId: string, amount: number) {
  try {
    await canister.topUp(userId, amount);
    return true;
  }
  catch (error) {
    console.error("Error on top up:", error);
    return false;
  }
}