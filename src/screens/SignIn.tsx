import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AppleLogo, GoogleLogo } from "phosphor-react-native";

import hamburger from "@cook/assets/images/hamburger.jpeg";
import lemonade from "@cook/assets/images/lemonade.jpg";
import pizza from "@cook/assets/images/pizza.jpg";
import soup from "@cook/assets/images/soup.jpg";
import { Text } from "@cook/components/ui/Text";
import { useSelectColor } from "@cook/hooks/useSelectColor";

const carouselData = [pizza, hamburger, lemonade, soup];

const carouselWidth = Dimensions.get("window").width - 16 * 2;

export function SignIn() {
  const select = useSelectColor();

  async function handleSignInWithGoogle() {
    try {
      GoogleSignin.configure({
        webClientId:
          "143446230532-lt165te1oi0s4udie9tg4ubi6osfaiil.apps.googleusercontent.com",
      });

      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSignInWithApple() {
    console.warn("Not implemented yet");
  }

  return (
    <View className="flex-1 items-center px-4 py-8">
      <Carousel
        data={carouselData}
        width={144 + 16}
        height={176}
        style={{
          width: carouselWidth,
        }}
        loop
        autoPlay
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image
            source={item}
            resizeMode="cover"
            className="w-36 h-44 rounded-2xl"
          />
        )}
      />
      <Carousel
        data={carouselData}
        width={144 + 16}
        height={176}
        style={{
          width: carouselWidth,
          marginTop: 16,
        }}
        loop
        autoPlay
        defaultIndex={carouselData.length - 1}
        scrollAnimationDuration={1000}
        autoPlayReverse
        renderItem={({ item }) => (
          <Image
            source={item}
            resizeMode="cover"
            className="w-36 h-44 rounded-2xl"
          />
        )}
      />
      <Text className="text-center text-3xl font-bold mt-4 mb-8">
        Elevate your home cooking with our expertly curated recipes!
      </Text>
      <TouchableOpacity
        className="flex-row w-full justify-center items-center rounded-full border-2 border-zinc-200 dark:border-0 dark:bg-zinc-800 p-4"
        onPress={handleSignInWithGoogle}
      >
        <GoogleLogo color={select("white", "black")} />
        <Text className="font-semibold ml-2">Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row w-full justify-center items-center rounded-full bg-zinc-900 dark:bg-zinc-50 p-4 mt-4"
        onPress={handleSignInWithApple}
      >
        <AppleLogo color={select("black", "white")} />
        <Text className="font-semibold ml-2 text-white dark:text-black">
          Continue with Apple
        </Text>
      </TouchableOpacity>
    </View>
  );
}
