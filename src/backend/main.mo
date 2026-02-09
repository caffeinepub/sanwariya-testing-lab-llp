import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type TestRequest = {
    id : Text;
    customerName : Text;
    company : ?Text;
    phone : Text;
    email : ?Text;
    testItemType : Text;
    standards : ?Text;
    message : ?Text;
    preferredDate : ?Int;
    submittedAt : Int;
  };

  public type ContactSubmission = {
    id : Text;
    name : Text;
    phone : Text;
    email : ?Text;
    message : Text;
    submittedAt : Int;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let testRequests = Map.empty<Text, TestRequest>();
  let contactSubmissions = Map.empty<Text, ContactSubmission>();

  var nextId = 0;

  module TimeOrder {
    public func compare(a : { submittedAt : Int }, b : { submittedAt : Int }) : Order.Order {
      Int.compare(b.submittedAt, a.submittedAt);
    };
  };

  func getNextId() : Text {
    let id = nextId.toText();
    nextId += 1;
    id;
  };

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Test Request Functions
  public shared ({ caller }) func submitTestRequest(
    customerName : Text,
    company : ?Text,
    phone : Text,
    email : ?Text,
    testItemType : Text,
    standards : ?Text,
    message : ?Text,
    preferredDate : ?Int,
  ) : async Text {
    // No authorization check - guests can submit test requests
    let id = getNextId();
    let request : TestRequest = {
      id;
      customerName;
      company;
      phone;
      email;
      testItemType;
      standards;
      message;
      preferredDate;
      submittedAt = Time.now();
    };
    testRequests.add(id, request);
    id;
  };

  public query ({ caller }) func getTestRequests(limit : Nat, offset : Nat) : async [TestRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view test requests");
    };
    let requests = testRequests.values().toArray();
    let sorted = requests.sort();
    sorted.sliceToArray(offset, if (offset + limit > sorted.size()) { sorted.size() } else {
      offset + limit
    });
  };

  public query ({ caller }) func getTestRequestById(id : Text) : async ?TestRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view test requests");
    };
    testRequests.get(id);
  };

  public shared ({ caller }) func deleteTestRequest(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete test requests");
    };
    testRequests.remove(id);
  };

  // Contact Submission Functions
  public shared ({ caller }) func submitContactForm(
    name : Text,
    phone : Text,
    email : ?Text,
    message : Text,
  ) : async Text {
    // No authorization check - guests can submit contact forms
    let id = getNextId();
    let submission : ContactSubmission = {
      id;
      name;
      phone;
      email;
      message;
      submittedAt = Time.now();
    };
    contactSubmissions.add(id, submission);
    id;
  };

  public query ({ caller }) func getContactSubmissions(limit : Nat, offset : Nat) : async [ContactSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    let submissions = contactSubmissions.values().toArray();
    let sorted = submissions.sort();
    sorted.sliceToArray(offset, if (offset + limit > submissions.size()) {
      submissions.size();
    } else { offset + limit });
  };

  public query ({ caller }) func getContactSubmissionById(id : Text) : async ?ContactSubmission {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contactSubmissions.get(id);
  };

  public shared ({ caller }) func deleteContactSubmission(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete contact submissions");
    };
    contactSubmissions.remove(id);
  };
};
