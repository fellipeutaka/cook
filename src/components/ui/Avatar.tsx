import { useAuth } from "@cook/hooks/useAuth";
import { getInitialLetterOfName } from "@cook/utils/getInitialLetterOfName";
import { Else, If, Then } from "react-if";
import { Image, View } from "react-native";
import { Text } from "./Text";

export function Avatar() {
  const { user } = useAuth();

  return (
    <If condition={user?.photoURL}>
      <Then>
        <Image
          className="rounded-full"
          source={{ uri: user?.photoURL!, width: 48, height: 48 }}
        />
      </Then>
      <Else>
        <View className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 justify-center items-center">
          <Text className="font-semibold text-base">
            {getInitialLetterOfName(user?.displayName ?? "")}
          </Text>
        </View>
      </Else>
    </If>
  );
}
