import type { Recipes } from "@cook/@types/Recipes";
import { Spinner } from "@cook/components/ui/Spinner";
import { Text } from "@cook/components/ui/Text";
import { useQuery } from "@tanstack/react-query";
import { TouchableOpacity, View } from "react-native";
import { MagnifyingGlass } from "phosphor-react-native";
import * as TextField from "@cook/components/ui/TextField";
import { zinc } from "tailwindcss/colors";
import { KeyboardAvoidingView } from "@cook/components/utils/KeyboardAvoidingView";
import { RecipeList } from "@cook/components/ui/RecipeList";
import { useAuth } from "@cook/hooks/useAuth";
import { Avatar } from "@cook/components/ui/Avatar";
import auth from "@react-native-firebase/auth";
import { useFavorites } from "@cook/hooks/useFavorites";

export function Home() {
  const { user } = useAuth();
  const { favorites, isLoading: isFavoritesLoading } = useFavorites(user);
  const { data, isLoading } = useQuery<Recipes>({
    queryKey: ["/recipes/complexSearch?number=4&addRecipeInformation=true"],
  });

  if (isLoading || isFavoritesLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Spinner />
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
          <MagnifyingGlass color={zinc[400]} style={{ marginRight: 12 }} />
          <TextField.Input
            className="placeholder:font-medium placeholder:text-base"
            placeholder="Search by recipes"
          />
        </TextField.Root>
        <RecipeList data={data} favorites={favorites} />
      </View>
    </KeyboardAvoidingView>
  );
}
