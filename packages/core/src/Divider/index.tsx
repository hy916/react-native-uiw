import React, { Component } from 'react';
import { View, Text, ViewProps, TextProps, StyleSheet } from 'react-native';
import { Theme } from '../theme';
import { useTheme } from '@shopify/restyle';

export interface DividerProps extends ViewProps {
  label?: string;
  gutter?: number;
  style?: ViewProps['style'];
  lineStyle?: ViewProps['style'];
  labelStyle?: TextProps['style'];
  type?: 'horizontal' | 'vertical';
  /** 分割线标题的位置 */
  orientation?: 'left' | 'right' | 'center';
}

export default function Divider(props: DividerProps) {
  let {
    children,
    style,
    gutter = 8,
    label,
    lineStyle,
    labelStyle,
    type = 'horizontal',
    orientation = 'center',
    ...restProps
  } = props;

  const theme = useTheme<Theme>();

  const styles = createStyles({
    textColor: theme.colors.primary_text || 'rgba(0, 0, 0, 0.54)',
  });

  if (typeof children === 'string') {
    label = children;
    children = null;
  }
  const lineStyleArr = [];
  const warpperStyles = [];
  const startStyles = [];
  const endStyles = [];
  if (type === 'horizontal') {
    warpperStyles.unshift(styles.horizontal);
    lineStyleArr.unshift(styles.lineHorizontal);
    lineStyleArr.unshift({ marginHorizontal: gutter });
  }
  if (type === 'vertical') {
    warpperStyles.unshift(styles.vertical);
    lineStyleArr.unshift(styles.lineVertical);
    lineStyleArr.unshift({ marginVertical: gutter });
  }
  if (!children && label) {
    if (labelStyle && typeof labelStyle === 'number') {
      labelStyle = StyleSheet.flatten(labelStyle);
    }
    children = (
      <Text testID="RNE__Divider__label" style={[styles.label, labelStyle, {}]}>
        {' '}
        {label}{' '}
      </Text>
    );
  }
  if (lineStyle && typeof lineStyle === 'number') {
    lineStyle = StyleSheet.flatten(lineStyle);
  }
  if (orientation === 'left') {
    endStyles.unshift({ flexGrow: 100 });
  }
  if (orientation === 'right') {
    startStyles.unshift({ flexGrow: 100 });
  }
  const lineStart = (
    <View testID="RNE__Divider__start" style={[styles.lineStart, ...lineStyleArr, ...startStyles, lineStyle]} />
  );
  const lineEnd = (
    <View testID="RNE__Divider__end" style={[styles.lineEnd, ...lineStyleArr, ...endStyles, lineStyle]} />
  );
  return (
    <View testID="RNE__Divider__wrap" style={[styles.warpper, ...warpperStyles, style]} {...restProps}>
      {lineStart}
      {children}
      {children && lineEnd}
    </View>
  );
}

type CreStyle = {
  textColor: string;
};

function createStyles({ textColor }: CreStyle) {
  return StyleSheet.create({
    warpper: {
      alignItems: 'center',
    },
    horizontal: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexGrow: 1,
      flexShrink: 1,
    },
    vertical: {
      justifyContent: 'center',
      flexDirection: 'column',
      flexGrow: 1,
      flexShrink: 1,
    },
    lineStart: {
      backgroundColor: 'rgb(229, 229, 229)',
      flexDirection: 'column',
      flexShrink: 100,
      flexGrow: 1,
    },
    lineEnd: {
      backgroundColor: 'rgb(229, 229, 229)',
      flexDirection: 'column',
      flexShrink: 100,
      flexGrow: 1,
    },
    lineHorizontal: {
      height: 1,
      minHeight: 1,
      minWidth: 16,
    },
    lineVertical: {
      width: 1,
      minHeight: 16,
      minWidth: 1,
    },
    label: {
      color: textColor,
      fontSize: 14,
    },
  });
}
