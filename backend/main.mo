import Trie "mo:base/Trie";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Option "mo:base/Option";
import Nat32 "mo:base/Nat32";
import Time "mo:base/Time";
import Bool "mo:base/Bool";

import Types "Types";
import Utils "Utils";

actor {
    type UserId = Types.UserId;
    type CampaignId = Types.CampaignId;

    type User = Types.User;
    type Users = Types.Users;
    type Campaign = Types.Campaign;
    type Campaigns = Types.Campaigns;

    stable var campaignId : CampaignId = 0;

    stable var users : Users = Trie.empty();
    stable var campaigns : Campaigns = Trie.empty();
    // stable var timeRemainings : TimeRemainings = Trie.empty();

    public func createUser(user : User) : async UserId {
        let userId = user.email;

        users := Trie.replace(
            users,
            Utils.key(userId),
            Text.equal,
            ?user,
        ).0;

        return userId;
    };

  public query func read(userId : UserId) : async ?User {
    let result = Trie.find(users, Utils.key(userId), Text.equal);
    return result;
  };

  public query func readAll() : async [(UserId, User)] {
    let resultAllData = Iter.toArray(Trie.iter(users));
    return resultAllData;
  };

  public func update(userId : UserId, userinput : User) : async Bool {
    let resultUser = Trie.find(users, Utils.key(userId), Text.equal);

    let data = Option.isSome(resultUser);

    if (data) {
      users := Trie.replace(
        users,
        Utils.key(userId),
        Text.equal,
        ?userinput,
      ).0;
    };
    return data;
  };

  public func delete(userId : UserId) : async Bool {
    let resultUser = Trie.find(users, Utils.key(userId), Text.equal);

    let data = Option.isSome(resultUser);

    if (data) {
      users := Trie.replace(
        users,
        Utils.key(userId),
        Text.equal,
        null,
      ).0;
    };
    return data;
  };

  public func createCampaign(author : UserId, title: Text, dueDate : Time.Time, description : Text, targetFund : Float) : async () {

    let campaign : Campaign = {
      author = author;
      title = title;
      description = description;
      targetFund = targetFund;
      currentFund = 0;
      totalParticipant = 0;
      dateCreated = Time.now();
      dueDate = dueDate;
      status = "Pending";
    };

    campaigns := Trie.replace(
        campaigns,
        Utils.campaignKey(campaignId),
        Nat32.equal,
        ?campaign,
    ).0;
    campaignId += 1;
  };

  public func updateCampaign(campaignId : CampaignId, timeRemaining : Time.Time) : async () {
    let resultCampaign = Trie.find(campaigns, Utils.campaignKey(campaignId), Nat32.equal);

    switch (resultCampaign) {
        case (?resultCampaign) {
          let setCampaignStatus : Campaign = {
            author = resultCampaign.author;
            title = resultCampaign.title;
            description = resultCampaign.description;
            targetFund = resultCampaign.targetFund;
            currentFund = resultCampaign.currentFund;
            totalParticipant = resultCampaign.totalParticipant;
            dueDate = resultCampaign.dueDate;
            status = Utils.campaignStatus(resultCampaign, timeRemaining);
          };
          campaigns := Trie.replace(
            campaigns,
            Utils.campaignKey(campaignId),
            Nat32.equal,
            ?setCampaignStatus,
          ).0;

        };
        case null {};
    };
  };

  public query func readAllCampaign() : async [(CampaignId, Campaign)] {
    let resultAllData = Iter.toArray(Trie.iter(campaigns));

    return resultAllData;
  };

};