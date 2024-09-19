import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Colors, Icon } from '@siva/ui'
import React, { forwardRef, useCallback, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const ModalSheetProvider = GestureHandlerRootView

export const useModalSheetRef = () => useRef<BottomSheet>(null)

export interface ModalOptions {
  title: string
  options: Array<{ icon?: JSX.Element; label: string; action: () => void }>
}

export interface ModalSheetProps {
  options: ModalOptions
  onChange: (index: number) => void
}

export const ModalSheet = forwardRef<BottomSheetMethods, ModalSheetProps>(
  ({ options, onChange }, ref) => {
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

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={['25%', '50%']}
        onChange={onChange}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        handleComponent={null}
      >
        <BottomSheetView style={modalStyles.contentContainer}>
          <View style={modalStyles.titleContainer}>
            <View style={modalStyles.leftIconContainer}></View>
            <Text style={modalStyles.title}>{options.title}</Text>
            <TouchableOpacity
              style={modalStyles.rightIconContainer}
              onPress={() => (ref as React.RefObject<BottomSheetMethods>).current?.close()}
            >
              <Icon name="close" color={Colors.greyPrimary} />
            </TouchableOpacity>
          </View>
          <View style={modalStyles.actionsContainer}>
            {options.options.map(({ icon, label, action }) => (
              <TouchableOpacity
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
    paddingTop: 32,
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
})
