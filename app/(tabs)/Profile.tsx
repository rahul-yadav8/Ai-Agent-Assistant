import { useRouter } from "expo-router";
import { Clock, Compass, LogOut, PlusCircle } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type MenuItem = {
  title: string;
  path: "/(tabs)/Home" | "/(tabs)/Explore" | "/(tabs)/History" | "/create-agent";
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  {
    title: "Create Agent",
    icon: <PlusCircle size={24} color="#4F8EF7" />,
    path: "/create-agent",
  },
  {
    title: "Explore",
    icon: <Compass size={24} color="#4F8EF7" />,
    path: "/(tabs)/Explore",
  },
  {
    title: "My History",
    icon: <Clock size={24} color="#4F8EF7" />,
    path: "/(tabs)/History",
  },
  {
    title: "Logout",
    icon: <LogOut size={24} color="#FF4C4C" />,
    path: "/(tabs)/Home",
  },
];

const Profile = () => {
  const router = useRouter();

  return (
    <View className="flex-1 gap-10 py-10 bg-WHITE">
      <View className="items-center">
        <Image
          source={require("../../assets/agent_1.png")}
          className="w-[100px] h-[100px] rounded-full bg-slate-400"
        />
        <Text className="p-1 text-base font-bold text-GRAY">user@gmail.com</Text>
      </View>

      <View className="w-[90%] self-center">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            className="flex-row py-4 border-b border-LIGHT_GRAY"
            key={index}
            onPress={() => router.replace(item.path)}
          >
            {item.icon}
            <Text className="ml-4 text-base text-[#333]">{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Profile;
