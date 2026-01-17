import { router } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

interface customButtonProps {
  title: string;
}

export default function CustomButton({ title }: customButtonProps) {
  return (
    <Pressable className="w-full p-4 rounded-lg bg-PRIMARY" onPress={() => router.push("./(tabs)/Home")}>
      <Text className="text-base font-semibold text-center text-WHITE">{title}</Text>
    </Pressable>
  );
}
