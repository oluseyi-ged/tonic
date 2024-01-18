/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {HDP, PADDING_HORIZONTAL, WP} from '@helpers';
import React, {FunctionComponent} from 'react';
import {FlatList, ScrollView, StyleSheet, View, ViewStyle} from 'react-native';
import styles from './styles';

type Props = {
  style?: ViewStyle;
  paddingHorizontal?: number;
  children?: React.ReactNode | React.ReactNode[];
  isFixed?: boolean;
  [x: string]: any;
};

export const Screen: FunctionComponent<Props> = ({
  style,
  paddingHorizontal = WP(PADDING_HORIZONTAL),
  children,
  isFixed = false,
  ...otherProps
}) => {
  const scrollableView = () => {
    return (
      <ScrollView
        style={styles.container}
        nestedScrollEnabled={true}
        contentContainerStyle={StyleSheet.flatten([
          styles.contentContainer,
          {paddingHorizontal},
          style,
        ])}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={false}
        {...otherProps}>
        {children}
      </ScrollView>
    );
  };

  const fixedView = () => {
    return (
      <View
        style={StyleSheet.flatten([
          styles.container,
          {paddingHorizontal},
          style,
        ])}
        {...otherProps}>
        {children}
      </View>
    );
  };
  return isFixed ? fixedView() : scrollableView();
};

/* ANCHOR SCROLL AREA */
interface ScrollAreaProps {
  horizontal?: boolean;
  flexGrow?: number;
  refValue?: any;
  style?: any;
  children?: React.ReactNode;
  showsVerticalScrollIndicator?: boolean;
  havePadding?: boolean;
  [x: string]: any;
}
export const ScrollArea = ({
  flexGrow,
  horizontal,
  style,
  refValue,
  children,
  showsVerticalScrollIndicator,
  havePadding,
  ...props
}: ScrollAreaProps) => (
  <ScrollView
    {...props}
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={[
      {flexGrow: flexGrow},
      havePadding && {paddingBottom: HDP(50)},
    ]}
    horizontal={horizontal}
    showsVerticalScrollIndicator={showsVerticalScrollIndicator || false}
    showsHorizontalScrollIndicator={false}
    style={style}
    ref={refValue}>
    {children}
  </ScrollView>
);

interface FlatlistProps extends ScrollAreaProps {
  keyExtractor?: any;
  data?: any;
  renderItem?: any;
  footer?: any;
  header?: any;
  headerStyles?: any;
  stickyHeaderIndices?: number[];
  itemSepratorComponent?: React.ComponentType;
  CellRendererComponent?: React.ComponentType;
}

export const ScreenList: FunctionComponent<FlatlistProps> = ({
  style,
  data,
  renderItem,
  header,
  headerStyles,
  footer,
  stickyHeaderIndices,
  itemSepratorComponent,
  CellRendererComponent,
}) => (
  <FlatList
    data={data}
    renderItem={renderItem}
    CellRendererComponent={CellRendererComponent}
    nestedScrollEnabled
    listKey={Math.random().toString()}
    keyExtractor={(item: any, index: number) => JSON.stringify(item) + index}
    ListHeaderComponent={header}
    ItemSeparatorComponent={itemSepratorComponent}
    stickyHeaderIndices={stickyHeaderIndices}
    ListHeaderComponentStyle={StyleSheet.flatten([
      styles.headerContainer,
      headerStyles,
    ])}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={[styles.containerList, style]}
    style={{overflow: 'visible'}}
    ListFooterComponent={footer}
  />
);
