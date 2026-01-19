import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}

export default function CustomButton({
  title,
  onPress,
  className = "",
  textClassName = "",
  disabled = false,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`
        items-center justify-center
        ${disabled ? "opacity-50" : ""}
        ${className}
      `}
      activeOpacity={0.8}
    >
      <Text className={textClassName}>{title}</Text>
    </TouchableOpacity>
  );
}
