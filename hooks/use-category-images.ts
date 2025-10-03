import { useImage } from "expo-image";

const categoryImages: { [key: string]: string } = {
  "Kött (lokalt)":
    "https://static.vecteezy.com/system/resources/previews/049/799/009/non_2x/steak-meat-beef-isolated-transparent-background-png.png",
  "Mjölk & Mejeri - självhällning": require("../assets/images/milk2.png"),
  "Jordgubbar - självplock":
    "https://png.pngtree.com/png-clipart/20250312/original/pngtree-strawberry-png-image_20645247.png",
  "Potatis - självplock": require("../assets/images/potato.png"),
  "Majs - självplock":
    "https://static.vecteezy.com/system/resources/thumbnails/024/392/745/small_2x/fresh-yellow-corn-isolated-illustration-ai-generative-png.png",
  "Grönsaker - Gårdsbutik":
    "https://img.pikbest.com/png-images/20240923/colorful-fresh-vegetables-and-herbs-clipart-illustration_10880264.png!bw700",
  "Honung & Biprodukter - Butik":
    "https://png.pngtree.com/png-clipart/20230930/original/pngtree-yellow-honey-jar-png-file-png-image_13018945.png",
};

export function useCategoryImage(category: string) {
  let url: string = categoryImages[category];
  if (!url) {
    url = "https://picsum.photos/1000/800";
  }

  const image = useImage(url, { maxWidth: 200 });
  return image;
}
