import React, { Fragment } from 'react';
import {
  View,
  ViewProps,
  ViewStyle,
  TextStyle,
  StyleProp,
  Image,
  ImageStyle,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import Flex from '../Flex';
import { Theme } from '../theme';
import { useTheme } from '@shopify/restyle';
import Text, { BaseTextProps } from '../Typography/Text';

interface MaybeTextOrViewProps {
  children?: React.ReactNode;
}

function MaybeTextOrView({ children, ...otherProps }: MaybeTextOrViewProps & BaseTextProps & ViewProps) {
  if (typeof children === 'string' || (children && (children as any).type.displayName === 'Text')) {
    return (
      <Text color="text" {...otherProps}>
        {children}
      </Text>
    );
  }
  return <View {...otherProps}>{children}</View>;
}

type CreStyle = {
  color: string;
};

function createStyles({ color }: CreStyle) {
  return StyleSheet.create({
    defalut: {
      backgroundColor: color,
    },
    touchWarpper: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}

interface ItemData {
  icon?: React.ReactNode;
  text?: React.ReactNode;
}

export interface GridProps extends ViewProps {
  /**
   * 传入的菜单数据，`icon` 可以是 `ReactNode` 或者 `uri`
   * @default []
   */
  data?: ItemData[];
  /**
   * 列数
   * @default 4
   */
  columns?: number;
  /**
   * 是否有间隔线
   * @default true
   */
  hasLine?: boolean;
  /** 单元格样式 */
  itemStyle?: StyleProp<ViewStyle>;
  /** 单元格文本样式 */
  textStyle?: StyleProp<TextStyle & ViewStyle>;
  /** 图片样式，可设置图片/图标尺寸 */
  iconStyle?: StyleProp<ImageStyle & TextStyle & ViewStyle>;
  /** 自定义单元格 */
  renderItem?: (data: ItemData, index: number, row: number) => React.ReactNode;
  /** 点击宫格回调函数 */
  onPress?: (data: ItemData, index: number, row: number, event: GestureResponderEvent) => void;
}

export default function Grid(props: GridProps) {
  const theme = useTheme<Theme>();
  const styles = createStyles({
    color: theme.colors.background || '#fff',
  });
  const {
    style,
    data = [],
    iconStyle,
    textStyle,
    itemStyle,
    renderItem,
    hasLine = true,
    columns = 4,
    onPress,
    ...otherProps
  } = props;
  if (!Array.isArray(data)) {
    return null;
  }
  const childs: React.ReactNode[][] = [];
  let childItem: React.ReactNode[] = [];
  data.forEach((item, idx) => {
    if (idx !== 0 && idx % columns === 0) {
      childs.push(childItem);
      childItem = [];
    }
    let icon = null;
    if (React.isValidElement(item.icon)) {
      icon = item.icon;
    } else if (item.icon) {
      icon = (
        <Image
          style={[{ width: 36, height: 36 }, StyleSheet.flatten(iconStyle)]}
          source={typeof item.icon === 'number' ? item.icon : { uri: item.icon as string }}
        />
      );
    }
    if (renderItem && typeof renderItem === 'function') {
      childItem!.push(renderItem(item, idx, parseInt((idx / columns).toString(), 10) + 1));
    } else {
      const itemContent = (
        <Fragment>
          {icon && <MaybeTextOrView style={iconStyle}>{icon}</MaybeTextOrView>}
          <MaybeTextOrView style={[{ marginTop: 9, fontSize: 12 }, textStyle]}>{item.text}</MaybeTextOrView>
        </Fragment>
      );
      childItem!.push(
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={[{ height: 120 }, StyleSheet.flatten(itemStyle), { width: `${100 / columns}%` }]}
        >
          {onPress ? (
            <TouchableOpacity
              style={styles.touchWarpper}
              onPress={(e) => onPress(item, idx, parseInt((idx / columns).toString(), 10) + 1, e)}
            >
              {itemContent}
            </TouchableOpacity>
          ) : (
            itemContent
          )}
        </Flex>,
      );
    }
    if (idx === data.length - 1) {
      childs.push(childItem);
    }
  });
  return (
    <View style={[styles.defalut, style]} {...otherProps}>
      {childs.map((rowitem, rowidx) => (
        <Flex justify="start" key={rowidx}>
          {rowitem.map((item, idx) => {
            if (!React.isValidElement(item)) {
              return null;
            }
            const itemBorderStyle: ViewProps['style'] = {};
            if (hasLine) {
              const hairLineWidth = StyleSheet.hairlineWidth;
              itemBorderStyle.borderBottomWidth = childs.length - 1 === rowidx ? 0 : hairLineWidth;
              itemBorderStyle.borderRightWidth =
                rowitem.length - 1 === idx && rowitem.length === columns ? 0 : hairLineWidth;
              itemBorderStyle.borderBottomColor = theme.colors.gray100 || '#ddd';
              itemBorderStyle.borderRightColor = theme.colors.gray100 || '#ddd';
            }
            return React.cloneElement(item as React.ReactElement, {
              key: idx,
              style: [itemBorderStyle, item.props.style],
            });
          })}
        </Flex>
      ))}
    </View>
  );
}
