import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Colors } from '@siva/ui'
import React, { ReactNode, forwardRef, useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface HorizontalModalOption {
  icon?: JSX.Element
  label: string
  action: () => void
}

export interface HorizontalModalOptions {
  options: Array<HorizontalModalOption>
}

export interface HorizontalModalSheetProps {
  options?: HorizontalModalOptions
  onChange?: (index: number) => void
  onClose?: () => void
  selected?: string
  children?: ReactNode
}

export const HorizontalModalSheet = forwardRef<BottomSheetMethods, HorizontalModalSheetProps>(
  ({ options, onChange, onClose, children }, ref) => {
    const hasChildren = children !== undefined
    const padding = 30
    const renderBackdrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          onPress={() => (ref as React.RefObject<BottomSheetMethods>).current?.close()}
        />
      ),
      [ref]
    )
    const [size, setSize] = useState({ width: 0, height: 0 })

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={[size.height + padding]}
        onChange={onChange}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        handleComponent={null}
        onClose={() => {
          if (onClose) {
            onClose()
          }
        }}
      >
        <BottomSheetView style={modalStyles.contentContainer}>
          <View
            style={modalStyles.actionsContainer}
            onLayout={(e) => {
              const { height } = e.nativeEvent.layout
              setSize({ width: 0, height: Math.ceil(height) })
            }}
          >
            {!hasChildren &&
              !!options &&
              options.options.map(({ icon, label, action }) => (
                <TouchableOpacity
                  key={label}
                  style={modalStyles.action}
                  onPress={() => {
                    action()
                  }}
                >
                  {!!icon && <View style={modalStyles.iconContainer}>{icon}</View>}
                  <Text style={modalStyles.actionLabel}>{label}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </BottomSheetView>
      </BottomSheet>
    )
  }
)

const modalStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  actionsContainer: {
    width: '100%',
    paddingVertical: 32,
    paddingHorizontal: 24,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 16,
  },
  action: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    height: 100,
    width: 100,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 25,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '400',
  },
  actionLabelSelected: {
    fontSize: 16,
    fontWeight: '600',
  },
})
