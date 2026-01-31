import axios from "axios";

console.log("KRAVIX KEY:", process.env.EXPO_PUBLIC_KRAVIX_STUDIO_API_KEY);

export const AiChatModal = async (messages: any) => {
  console.log("messages", messages);

  const response = await axios.post(
    "https://kravixstudio.com/api/v1/chat",
    {
      message: messages,
      aiModel: "gpt-4.1-mini",
      outputType: "text",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_KRAVIX_STUDIO_API_KEY}`,
      },
    },
  );

  console.log("response", response.data);

  return response.data;
};
