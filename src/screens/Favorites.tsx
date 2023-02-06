import type { Result as Recipes } from "@cook/@types/Recipes";
import { Spinner } from "@cook/components/ui/Spinner";
import { Text } from "@cook/components/ui/Text";
import { useQueries, UseQueryOptions } from "@tanstack/react-query";
import { Heart } from "phosphor-react-native";
import { Else, If, Then } from "react-if";
import {
  FlatList,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { useFavorites } from "@cook/hooks/useFavorites";
import { useAuth } from "@cook/hooks/useAuth";
import { useHomeNavigation } from "@cook/hooks/useHomeNavigation";
import { EmptyFavorites } from "@cook/components/ui/EmptyFavorites";
import firestore from "@react-native-firebase/firestore";

export function Favorites() {
  const { user } = useAuth();
  const { favorites, isLoading: isFavoritesLoading } = useFavorites(user);
  const favoriteList = useQueries({
    queries: favorites.map<UseQueryOptions<Recipes, Error>>((favorite) => ({
      queryKey: [`/recipes/${favorite}/information`, favorite],
    })),
  });
  const { navigate } = useHomeNavigation();

  async function handleRemoveFromFavorites(id: string) {
    try {
      const newFavoritesList = favorites.filter((favorite) => favorite !== id);
      await firestore()
        .collection("users")
        .doc(user?.uid)
        .update("favorites", newFavoritesList);
    } catch (err) {
      console.error(err);
    }
  }

  if (favoriteList.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <View className="flex-1 px-4 pt-16">
      <Text className="text-2xl font-bold text-green-700 mb-1">
        My Favorites
      </Text>
      <If
        condition={
          favoriteList.some((favorite) => favorite.isLoading) ||
          isFavoritesLoading
        }
      >
        <Then>
          <View className="flex-1 justify-center items-center">
            <Spinner />
          </View>
        </Then>
        <Else>
          <FlatList
            className="mt-6"
            data={favoriteList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 64, paddingRight: 16 }}
            numColumns={2}
            horizontal={false}
            renderItem={({ item }) => (
              <Pressable
                className="w-1/2 h-32 relative mb-6 mr-4"
                onPress={() =>
                  navigate("Recipe", {
                    id: String(item.data?.id),
                    title: item.data?.title!,
                    imageUrl: item.data?.image!,
                    favorites,
                    hasAlreadyFavorited: favorites.includes(
                      String(item.data?.id)
                    ),
                  })
                }
              >
                <ImageBackground
                  className="flex-1 absolute inset-0 rounded-lg overflow-hidden"
                  source={{ uri: item.data?.image }}
                  resizeMode="cover"
                >
                  <View className="flex-1 justify-between p-2 bg-black/60">
                    <TouchableOpacity
                      className="flex-row justify-end items-center"
                      onPress={() =>
                        handleRemoveFromFavorites(String(item.data?.id))
                      }
                    >
                      <Heart weight="fill" color="white" />
                    </TouchableOpacity>
                    <Text
                      numberOfLines={2}
                      className="text-white text-lg font-semibold"
                    >
                      {item.data?.title}
                    </Text>
                  </View>
                </ImageBackground>
              </Pressable>
            )}
            keyExtractor={({ data }) => String(data?.id)}
          />
        </Else>
      </If>
    </View>
  );
}
