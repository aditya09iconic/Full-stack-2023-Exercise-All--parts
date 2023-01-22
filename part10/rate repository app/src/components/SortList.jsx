import React from 'react';
import { View } from 'react-native';
import { Colors, IconButton, Menu, Searchbar } from 'react-native-paper';

import theme from '../theme';

const SortList = ({
  setOrderBy,
  orderEnums,
  searchKeyword,
  setSearchKeyword,
}) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <>
      <Searchbar
        style={theme.fontSizes.title}
        placeholder="Search"
        value={searchKeyword}
        onChangeText={(v) => setSearchKeyword(v)}
      />
      <View
        style={{
          paddingTop: 0,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          backgroundColor: Colors.grey200,
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              icon="menu"
              color={Colors.black}
              size={25}
              onPress={openMenu}
            />
          }
        >
          <Menu.Item disabled title="Select an item..." />
          <Menu.Item
            onPress={() => {
              setOrderBy({ ...orderEnums.latest, ...orderEnums.up });
            }}
            title="Latest repositories"
          />
          <Menu.Item
            onPress={() => {
              setOrderBy({ ...orderEnums.rating, ...orderEnums.down });
            }}
            title="Highest rated repositories"
          />
          <Menu.Item
            onPress={() => {
              setOrderBy({ ...orderEnums.rating, ...orderEnums.up });
            }}
            title="Lowest rated repositories"
          />
        </Menu>
      </View>
    </>
  );
};
export default SortList;
