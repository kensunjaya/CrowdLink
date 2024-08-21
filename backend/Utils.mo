import Types "Types";
import Trie "mo:base/Trie";
import Text "mo:base/Text";

module{

    type UserId = Types.UserId;

    public func key(t : UserId) : Trie.Key<UserId> {
        return { hash = Text.hash t; key = t };
    };
}