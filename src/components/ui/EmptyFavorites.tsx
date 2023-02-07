import { View } from "react-native";

import { Eye } from "phosphor-react-native";

import { useHomeNavigation } from "@cook/hooks/useHomeNavigation";

import { Button, ButtonText } from "./Button";
import { Text } from "./Text";

export function EmptyFavorites() {
  const { navigate } = useHomeNavigation();
  return (
    <View className="flex-1 justify-center items-center px-4 py-16">
      <Text className="text-lg font-bold text-center mb-4">
        You don't have any recipes added to favorites 😔
      </Text>
      <Button onPress={() => navigate("List")}>
        <ButtonText className="mr-2">
          How about taking a look at some recipes?
        </ButtonText>
        <Eye color="white" />
      </Button>
    </View>
  );
}
