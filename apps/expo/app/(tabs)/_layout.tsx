import { FontAwesome } from '@expo/vector-icons'
import { Colors, Icon } from '@siva/ui'
import { BlurView } from 'expo-blur'
import { Tabs, useRouter } from 'expo-router'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function TabLayout() {
  const router = useRouter()

  const NavBarItems = {
    home: {
      left: (
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}
        >
          <FontAwesome
            name="chevron-left"
            color={Colors.blackPrimary}
            style={{ marginLeft: 12 }}
            size={13}
          />
          <Text>Indietro</Text>
        </TouchableOpacity>
      ),
    },
    saved: {
      right: (
        <View style={{ paddingRight: 24, display: 'flex', flexDirection: 'row' }}>
          <TouchableOpacity>
            <Icon name="search" color={Colors.blackPrimary} />
          </TouchableOpacity>
        </View>
      ),
    },
  }

  const screens = () => [
    <Tabs.Screen
      name="home"
      options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <Icon name="tab_search" color={color} />,
        headerShown: true,
        headerLeft: () => {
          if (router.canGoBack()) {
            return NavBarItems.home.left
          }
        },
      }}
    />,
    <Tabs.Screen
      name="saved"
      options={{
        title: 'Preferiti',
        tabBarIcon: ({ color }) => <Icon name="tab_heart" color={color} />,
        headerRight: () => NavBarItems.saved.right,
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
