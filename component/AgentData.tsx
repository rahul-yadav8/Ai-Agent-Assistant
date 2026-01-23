import { agents } from "@/shared/AgentList";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import AgentCard from "./AgentCard";
import NonFeatureAgent from "./NonFeatureAgent";

export default function AgentData({ isFeature }: { isFeature: boolean }) {
  const router = useRouter();

  const filteredAgent = agents.filter((item) => item.featured === isFeature);

  return (
    <View>
      <FlatList
        data={filteredAgent}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flex: 1, padding: 5 }}
            onPress={() =>
              router.push({
                pathname: "/chat",
                params: {
                  agentName: item.name,
                  initialText: item.initialText,
                  initialPrompt: item.prompt,
                },
              })
            }
          >
            {isFeature ? <AgentCard agent={item} /> : <NonFeatureAgent agent={item} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
