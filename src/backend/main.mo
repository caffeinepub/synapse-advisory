import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Principal "mo:core/Principal";

actor {
  type ConsultationRequest = {
    id : Nat;
    name : Text;
    email : Text;
    company : Text;
    message : Text;
    serviceInterest : Text;
    timestamp : Time.Time;
  };

  module ConsultationRequest {
    public func compareByTimestamp(a : ConsultationRequest, b : ConsultationRequest) : Order.Order {
      Nat.compare(a.timestamp.toNat(), b.timestamp.toNat());
    };
  };

  let requests = Map.empty<Nat, ConsultationRequest>();
  var nextId = 0;

  public shared ({ caller }) func submitRequest(name : Text, email : Text, company : Text, message : Text, serviceInterest : Text) : async Nat {
    if (name.isEmpty() or email.isEmpty() or message.isEmpty()) {
      Runtime.trap("Name, email, and message cannot be empty");
    };

    let id = nextId;
    let request : ConsultationRequest = {
      id;
      name;
      email;
      company;
      message;
      serviceInterest;
      timestamp = Time.now();
    };

    requests.add(id, request);
    nextId += 1;
    id;
  };

  public query ({ caller }) func getRequest(id : Nat) : async ConsultationRequest {
    switch (requests.get(id)) {
      case (null) { Runtime.trap("Request not found") };
      case (?request) { request };
    };
  };

  public query ({ caller }) func getAllRequests() : async [ConsultationRequest] {
    requests.values().toArray();
  };

  public query ({ caller }) func getRequestsByServiceInterest(serviceInterest : Text) : async [ConsultationRequest] {
    requests.values().toArray().filter(
      func(request) {
        request.serviceInterest == serviceInterest;
      }
    );
  };

  public shared ({ caller }) func deleteRequest(id : Nat) : async () {
    switch (requests.get(id)) {
      case (null) { Runtime.trap("Request already deleted") };
      case (?_) {
        requests.remove(id);
      };
    };
  };
};
