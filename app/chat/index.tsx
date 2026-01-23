import { AiChatModal } from "@/shared/GlobalApi";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Camera, Copy, Plus, Send } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

type Message = {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
};

export default function ChatUi() {
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  const { agentName, initialText, initialPrompt } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: agentName,
      headerRight: () => <Plus />,
    });
  }, [navigation, agentName]);

  useEffect(() => {
    if (hasInitialized) return;

    if (typeof initialText === "string") {
      setInputVal(initialText);
    }

    if (typeof initialPrompt === "string" && initialPrompt.trim()) {
      setMessages([
        {
          role: "assistant",
          content: initialPrompt,
        },
      ]);
    }

    setHasInitialized(true);
  }, [initialText, initialPrompt, hasInitialized]);

  const handleAsk = async () => {
    if (!inputVal.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: inputVal,
    };

    const loadingMessage: Message = {
      role: "assistant",
      content: "",
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInputVal("");

    try {
      const result = await AiChatModal([...messages, userMessage]);

      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { role: "assistant", content: result.aiResponse } : msg,
        ),
      );
    } catch (error) {
      console.log(error);
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { role: "assistant", content: "Something went wrong" } : msg,
        ),
      );
    }
  };

  const copyHandler = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Toast.show({
      type: "success",
      text1: "Copied",
      text2: "Message copied to clipboard",
    });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <FlatList
        data={messages}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 120,
          paddingHorizontal: 16,
        }}
        renderItem={({ item, index }) => {
          const isUser = item.role === "user";
          return (
            <View>
              <View
                className={`p-[10px] my-1 max-w-[75%] ${
                  isUser
                    ? "bg-PRIMARY self-end rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-sm"
                    : "bg-LIGHT_GRAY self-start rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-sm"
                }`}
              >
                {item.isLoading ? (
                  <View className="items-center px-2 py-1">
                    <ActivityIndicator size="small" color="#555" />
                    <Text className="mt-1 text-xs text-gray-500">Typing...</Text>
                  </View>
                ) : (
                  <View>
                    <Text className={`${isUser ? "text-WHITE" : "text-BLACK"} text-base`}>
                      {item.content}
                    </Text>
                    {item.role === "assistant" && index !== 0 && (
                      <Pressable onPress={() => copyHandler(item.content)} className="self-end mt-2">
                        <Copy color="gray" />
                      </Pressable>
                    )}
                  </View>
                )}
              </View>
            </View>
          );
        }}
      />
      <View className="flex-row items-center gap-2 p-3 border border-[#ccc] rounded-lg">
        <TouchableOpacity>
          <Camera />
        </TouchableOpacity>
        <TextInput
          placeholder="Type a message..."
          className="flex-1 w-full p-2 px-3 border rounded-full bg-WHITE"
          onChangeText={setInputVal}
          value={inputVal}
        />
        <TouchableOpacity className="p-2 rounded-full bg-PRIMARY" onPress={handleAsk}>
          <Send color="white" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
