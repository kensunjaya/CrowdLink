import Trie "mo:base/Trie";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Option "mo:base/Option";

import Types "Types";
import Utils "Utils";

actor {
    public type UserId = Text;

    type User = Types.User;
    type Users = Types.Users;

    stable var users : Users = Trie.empty();

    public func createUser(user : User) : async UserId {
        let user_id = user.email;

        users := Trie.replace(
            users,
            Utils.key(user_id),
            Text.equal,
            ?user,
        ).0;

        return user_id;
    };

  public query func read(user_id : UserId) : async ?User {
    let result = Trie.find(users, Utils.key(user_id), Text.equal);
    return result;
  };

  public query func readAll() : async [(UserId, User)] {
    let resultAllData = Iter.toArray(Trie.iter(users));
    return resultAllData;
  };

  public func update(user_id : UserId, userinput : User) : async Bool {
    let resultUser = Trie.find(users, Utils.key(user_id), Text.equal);

    let data = Option.isSome(resultUser);

    if (data) {
      users := Trie.replace(
        users,
        Utils.key(user_id),
        Text.equal,
        ?userinput,
      ).0;
    };
    return data;
  };

  public func delete(user_id : UserId) : async Bool {
    let resultUser = Trie.find(users, Utils.key(user_id), Text.equal);

    let data = Option.isSome(resultUser);

    if (data) {
      users := Trie.replace(
        users,
        Utils.key(user_id),
        Text.equal,
        null,
      ).0;
    };
    return data;
  };

};