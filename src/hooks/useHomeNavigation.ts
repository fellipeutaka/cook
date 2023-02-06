import { HomeStackParamList } from "@cook/@types/HomeStackParamList";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function useHomeNavigation() {
  return useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
}
