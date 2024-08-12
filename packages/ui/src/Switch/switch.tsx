import { cloneElement, useEffect, useRef, useState } from 'react'
import { Animated, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../base/colors'

interface TabItem {
  label: string
  icon?: JSX.Element
}

interface AnimatedSwitchProps {
  tabs: Array<TabItem>
}

export const AnimatedSwitch = ({ tabs }: AnimatedSwitchProps) => {
  const [active, setActive] = useState<number>(0)
  const [componentWidth, setComponentWidth] = useState(0)
  const indicatorPosition = useRef(new Animated.Value(0)).current

  const setInitialLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setComponentWidth(width)
  }

  useEffect(() => {
    Animated.timing(indicatorPosition, {
      toValue:
        active === tabs.length - 1
          ? (componentWidth / tabs.length) * active - 4
          : (componentWidth / tabs.length) * active + 4,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }, [active, componentWidth])

  return (
    <View style={styles.container} onLayout={setInitialLayout}>
      <Animated.View
        style={[
          styles.indicator,
          {
            width: componentWidth / tabs.length,
            transform: [{ translateX: indicatorPosition }],
          },
        ]}
      />
      {tabs.map((tab, i) => (
        <TouchableOpacity key={tab.label} style={styles.button} onPress={() => setActive(i)}>
          {tab?.icon && cloneElement(tab.icon, { style: { color: Colors.greyPrimary } })}
          <Text style={styles.text}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 38,
    backgroundColor: Colors.lightGray,
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 2.5,
    top: '10%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
    color: Colors.greyPrimary,
  },
})
