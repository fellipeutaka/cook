import { HomeStackParamList } from "@cook/@types/HomeStackParamList";
import type { Recipes } from "@cook/@types/Recipes";
import { useNavigation } from "@react-navigation/native";
import { ThumbsUp, Clock } from "phosphor-react-native";
import { FlatList, ImageBackground, Pressable, View } from "react-native";
import { Text } from "./Text";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RecipeListProps = {
  data?: Recipes;
};

export function RecipeList({ data }: RecipeListProps) {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <FlatList
      className="mt-6"
      data={data?.results}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 64 }}
      renderItem={({ item }) => (
        <Pressable
          className="w-full h-64 relative mb-6"
          onPressIn={() => {}}
          onPress={() =>
            navigate("Recipe", {
              id: String(item.id),
              title: item.title,
              imageUrl: item.image,
            })
          }
        >
          <ImageBackground
            className="flex-1 absolute inset-0 rounded-lg overflow-hidden"
            source={{ uri: item.image }}
            resizeMode="cover"
          >
            <View className="flex-1 justify-between px-4 py-6 bg-black/60">
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-medium">
                  {item.sourceName}
                </Text>
                <View className="flex-row items-center">
                  <ThumbsUp color="white" />
                  <Text className="text-white ml-1">{item.aggregateLikes}</Text>
                </View>
              </View>
              <View>
                <Text className="text-white text-xl font-semibold">
                  {item.title}
                </Text>
                <View className="flex-row items-center mt-4">
                  <Clock color="white" />
                  <Text className="text-white ml-1">
                    {item.readyInMinutes} min
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </Pressable>
      )}
      keyExtractor={({ id }) => String(id)}
    />
  );
}
