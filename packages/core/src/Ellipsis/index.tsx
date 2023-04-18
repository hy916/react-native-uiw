import React from 'react';
import PropTypes from 'prop-types';
import { TextProps } from 'react-native';
import Text from '../Typography/Text';

export interface EllipsisProps extends TextProps {
  children?: React.ReactNode;
  placeholder?: string;
  maxLen?: number;
}

export default function Ellipsis({ maxLen, children, placeholder, ...props }: EllipsisProps) {
  let content = children;
  if (maxLen && content && typeof content === 'string') {
    content = content.length > maxLen ? content.substr(0, maxLen) + placeholder : content;
  }
  return <Text {...props}>{content}</Text>;
}

Ellipsis.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.string]),
  placeholder: PropTypes.string,
  maxLen: PropTypes.number,
};
Ellipsis.defaultProps = {
  placeholder: '...',
};
