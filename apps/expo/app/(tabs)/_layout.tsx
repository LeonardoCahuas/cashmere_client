import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Icon } from '@siva/ui'
import { Tabs } from 'expo-router'
import { StyleSheet, View } from 'react-native'

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarStyle: styles.tabWrapper,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon name="tab_search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Salvati',
          tabBarIcon: ({ color }) => <Icon name="tab_heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Inserziona',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => <Icon name="tab_chat" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profilo',
          tabBarIcon: ({ color }) => <Icon name="tab_profile" color={color} />,
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabWrapper:{
    backgroundColor: 'background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 1) 100%)', 
    borderTopWidth: 0,
    elevation: 0,
    position: 'absolute',
    bottom: 0, 
    left: 0, 
    right: 0,
  }
})

export default TabLayout
