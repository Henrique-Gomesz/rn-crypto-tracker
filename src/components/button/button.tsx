import { Text } from "src/components/text/text";
import { useAppSelector } from "src/hooks/store-hook";
import { ButtonContainer } from "./button.styles";

type Props = {
  onPress: () => void;
  text: string;
  size?: number;
  backgroundColor?: string;
};

export const Button = ({
  onPress,
  text,
  size = 24,
  backgroundColor,
}: Props) => {
  const theme = useAppSelector((state) => state.theme);
  return (
    <ButtonContainer
      backgroundColor={backgroundColor}
      borderColor={theme.colors.darkGreen}
      onPress={onPress}
    >
      <Text size={size} color={theme.colors.lightGreen}>
        {text}
      </Text>
    </ButtonContainer>
  );
};
