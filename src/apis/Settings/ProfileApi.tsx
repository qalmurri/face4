import api from "../AuthTokenApi";
import type { UserSettingRequest } from "../../types/SettingsType";

export async function getSettingsUser(): Promise<UserSettingRequest> {
  const response = await api.get<UserSettingRequest>("me/");
  return response.data;
}

export async function putSettingsUser(data: Partial<UserSettingRequest>): Promise<UserSettingRequest> {
  const response = await api.put<UserSettingRequest>("update/", data);
  return response.data;
}