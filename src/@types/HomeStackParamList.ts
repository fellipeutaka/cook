export type HomeStackParamList = {
  List: undefined;
  Recipe: {
    id: string;
    title: string;
    imageUrl: string;
    favorites: string[];
    hasAlreadyFavorited: boolean;
  };
};
