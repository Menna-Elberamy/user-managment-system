import { userCredential } from "../models/userCredential";
import { userModel } from "../models/users.model";

export class LoginAction {
    static readonly type = '[userState] LoginAction';
    constructor(public credentials: userCredential) {}
  }

export class GetUsers {
    static readonly type = '[userState] GetUsers';
    constructor() {}
  }
export class GetAuthintcatedUsers {
    static readonly type = '[userState] GetAuthintcatedUsers';
    constructor(public userModel:userModel ) {}
  }