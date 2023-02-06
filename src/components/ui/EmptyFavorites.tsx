import { useHomeNavigation } from "@cook/hooks/useHomeNavigation";
import { View, TouchableOpacity } from "react-native";
import { Text } from "./Text";

export function EmptyFavorites() {
  const { navigate } = useHomeNavigation();
  return (
    <View className="flex-1 ml-auto">
      <Text className="text-lg font-bold text-center mb-4">
        You don't have any recipes added to favorites 😔
      </Text>
      <TouchableOpacity
        className="bg-green-600 rounded-full p-3 items-center"
        onPress={() => navigate("List")}
      >
        <Text className="text-center text-base font-bold">
          How about taking a look at some recipes?
        </Text>
      </TouchableOpacity>
    </View>
  );
}
