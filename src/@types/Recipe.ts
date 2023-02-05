export type Recipe = {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: ExtendedIngredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  nutrition: Nutrition;
  summary: string;
  cuisines: any[];
  dishTypes: string[];
  diets: string[];
  occasions: any[];
  winePairing: WinePairing;
  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
  originalId: any;
  spoonacularSourceUrl: string;
};

export type ExtendedIngredient = {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: Measures;
};

export type Measures = {
  us: Us;
  metric: Metric;
};

export type Us = {
  amount: number;
  unitShort: string;
  unitLong: string;
};

export type Metric = {
  amount: number;
  unitShort: string;
  unitLong: string;
};

export type Nutrition = {
  nutrients: Nutrient[];
  properties: Property[];
  flavonoids: Flavonoid[];
  ingredients: Ingredient[];
  caloricBreakdown: CaloricBreakdown;
  weightPerServing: WeightPerServing;
};

export type Nutrient = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

export type Property = {
  name: string;
  amount: number;
  unit: string;
};

export type Flavonoid = {
  name: string;
  amount: number;
  unit: string;
};

export type Ingredient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: Nutrient2[];
};

export type Nutrient2 = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

export type CaloricBreakdown = {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
};

export type WeightPerServing = {
  amount: number;
  unit: string;
};

export type WinePairing = {
  pairedWines: string[];
  pairingText: string;
  productMatches: ProductMatch[];
};

export type ProductMatch = {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  averageRating: number;
  ratingCount: number;
  score: number;
  link: string;
};

export type AnalyzedInstruction = {
  name: string;
  steps: Step[];
};

export type Step = {
  number: number;
  step: string;
  ingredients: Ingredient2[];
  equipment: Equipment[];
  length?: Length;
};

export type Ingredient2 = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

export type Equipment = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

export type Length = {
  number: number;
  unit: string;
};
