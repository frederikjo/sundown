import axios from "axios";

export interface RecepiesParametres {
  strMealThumb?: string;
}

export const Recipes = async () => {
  let result;
  try {
    result = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  return result;
};
