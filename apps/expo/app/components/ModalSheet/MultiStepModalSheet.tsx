import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Colors, Icon } from '@siva/ui'
import React, { forwardRef, useCallback, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

/** Page in a Multi-Step Modal */
export type ModalPage = { [key: string]: ModalStep }

export interface ModalStep {
  key: string
  title: string
  content: JSX.Element
  doneButton?: boolean
  onReset?: () => void
  scrollable?: boolean
  containerStyle?: any
}

export interface MultiModalSheetProps {
  onChange?: (index: number) => void
  onClose?: () => void
  pages: { [key: string]: ModalStep }
  step: string
  setStep: (s: string) => void
}

export const MultiStepModalSheet = forwardRef<BottomSheetMethods, MultiModalSheetProps>(
  ({ onClose, onChange, pages, step, setStep }, ref) => {
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
    const padding = 164
    const [size, setSize] = useState({ width: 0, height: 0 })

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={[size.height + padding]}
        onChange={onChange}
        onClose={onClose}
        handleComponent={null}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ borderRadius: 0 }}
      >
        <BottomSheetView style={modalStyles.contentContainer}>
          <View style={modalStyles.titleContainer}>
            <TouchableOpacity
              style={modalStyles.leftIconContainer}
              onPress={() => {
                if (step === 'initial') {
                  ;(ref as React.RefObject<BottomSheetMethods>).current?.close()
                } else {
                  setStep('initial')
                }
              }}
            >
              <Icon
                name={step === 'initial' ? 'close' : 'chevron-right'}
                color={Colors.greyPrimary}
              />
            </TouchableOpacity>
            <Text style={modalStyles.title}>{pages[step].title}</Text>
            <TouchableOpacity
              style={modalStyles.rightIconContainer}
              onPress={() => {
                if (pages[step] && pages[step]?.onReset) {
                  // @ts-ignore
                  pages[step].onReset()
                }
              }}
            >
              {pages[step]?.onReset && <Text style={{ color: '#FE0034' }}>Azzera</Text>}
            </TouchableOpacity>
          </View>
          {pages[step] && !pages[step]?.scrollable && (
            <View
              style={{
                ...modalStyles.childrenContainer,
                paddingTop: 32,
                ...pages[step].containerStyle,
              }}
              onLayout={(e) => {
                const { height } = e.nativeEvent.layout
                setSize({ width: 0, height: Math.ceil(height) })
              }}
            >
              {pages[step].content}
            </View>
          )}
          {pages[step] && pages[step]?.scrollable && (
            <View
              style={modalStyles.childrenContainer}
              onLayout={(e) => {
                const { height } = e.nativeEvent.layout
                setSize({ width: 0, height: Math.ceil(height) })
              }}
            >
              <ScrollView
                style={{
                  width: '100%',
                  paddingTop: 32,
                  height: '100%',
                }}
              >
                {pages[step].content}
                <Text style={{ height: 24, opacity: 0 }}>heyeheye</Text>
              </ScrollView>
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    )
  }
)

const modalStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    width: 64,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  childrenContainer: {
    width: '100%',
    // paddingVertical: 32,
    paddingHorizontal: 24,
    display: 'flex',
    gap: 40,
  },
})
