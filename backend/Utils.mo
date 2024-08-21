import Types "Types";
import Trie "mo:base/Trie";
import Text "mo:base/Text";

module{

    type UserId = Types.UserId;
    type CampaignId = Types.CampaignId;

    public func key(t : UserId) : Trie.Key<UserId> {
        return { hash = Text.hash t; key = t };
    };

    public func campaignKey(x: CampaignId) : Trie.Key<CampaignId> {
        return { hash = x; key = x; };
    };
}