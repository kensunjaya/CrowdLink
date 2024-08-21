import Text "mo:base/Text";
import Trie "mo:base/Trie";

module {
    // User Type
    public type UserId = Text;

    public type User = {
        username : Text;
        email : Text;
        password : Text;
    };

    public type Users = Trie.Trie<UserId, User>;

    // Wallet Type
    
};