import type { Recipes } from "@cook/@types/Recipes";
import { Spinner } from "@cook/components/Spinner";
import { Text } from "@cook/components/Text";
import { useQuery } from "@tanstack/react-query";
import { FlatList, ImageBackground, Pressable, View } from "react-native";
import { Timer, ThumbsUp, MagnifyingGlass } from "phosphor-react-native";
import * as TextField from "@cook/components/TextField";
import { zinc } from "tailwindcss/colors";
import { KeyboardAvoidingView } from "@cook/components/KeyboardAvoidingView";

export function Home() {
  const { data, isLoading } = useQuery<Recipes>({
    queryKey: ["/recipes/complexSearch?number=4&addRecipeInformation=true"],
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Spinner />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView>
      <View className="flex-1 justify-center px-4 pt-16">
        <Text className="text-2xl font-bold text-green-700 mb-1">
          Hello, John Doe
        </Text>
        <Text className="text-base font-semibold text-zinc-400 dark:text-zinc-200 mb-4">
          What do you want to cook today?
        </Text>
        <TextField.Root>
          <MagnifyingGlass color={zinc[400]} style={{ marginRight: 12 }} />
          <TextField.Input
            className="placeholder:font-medium placeholder:text-base"
            placeholder="Search by recipes"
          />
        </TextField.Root>
        <FlatList
          className="mt-6"
          data={data?.results}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
          renderItem={({ item }) => (
            <Pressable
              className="w-full h-64 relative mb-6"
              onPressIn={() => console.log("onPressIn")}
              onPressOut={() => console.log("onPressOut")}
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
                      <Text className="text-white ml-1">
                        {item.aggregateLikes}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text className="text-white text-xl font-semibold">
                      {item.title}
                    </Text>
                    <View className="flex-row items-center mt-4">
                      <Timer color="white" />
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
      </View>
    </KeyboardAvoidingView>
  );
}
