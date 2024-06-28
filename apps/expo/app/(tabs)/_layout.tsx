import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#1DAB61' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Salvati',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
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
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="plane" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profilo',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  )
}
