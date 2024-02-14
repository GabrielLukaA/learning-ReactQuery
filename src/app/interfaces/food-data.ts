export interface FoodData {
  title: string;
  price: string;
  id: number;
  picture_url: string;
}

export interface FoodResponse {
  data:FoodData[]
}