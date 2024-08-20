import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
actor User {

  public type UserId = Nat32;

  public type Users = {
    username : Text;
    email : Text;
  };

  private stable var id : UserId = 0;

  private stable var users : Trie.Trie<UserId, Users> = Trie.empty();

  public func createUser(user : Users) : async UserId {
    let user_id = id;
    id += 1;
    users := Trie.replace(
      users,
      key(user_id),
      Nat32.equal,
      ?user,
    ).0;

    return user_id;
  };

  public query func read(user_id : UserId) : async ?Users {
    let result = Trie.find(users, key(user_id), Nat32.equal);
    return result;
  };

  public query func readAll() : async [(UserId, Users)] {
    let resultAllData = Iter.toArray(Trie.iter(users));
    return resultAllData;
  };

  public func update(user_id: UserId, userinput: Users) : async Bool {
    let resultUser = Trie.find(users, key(user_id), Nat32.equal);

    let data = Option.isSome(resultUser);

    if(data){
      users := Trie.replace(
      users,
      key(user_id),
      Nat32.equal,
      ?userinput,
    ).0;
    };
    return data;
  };

  public func delete(user_id: UserId) : async Bool {
    let resultUser = Trie.find(users, key(user_id), Nat32.equal);

    let data = Option.isSome(resultUser);

    if(data){
      users := Trie.replace(
      users,
      key(user_id),
      Nat32.equal,
      null,
    ).0;
    };
    return data;
  };

  private func key(x : UserId) : Trie.Key<UserId> {
    return { hash = x; key = x };
  };

};
