import type { ReactNode } from 'react';
import { StyleSheet, View, type DimensionValue, type ViewStyle } from 'react-native';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/layout';

type PhotoPlaceholderProps = {
  width: DimensionValue;
  height: DimensionValue;
  /** 흰 테두리. 지도 위 마커처럼 사진끼리 겹치거나 배경과 구분해야 할 때만 켠다. */
  bordered?: boolean;
  /** 강조 테두리 (맛보기, 선택된 사진 등) */
  highlighted?: boolean;
  style?: ViewStyle;
  /** 사진 위에 겹쳐 놓는 것 (배지, 거리 표시 등) */
  children?: ReactNode;
};

/** 흐릿한 사진 자리. 실제 사진이 붙기 전까지 회색 상자로 보여준다. */
export function PhotoPlaceholder({
  width,
  height,
  bordered = false,
  highlighted = false,
  style,
  children,
}: PhotoPlaceholderProps) {
  return (
    <View
      style={[
        styles.photo,
        { width, height },
        bordered && styles.bordered,
        highlighted && styles.highlighted,
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  photo: {
    backgroundColor: colors.lockedPhotoEdge,
    backgroundImage: `radial-gradient(circle, ${colors.lockedPhotoCenter}, ${colors.lockedPhotoEdge})`,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  bordered: {
    borderWidth: 3,
    borderColor: colors.background01,
  },
  highlighted: {
    borderWidth: 3,
    borderColor: colors.primary,
  },
});
