import { useCallback } from "react";
import { If, Then } from "react-if";
import {
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";

import auth from "@react-native-firebase/auth";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ArrowsClockwise,
  Clock,
  MagnifyingGlass,
  ThumbsUp,
} from "phosphor-react-native";
import { zinc } from "tailwindcss/colors";

import type { Recipes, Result } from "@cook/@types/Recipes";
import { Avatar } from "@cook/components/ui/Avatar";
import { Button, ButtonText } from "@cook/components/ui/Button";
import { Spinner } from "@cook/components/ui/Spinner";
import { Text } from "@cook/components/ui/Text";
import * as TextField from "@cook/components/ui/TextField";
import { KeyboardAvoidingView } from "@cook/components/utils/KeyboardAvoidingView";
import { useAuth } from "@cook/hooks/useAuth";
import { useFavorites } from "@cook/hooks/useFavorites";
import { useHomeNavigation } from "@cook/hooks/useHomeNavigation";
import { api } from "@cook/lib/axios";

export function Home() {
  const { user } = useAuth();
  const { navigate } = useHomeNavigation();
  const { favorites, isLoading: isFavoritesLoading } = useFavorites(user);
  const {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<Recipes>({
    queryKey: ["/recipes/complexSearch?addRecipeInformation=true"],
    queryFn: async ({ queryKey, signal, pageParam = 0 }) => {
      const url = `${queryKey[0]}&offset=${pageParam * 10}`;
      const { data } = await api.get(url, {
        signal,
      });
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (Math.floor(lastPage.totalResults / lastPage.offset) <= 0) {
        return lastPage;
      } else {
        return lastPage.offset + 1;
      }
    },
  });

  const RecipeItem = useCallback(
    ({ item }: ListRenderItemInfo<Result>) => {
      return (
        <Pressable
          className="w-full h-64 relative mb-6"
          onPressIn={() => {}}
          onPress={() =>
            navigate("Recipe", {
              id: String(item.id),
              title: item.title,
              imageUrl: item.image,
              favorites,
              hasAlreadyFavorited: favorites.includes(String(item.id)),
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
      );
    },
    [favorites]
  );

  const keyExtractor = useCallback(({ id }: Result, index: number) => {
    return String(id + index);
  }, []);

  const fetchMoreRecipes = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading || isFavoritesLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Spinner />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-4 py-16">
        <Text className="text-lg font-bold text-center mb-4">
          An error occurred when trying to fetch for recipes 😔
        </Text>
        <Button
          onPress={() => refetch()}
          isLoading={isRefetching}
          spinnerProps={{ size: 24 }}
        >
          <ButtonText className="mr-2">Try again</ButtonText>
          <ArrowsClockwise color="white" />
        </Button>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView>
      <View className="flex-1 justify-center px-4 pt-16">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-green-700 mb-1">
              Hello, {user?.displayName}
            </Text>
            <Text className="text-base font-semibold text-zinc-400 dark:text-zinc-200 mb-4">
              What do you want to cook today?
            </Text>
          </View>
          <TouchableOpacity onPress={() => auth().signOut()}>
            <Avatar />
          </TouchableOpacity>
        </View>
        <TextField.Root>
          <MagnifyingGlass color={zinc[400]} />
          <TextField.Input
            className="placeholder:font-medium placeholder:text-base ml-3"
            placeholder="Search by recipes"
          />
        </TextField.Root>
        <FlatList
          className="mt-6"
          data={data?.pages.map((page) => page.results).flat()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
          renderItem={RecipeItem}
          keyExtractor={keyExtractor}
          onEndReached={fetchMoreRecipes}
          onEndReachedThreshold={0.25}
          ListFooterComponent={
            <If condition={isFetchingNextPage}>
              <Then>
                <Spinner />
              </Then>
            </If>
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
}
