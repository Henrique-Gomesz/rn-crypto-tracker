import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { isEmpty } from "lodash";
import React, { useMemo } from "react";

import { Crypto } from "src/entities/crypto";
import { useAppSelector } from "src/hooks/store-hook";
import { CryptoListItem } from "../crypto-list-item/crypto-list-item";
import { DismissKeyboard } from "../dismiss-keyboard/dismiss-keyboard";
import { Separator } from "../separator/separator";
import { TextField } from "../text-field/text-field";
import {
  Container,
  CryptoListContainer,
  IconContainer,
  TextFieldContainer,
  Title,
  TitleContainer,
} from "./search-crypto-sheet.styles";
import { FlatList } from "react-native-gesture-handler";
import { sortByName } from "src/utils/sort-by-name";

type Props = {
  onClose: () => void;
  onItemPress: (crypto: Crypto) => void;
  searchValue: string;
  handleSearch: (text: string) => void;
};

export const SearchCryptoSheet = ({
  onClose,
  onItemPress,
  handleSearch,
  searchValue,
}: Props) => {
  const cryptos = useAppSelector((state) => state.app.cryptos);
  const userCryptos = useAppSelector((state) => state.app.userCryptos);
  const theme = useAppSelector((state) => state.theme);

  const queryData = useMemo(() => {
    // todo use chunk to create a pagination
    return cryptos
      .filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchValue.toLowerCase())
      )
      .sort((a, b) => sortByName(a.name, b.name));
  }, [searchValue]);

  function itemIsSelected(crypto: Crypto) {
    return userCryptos.some((userCrypto) => userCrypto.id === crypto.id);
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
            value={searchValue}
            onChangeText={handleSearch}
            placeholder="Bitcoin, Ethereum, Doge"
          />
        </TextFieldContainer>
        <CryptoListContainer>
          <FlatList
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <Separator backgroundColor={theme.colors.lightGray} />
            )}
            scrollEnabled={true}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <CryptoListItem
                backgroundColor={theme.colors.white}
                textColor={theme.colors.darkGray}
                onPress={onItemPress}
                crypto={item.item}
                isSelected={itemIsSelected(item.item)}
              />
            )}
            data={isEmpty(searchValue) ? [] : queryData}
          />
        </CryptoListContainer>
      </Container>
    </DismissKeyboard>
  );
};
