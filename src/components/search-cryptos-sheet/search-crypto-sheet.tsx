import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { chunk, isEmpty } from "lodash";
import React, { useMemo, useState } from "react";

import { FlatList } from "react-native-gesture-handler";
import { Crypto } from "src/entities/crypto";
import { useAppSelector } from "src/hooks/store-hook";
import { sortByName } from "src/utils/sort-by-name";
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
  const [chunkIndex, setChunkIndex] = useState(0);
  const [data, setData] = useState<Crypto[]>([]);

  const queryValue = useMemo(() => {
    return cryptos
      .filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchValue.toLowerCase())
      )
      .sort((a, b) => sortByName(a.name, b.name));
  }, [searchValue]);

  const chunkData = useMemo(() => {
    const data = chunk(queryValue, 10);
    setData(data[0]);
    setChunkIndex(0);
    return data;
  }, [queryValue]);

  const nextChunk = () => {
    if (chunkIndex < chunkData.length - 1) {
      setChunkIndex((prev) => prev + 1);
      setData([...data, ...chunkData[chunkIndex + 1]]);
    }
  };

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
            onEndReached={nextChunk}
            renderItem={(item) => (
              <CryptoListItem
                backgroundColor={theme.colors.white}
                textColor={theme.colors.darkGray}
                onPress={onItemPress}
                crypto={item.item}
                isSelected={itemIsSelected(item.item)}
              />
            )}
            data={isEmpty(searchValue) ? [] : data}
          />
        </CryptoListContainer>
      </Container>
    </DismissKeyboard>
  );
};
