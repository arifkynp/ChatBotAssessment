import { api } from "./api";

export async function sendMessage(
  projectId: string,
  message: string
) {
  const res = await api.post(
    `/chat/${projectId}`,
    {
      message,
    }
  );

  return res.data;
}