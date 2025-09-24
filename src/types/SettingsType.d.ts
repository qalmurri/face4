export interface UserSettingRequest {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  date_joined?: string;
}