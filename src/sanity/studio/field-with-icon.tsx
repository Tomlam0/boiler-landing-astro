import { Flex } from '@sanity/ui';
import type { ComponentType, CSSProperties } from 'react';
import type { FieldProps } from 'sanity';

interface IconProps {
  className?: string;
  style?: CSSProperties;
}

interface IconOptions {
  size?: number;
  color?: string;
}

export function withFieldIcon(Icon: ComponentType<IconProps>, options: IconOptions = {}) {
  const { size = 18, color = 'currentColor' } = options;
  return function FieldWithIcon(props: FieldProps) {
    const titleWithIcon = (
      <Flex align="center" gap={2}>
        <Icon style={{ width: size, height: size, color, flexShrink: 0 }} />
        <span>{props.title}</span>
      </Flex>
    );
    return props.renderDefault({
      ...props,
      title: titleWithIcon as unknown as string,
    });
  };
}
