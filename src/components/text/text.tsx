import React from "react";
import { BaseText } from "./text.styles";
import { useAppSelector } from "src/hooks/store-hook";
import { useFonts, DoppioOne_400Regular } from "@expo-google-fonts/doppio-one";

type Props = {
  children: string;
  size?: number;
  color?: string;
};

export const Text = ({ children, color, size }: Props) => {
  const theme = useAppSelector((state) => state.theme);

  let [fontsLoaded] = useFonts({
    DoppioOne_400Regular,
  });

  if (!fontsLoaded) {
    return;
  }

  return (
    <>
      <BaseText
        fontFamily="DoppioOne_400Regular"
        size={size ?? theme.fontSizes.medium}
        color={color ?? theme.colors.white}
      >
        {children}
      </BaseText>
    </>
  );
};
