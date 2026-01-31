import { AiChatModal } from "@/shared/GlobalApi";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Camera, Copy, Plus, Send, X } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
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
  const [image, setImage] = useState<string | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  const { agentName, initialText, initialPrompt } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: agentName,
      headerRight: () => <Plus />,
    });
  }, [navigation, agentName]);

  // useEffect(() => {
  //   if (hasInitialized) return;

  //   if (typeof initialPrompt === "string" && initialPrompt.trim()) {
  //     setMessages([
  //       {
  //         role: "assistant",
  //         content: initialPrompt,
  //       },
  //     ]);
  //   }

  //   setHasInitialized(true);
  // }, [initialText, initialPrompt, hasInitialized]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

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
      console.log("catch error", error);
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

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Permission to access the media library is required.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 100 + keyboardHeight,
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
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          if (messages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
          }
        }}
      />

      <View
        style={{
          padding: 12,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E5E5",
          paddingBottom: keyboardHeight > 0 ? keyboardHeight : 12,
        }}
      >
        {image && (
          <View className="flex-row items-center mb-2">
            <Image
              source={{ uri: image }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                marginRight: 10,
              }}
            />
            <TouchableOpacity
              onPress={() => setImage(null)}
              className="absolute p-1 bg-gray-300 rounded-full -top-2 -right-2"
            >
              <X size={16} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <View className="flex-row items-center gap-2">
          <TouchableOpacity onPress={pickImage} className="p-2 bg-gray-100 rounded-full">
            <Camera size={22} color="#555" />
          </TouchableOpacity>

          <TextInput
            ref={inputRef}
            placeholder="Type a message..."
            className="flex-1 p-3 border border-LIGHT_GRAY rounded-xl bg-WHITE"
            onChangeText={setInputVal}
            value={inputVal}
            multiline
            maxLength={500}
            onFocus={() => {
              setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
              }, 100);
            }}
          />

          <TouchableOpacity
            className="p-3 rounded-full bg-PRIMARY"
            onPress={handleAsk}
            disabled={!inputVal.trim()}
          >
            <Send color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
