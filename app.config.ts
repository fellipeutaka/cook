import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Cook",
  slug: "cook",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  platforms: ["android", "ios"],
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#65A30D",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.fellipeutaka.cook",
    googleServicesFile: process.env.GOOGLE_SERVICE_INFO_PLIST,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#65A30D",
    },
    package: "com.fellipeutaka.cook",
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
  },
  plugins: [
    "@react-native-firebase/app",
    "@react-native-firebase/auth",
    "@react-native-google-signin/google-signin",
  ],
  extra: {
    eas: {
      projectId: "0d96324a-298b-4578-aac1-1ebb38923a74",
    },
  },
});
