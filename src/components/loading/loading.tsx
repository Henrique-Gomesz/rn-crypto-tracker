import React from "react";
import { ActivityIndicator } from "react-native";

type Props = {
  isLoading: boolean;
  color?: string;
};

export const Loading = ({ isLoading, color }: Props) => {
  return <>{isLoading && <ActivityIndicator size={32} color={color} />}</>;
};
