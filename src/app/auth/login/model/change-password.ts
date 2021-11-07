export interface ChangePassword {
  forGotPassword: Boolean
  email:string;
  tokenCode:string;
  newPassword: string;
  reNewPassword: string;
}
