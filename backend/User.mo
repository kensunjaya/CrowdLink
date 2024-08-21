import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
actor User {

  public type UserId = Text;

  public type Users = {
    username : Text;
    email : Text;
    password : Text;
  };

  private stable var users : Trie.Trie<UserId, Users> = Trie.empty();

  public func createUser(user : Users) : async UserId {
    let user_id = user.email;

    users := Trie.replace(
      users,
      key(user_id),
      Text.equal,
      ?user,
    ).0;

    return user_id;
  };

  public query func read(user_id : UserId) : async ?Users {
    let result = Trie.find(users, key(user_id), Text.equal);
    return result;
  };

  public query func readAll() : async [(UserId, Users)] {
    let resultAllData = Iter.toArray(Trie.iter(users));
    return resultAllData;
  };

  public func update(user_id : UserId, userinput : Users) : async Bool {
    let resultUser = Trie.find(users, key(user_id), Text.equal);

    let data = Option.isSome(resultUser);

    if (data) {
      users := Trie.replace(
        users,
        key(user_id),
        Text.equal,
        ?userinput,
      ).0;
    };
    return data;
  };

  public func delete(user_id : UserId) : async Bool {
    let resultUser = Trie.find(users, key(user_id), Text.equal);

    let data = Option.isSome(resultUser);

    if (data) {
      users := Trie.replace(
        users,
        key(user_id),
        Text.equal,
        null,
      ).0;
    };
    return data;
  };

  private func key(t : UserId) : Trie.Key<UserId> {
    return { hash = Text.hash t; key = t };
  };

};