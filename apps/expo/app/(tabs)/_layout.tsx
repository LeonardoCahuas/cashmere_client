import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Icon } from '@siva/ui'
import ChatBadge from '@siva/ui/src/ChatBadge'
import { Tabs } from 'expo-router'

function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#000' }}>
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
          tabBarIcon: ({ color }) => <Icon name="tab_chat" color={color} messages={15} />,
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

export default TabLayout
