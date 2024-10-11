import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Colors, Icon } from '@siva/ui'
import React, { ReactNode, forwardRef, useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ModalOption {
  icon?: JSX.Element
  label: string
  action: () => void
}

export interface ModalOptions {
  options: Array<ModalOption>
}

export interface ModalSheetProps {
  title: string
  options?: ModalOptions
  onChange?: (index: number) => void
  onClose?: () => void
  selected?: string
  children?: ReactNode
}

export const ModalSheet = forwardRef<BottomSheetMethods, ModalSheetProps>(
  ({ title, options, onChange, onClose, children }, ref) => {
    const hasChildren = children !== undefined
    const padding = hasChildren ? 164 : 132
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
          <View style={modalStyles.titleContainer}>
            <View style={modalStyles.leftIconContainer}></View>
            <Text style={modalStyles.title}>{title}</Text>
            <TouchableOpacity
              style={modalStyles.rightIconContainer}
              onPress={() => (ref as React.RefObject<BottomSheetMethods>).current?.close()}
            >
              <Icon name="close" color={Colors.greyPrimary} />
            </TouchableOpacity>
          </View>
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

            {hasChildren && <>{children}</>}
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
  titleContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.tertiaryGray,
    paddingBottom: 8,
    paddingTop: 14,
  },
  leftIconContainer: {
    width: 32,
    height: 32,
  },
  rightIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: Colors.tertiaryGray,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionsContainer: {
    width: '100%',
    paddingVertical: 32,
    paddingHorizontal: 24,
    display: 'flex',
    gap: 40,
  },
  action: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 32,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '300',
  },
  actionLabelSelected: {
    fontSize: 16,
    fontWeight: '600',
  },
})
