import React from "react";
import { BaseText } from "./text.styles";
import { useAppSelector } from "src/hooks/store-hook";
import { useFonts, DoppioOne_400Regular } from "@expo-google-fonts/doppio-one";
import { LayoutChangeEvent } from "react-native";

type Props = {
  children: React.ReactNode | undefined;
  size?: number;
  color?: string;
  textAlign?: "center" | "left" | "right";
  onLayout?: (event: LayoutChangeEvent) => void;
};

export const Text = ({ children, color, size, textAlign, onLayout }: Props) => {
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
        onLayout={onLayout}
        textAlign={textAlign ?? "left"}
        fontFamily="DoppioOne_400Regular"
        size={size ?? theme.fontSizes.medium}
        color={color ?? theme.colors.white}
      >
        {children}
      </BaseText>
    </>
  );
};
