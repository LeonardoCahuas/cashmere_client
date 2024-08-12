import { Colors, Icon } from '@siva/ui'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import { Platform, StyleSheet } from 'react-native'

function TabLayout() {
  const screens = () => [
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <Icon name="tab_search" color={color} />,
      }}
    />,
    <Tabs.Screen
      name="saved"
      options={{
        title: 'Salvati',
        tabBarIcon: ({ color }) => <Icon name="tab_heart" color={color} />,
      }}
    />,
    <Tabs.Screen
      name="add"
      options={{
        title: 'Inserziona',
        tabBarIcon: ({ color }) => <Icon name="tab_plus" color={color} />,
      }}
    />,
    <Tabs.Screen
      name="chats"
      options={{
        title: 'Chats',
        tabBarIcon: ({ color }) => <Icon name="tab_chat" color={color} />,
      }}
    />,
    <Tabs.Screen
      name="profile"
      options={{
        title: 'Profilo',
        tabBarIcon: ({ color }) => <Icon name="tab_profile" color={color} />,
      }}
    />,
  ]

  if (Platform.OS === 'android') {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.blackPrimary,
        }}
      >
        {screens()}
      </Tabs>
    )
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.blackPrimary,
        tabBarStyle: styles.container,
        tabBarBackground() {
          return <BlurView intensity={80} tint="light" style={styles.blurView} />
        },
      }}
      sceneContainerStyle={{ backgroundColor: 'white' }}
    >
      {screens()}
    </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    elevation: 10,
  },
  blurView: {
    flex: 1,
  },
})
