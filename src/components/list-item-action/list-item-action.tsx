import React from "react";
import { Container, IconContainer } from "./list-item-action.styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  color: string;
  name: keyof typeof MaterialIcons.glyphMap;
  size: number;
};

export const ListItemAction = ({ color, name, size }: Props) => {
  return (
    <Container>
      <IconContainer>
        <MaterialIcons color={color} name={name} size={size} />
      </IconContainer>
    </Container>
  );
};
