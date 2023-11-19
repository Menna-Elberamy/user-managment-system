import { userCredential } from "../models/userCredential";
import { userModel } from "../models/users.model";

export class LoginAction {
    static readonly type = '[userState] LoginAction';
    constructor(public credentials: userCredential) {}
  }

// export class GetUsers {
//     static readonly type = '[userState] GetUsers';
//     constructor() {}
//   }
export class SaveAuthintcatedUser {
    static readonly type = '[userState] SaveAuthintcatedUser';
    constructor() {}
  }

  export class EditAuthintcatedUser {
    static readonly type = '[userState] EditAuthintcatedUser';
    constructor(public user:userModel) {}
  }  
  export class DeleteAuthintcatedUser {
    static readonly type = '[userState] DeleteAuthintcatedUser';
    constructor(public userId:number) {}
  }  