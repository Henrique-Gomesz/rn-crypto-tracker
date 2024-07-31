import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { useAppSelector } from "src/hooks/store-hook";
import { getImageUrlByName } from "src/utils/get-image-name";
import { CryptoListItem } from "../crypto-list-item/crypto-list-item";
import { DismissKeyboard } from "../dismiss-keyboard/dismiss-keyboard";
import { TextField } from "../text-field/text-field";
import {
  Container,
  CryptoListContainer,
  IconContainer,
  TextFieldContainer,
  Title,
  TitleContainer,
} from "./search-crypto-sheet.styles";
import { Separator } from "../separator/separator";
import { Crypto } from "src/entities/crypto";

type Props = {
  onClose: () => void;
  onItemPress: (crypto: Crypto) => void;
};

export const SearchCryptoSheet = ({ onClose, onItemPress }: Props) => {
  const cryptos = useAppSelector((state) => state.app.cryptos);
  const [searchText, setSearchText] = useState("");
  const theme = useAppSelector((state) => state.theme);

  function handleSearch(text: string) {
    setSearchText(text);
  }

  return (
    <DismissKeyboard>
      <Container backgroundColor={theme.colors.white}>
        <IconContainer onPress={onClose}>
          <MaterialIcons color={theme.colors.darkGray} size={28} name="close" />
        </IconContainer>
        <TitleContainer>
          <Title color={theme.colors.darkGray}>{"Search Cryptos"}</Title>
        </TitleContainer>
        <TextFieldContainer>
          <TextField
            value={searchText}
            onChangeText={handleSearch}
            placeholder="Bitcoin, Ethereum, Doge"
          />
        </TextFieldContainer>
        <CryptoListContainer>
          <FlatList
            ItemSeparatorComponent={() => (
              <Separator backgroundColor={theme.colors.lightGray} />
            )}
            scrollEnabled={true}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <CryptoListItem
                textColor={theme.colors.darkGray}
                onPress={onItemPress}
                crypto={item.item}
              />
            )}
            data={cryptos}
          />
        </CryptoListContainer>
      </Container>
    </DismissKeyboard>
  );
};
