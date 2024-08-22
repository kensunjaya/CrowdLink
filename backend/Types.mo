import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Float "mo:base/Float";
import Nat32 "mo:base/Nat32";
import Time "mo:base/Time";

module {
    // Campaign Type
    public type UserId = Text;
    public type CampaignId = Nat32;

    public type Campaign = {
        author : UserId;
        title : Text;
        description : Text;
        targetFund : Float;
        currentFund : Float;
        totalParticipant : Nat32;
        dueDate : Time.Time;
        status : Text;
        donation : Trie.Trie<UserId, Float>;
    };

    public type Campaigns = Trie.Trie<CampaignId, Campaign>;

    // User Type

    public type User = {
        username : Text;
        email : Text;
        password : Text;
        balance : Float;
    };

    public type Users = Trie.Trie<UserId, User>;

};