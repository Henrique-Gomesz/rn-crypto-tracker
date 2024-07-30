import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { ScreenContainer } from "./screen.styles";
import { useAppSelector } from "src/hooks/store-hook";

type Props = {
  children: React.ReactElement[];
};

export const Screen = ({ children }: Props) => {
  const theme = useAppSelector((state) => state.theme);

  return (
    <ScreenContainer backgroundColor={theme.colors.primary}>
      <ExpoStatusBar style={theme.statusBarStyle} />
      {children}
    </ScreenContainer>
  );
};
