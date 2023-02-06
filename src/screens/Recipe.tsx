import { HomeStackParamList } from "@cook/@types/HomeStackParamList";
import type { Recipe } from "@cook/@types/Recipe";
import { Spinner } from "@cook/components/ui/Spinner";
import { Text } from "@cook/components/ui/Text";
import { If, Then, Else } from "react-if";
import { useSelectColor } from "@cook/hooks/useSelectColor";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { X, Heart, Leaf, Fire, Pizza, Egg } from "phosphor-react-native";
import { useState } from "react";
import { Dimensions, ImageBackground, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RenderHtml from "react-native-render-html";
import firestore from "@react-native-firebase/firestore";
import { useAuth } from "@cook/hooks/useAuth";

const width = Dimensions.get("window").width;

export function Recipe() {
  const select = useSelectColor();
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const { params } = useRoute<RouteProp<HomeStackParamList, "Recipe">>();
  const { data, isLoading } = useQuery<Recipe>({
    queryKey: [
      `/recipes/${params.id}/information?includeNutrition=true`,
      params.id,
    ],
    staleTime: Infinity,
  });
  const [isIngredientsActive, setIsIngredientsActive] = useState(true);
  const [isFavorited, setIsFavorited] = useState(params.hasAlreadyFavorited);

  async function handleAddToFavorites() {
    try {
      if (isFavorited) {
        const newFavoritesList = params.favorites.filter(
          (favorite) => favorite !== params.id
        );
        setIsFavorited(false);
        await firestore()
          .collection("users")
          .doc(user?.uid)
          .update("favorites", newFavoritesList);
      } else {
        setIsFavorited(true);
        await firestore()
          .collection("users")
          .doc(user?.uid)
          .update("favorites", [params.id, ...params.favorites]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ScrollView>
      <View className="flex-1">
        <ImageBackground source={{ uri: params.imageUrl }} resizeMode="cover">
          <View className="flex-row justify-between h-[40vh] px-6 py-12 bg-black/20">
            <TouchableOpacity
              className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-xl"
              onPress={goBack}
            >
              <X color={select("white", "black")} />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-xl"
              onPress={handleAddToFavorites}
            >
              <Heart
                weight={isFavorited ? "fill" : "regular"}
                color={select("white", "black")}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View className="px-4 py-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 -mt-16">
          <Text className="text-2xl font-bold mb-2">{params.title}</Text>
          <If condition={isLoading}>
            <Then>
              <Spinner className="mt-4" />
            </Then>
            <Else>
              <RenderHtml
                baseStyle={{ color: select("white", "black") }}
                contentWidth={width}
                source={{ html: data?.summary! }}
              />
              <View className="flex-row justify-between items-center my-4 px-8">
                <View>
                  <View className="flex-row items-center mb-4">
                    <View className="bg-zinc-300 dark:bg-zinc-700 p-1 rounded-lg mr-2">
                      <Leaf color={select("white", "black")} />
                    </View>
                    <Text>
                      {Math.round(data?.nutrition?.nutrients[3]?.amount!)}
                      {data?.nutrition?.nutrients[3]?.unit} carbs
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="bg-zinc-300 dark:bg-zinc-700 p-1 rounded-lg mr-2">
                      <Egg color={select("white", "black")} />
                    </View>
                    <Text>
                      {Math.round(data?.nutrition?.nutrients[8]?.amount!)}
                      {data?.nutrition?.nutrients[8]?.unit} proteins
                    </Text>
                  </View>
                </View>
                <View>
                  <View className="flex-row items-center mb-4">
                    <View className="bg-zinc-300 dark:bg-zinc-700 p-1 rounded-lg mr-2">
                      <Fire color={select("white", "black")} />
                    </View>
                    <Text>
                      {Math.round(data?.nutrition?.nutrients[0]?.amount!)}{" "}
                      {data?.nutrition?.nutrients[0]?.unit}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="bg-zinc-300 dark:bg-zinc-700 p-1 rounded-lg mr-2">
                      <Pizza color={select("white", "black")} />
                    </View>
                    <Text>
                      {Math.round(data?.nutrition?.nutrients[1]?.amount!)}
                      {data?.nutrition?.nutrients[1]?.unit} fats
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex-row justify-center dark:bg-zinc-800 rounded-3xl p-0.5 mb-4">
                <View className="w-1/2">
                  <TouchableOpacity
                    className={clsx(
                      "h-12 justify-center items-center rounded-full",
                      { "bg-green-700": isIngredientsActive }
                    )}
                    onPress={() => setIsIngredientsActive(true)}
                  >
                    <Text className="font-bold text-base text-white">
                      Ingredients
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="w-1/2">
                  <TouchableOpacity
                    className={clsx(
                      "h-12 justify-center items-center rounded-full",
                      { "bg-green-700": !isIngredientsActive }
                    )}
                    onPress={() => setIsIngredientsActive(false)}
                  >
                    <Text className="font-bold text-base">Instructions</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text className="text-green-900 font-bold text-xl">
                {isIngredientsActive ? "Ingredients" : "Instructions"}
              </Text>
              <If condition={isIngredientsActive}>
                <Then>
                  {data?.extendedIngredients
                    .filter(
                      (value, index, self) =>
                        index === self.findIndex((t) => t.id === value.id)
                    )
                    .map((ingredient) => (
                      <Text key={String(ingredient.id)}>
                        {ingredient.original}
                      </Text>
                    ))}
                </Then>
                <Else>
                  <Text>{data?.instructions}</Text>
                </Else>
              </If>
            </Else>
          </If>
        </View>
      </View>
    </ScrollView>
  );
}
