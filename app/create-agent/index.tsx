import CustomButton from "@/component/Ui/CustomButton";
import { AgentContext } from "@/context/AgentContext";
import { useNavigation, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { EmojiKeyboard } from "rn-emoji-keyboard";

export default function CreateAgent() {
  const [emoji, setEmoji] = useState("👾");
  const [agentName, setAgentName] = useState("");
  const [instruction, setInstruction] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const { getAgentData } = useContext(AgentContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Create Agent",
    });
  }, [navigation]);

  const createAgent = () => {
    if (!agentName || !instruction! || !emoji) {
      return Toast.show({
        type: "error",
        text1: "Please fill all the fields",
        text2: "error",
      });
    } else {
      Toast.show({
        type: "success",
        text1: "You have successfully created an agent",
        text2: "Created",
        visibilityTime: 2000,
      });
      router.push({
        pathname: "/chat",
        params: {
          agentName: agentName,
          initialText: "",
          initialPrompt: instruction,
        },
      });
      getAgentData({ agentName, initialPrompt: instruction, emoji });
    }
    setAgentName("");
    setInstruction("");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <View className="flex-1 p-5">
        <View className="items-center justify-center mb-6">
          <TouchableOpacity
            className="w-20 h-20 items-center justify-center border-2 border-LIGHT_GRAY rounded-[16px] bg-white"
            onPress={() => setIsOpen(true)}
          >
            <Text style={{ fontSize: 40 }}>{emoji}</Text>
          </TouchableOpacity>
          <Text className="mt-2 text-gray-500">Tap to select emoji</Text>
        </View>
        {isOpen && (
          <View
            className="absolute inset-0 z-50"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity className="flex-1" onPress={() => setIsOpen(false)} activeOpacity={1} />
            <EmojiKeyboard
              open={isOpen}
              onClose={() => setIsOpen(false)}
              onEmojiSelected={(e) => {
                setEmoji(e.emoji);
                setIsOpen(false);
              }}
              enableSearchBar={true}
              categoryPosition="top"
              styles={{
                container: {
                  backgroundColor: "#fff",
                },
                // @ts-ignore
                searchBarContainer: {
                  backgroundColor: "#f2f2f2",
                },
              }}
            />
          </View>
        )}

        <View className="flex flex-col gap-4">
          <View>
            <Text className="mb-1 text-base font-medium">Agent/Assistant Name</Text>
            <TextInput
              placeholder="Enter agent name"
              className="px-4 py-4 text-base bg-white border border-gray-200 rounded-lg"
              value={agentName}
              onChangeText={(val) => setAgentName(val)}
            />
          </View>
          <View>
            <Text className="mb-1 text-base font-medium">Instructions</Text>
            <TextInput
              placeholder="Enter instructions for your agent..."
              className="h-[200px] py-4 px-4 text-base rounded-lg bg-white border border-gray-200"
              style={{ textAlignVertical: "top" }}
              multiline={true}
              value={instruction}
              onChangeText={(val) => setInstruction(val)}
            />
          </View>
        </View>

        <View className="mt-6">
          <CustomButton
            title={"Create Agent"}
            className="p-4 bg-PRIMARY rounded-[15px]"
            textClassName="text-base font-semibold text-center text-WHITE"
            onPress={createAgent}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
