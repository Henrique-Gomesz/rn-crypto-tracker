import { Text } from "src/components/text/text";
import { ButtonContainer } from "./add-button.styles";
import { useAppSelector } from "src/hooks/store-hook";

export const AddButton = () => {
  const theme = useAppSelector((state) => state.theme);
  return (
    <ButtonContainer
      borderColor={theme.colors.darkGreen}
      onPress={() => console.log("test")}
    >
      <Text size={24} color={theme.colors.lightGreen}>
        {"+"}
      </Text>
    </ButtonContainer>
  );
};
