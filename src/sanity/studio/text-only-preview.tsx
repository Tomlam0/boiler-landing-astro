import { Text } from '@sanity/ui';
import type { PreviewProps } from 'sanity';

export function TextOnlyPreview(props: PreviewProps) {
  return (
    <Text size={1} textOverflow="ellipsis">
      {typeof props.title === 'string' ? props.title : ''}
    </Text>
  );
}
