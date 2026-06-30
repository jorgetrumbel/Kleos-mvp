// components/ui/Avatar.tsx

import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';

import { Camera } from 'lucide-react-native';

import {
  colors,
  typography,
  borderRadius,
} from '@/theme';

export type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  source?: ImageSourcePropType;

  initials?: string;

  size?: AvatarSize;

  status?: 'online' | 'offline';

  editable?: boolean;

  onPress?: () => void;

  style?: ViewStyle;
}

const sizes: Record<
  AvatarSize,
  {
    container: number;
    text: number;
    dot: number;
    camera: number;
  }
> = {
  sm: {
    container: 32,
    text: 12,
    dot: 8,
    camera: 12,
  },

  md: {
    container: 48,
    text: 16,
    dot: 10,
    camera: 14,
  },

  lg: {
    container: 72,
    text: 24,
    dot: 14,
    camera: 18,
  },
};

export function Avatar({
  source,
  initials,
  size = 'md',
  status,
  editable = false,
  onPress,
  style,
}: AvatarProps) {
  const { container, text, dot, camera } = sizes[size];

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={!onPress}
      onPress={onPress}
      style={style}
    >
      <View
        style={[
          styles.avatar,
          {
            width: container,
            height: container,
            borderRadius: container / 2,
          },
        ]}
      >
        {source ? (
          <Image
            source={source}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        ) : (
          <Text
            style={[
              styles.initials,
              {
                fontSize: text,
              },
            ]}
          >
            {initials?.slice(0, 2).toUpperCase()}
          </Text>
        )}
      </View>

      {status && (
        <View
          style={[
            styles.status,
            {
              width: dot,
              height: dot,
              borderRadius: dot / 2,
              backgroundColor:
                status === 'online'
                  ? colors.success
                  : colors.mutedForeground,
            },
          ]}
        />
      )}

      {editable && (
        <View style={styles.cameraBadge}>
          <Camera
            size={camera}
            color="#FFFFFF"
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',

    borderWidth: 2,
    borderColor: colors.background,
  },

  initials: {
    color: '#FFFFFF',
    fontFamily: typography.fontFamily.semibold,
  },

  status: {
    position: 'absolute',
    bottom: 2,
    right: 2,

    borderWidth: 2,
    borderColor: colors.background,
  },

  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,

    width: 24,
    height: 24,

    borderRadius: borderRadius.full,

    backgroundColor: colors.primary,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,
    borderColor: colors.background,
  },
});