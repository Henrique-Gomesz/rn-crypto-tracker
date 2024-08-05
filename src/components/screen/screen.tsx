import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import {
  HeaderContainer,
  HeaderContentContainer,
  IconContainer,
  ScreenContainer,
} from "./screen.styles";
import { useAppSelector } from "src/hooks/store-hook";
import { DismissKeyboard } from "../dismiss-keyboard/dismiss-keyboard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView } from "react-native";

type Props = {
  children: React.ReactElement[] | React.ReactElement;
  onGoBack?: () => void;
  withHeader?: boolean;
  HeaderContent?: React.ReactElement;
  shouldDismissKeyboard?: boolean;
};

export const Screen = ({
  children,
  withHeader = false,
  onGoBack,
  HeaderContent,
  shouldDismissKeyboard = true,
}: Props) => {
  const theme = useAppSelector((state) => state.theme);

  function renderContent() {
    return (
      <ScreenContainer backgroundColor={theme.colors.primary}>
        <ExpoStatusBar style={theme.statusBarStyle} />
        {withHeader && (
          <HeaderContainer>
            <IconContainer onPress={onGoBack}>
              <MaterialIcons
                name="arrow-back"
                size={24}
                color={theme.colors.white}
              />
            </IconContainer>
            <HeaderContentContainer>{HeaderContent}</HeaderContentContainer>
          </HeaderContainer>
        )}
        {children}
      </ScreenContainer>
    );
  }

  if (shouldDismissKeyboard) {
    return <DismissKeyboard>{renderContent()}</DismissKeyboard>;
  }

  return renderContent();
};
