import { Text } from "src/components/text/text";
import { useAppSelector } from "src/hooks/store-hook";
import { ButtonContainer } from "./add-button.styles";

type Props = {
  onPress: () => void;
};

export const AddButton = ({ onPress }: Props) => {
  const theme = useAppSelector((state) => state.theme);
  return (
    <ButtonContainer borderColor={theme.colors.darkGreen} onPress={onPress}>
      <Text size={24} color={theme.colors.lightGreen}>
        {"+"}
      </Text>
    </ButtonContainer>
  );
};
