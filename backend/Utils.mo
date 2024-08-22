import Types "Types";
import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Time "mo:base/Time";

module{

    type UserId = Types.UserId;
    type Campaign = Types.Campaign;
    type CampaignId = Types.CampaignId;

    public func key(t : UserId) : Trie.Key<UserId> {
        return { hash = Text.hash t; key = t };
    };

    public func campaignKey(x: CampaignId) : Trie.Key<CampaignId> {
        return { hash = x; key = x; };
    };

    public func campaignStatus(campaign : Campaign, remainingTime : Time.Time) : Text {
        let targetFund = campaign.targetFund;
        let currentFund = campaign.currentFund;

        var status = "";
        
        if(remainingTime > 0 and currentFund < targetFund){
            status := "Pending";
        }
        else if(remainingTime > 0 and currentFund >= targetFund){
            status := "Complete";
        }
        else if(remainingTime <= 0 and currentFund < targetFund){
            status := "Incomplete";
        }
        else if(remainingTime <= 0 and currentFund >= targetFund){
            status := "Closed"; 
        };

        return status;
    };

}