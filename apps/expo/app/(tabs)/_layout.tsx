import { FontAwesome } from '@expo/vector-icons'
import { Colors, Icon } from '@siva/ui'
import { BlurView } from 'expo-blur'
import { Tabs, useRouter } from 'expo-router'
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'

function TabLayout() {
  const router = useRouter()

  const handlePress = () => {
    router.push('/') // Utilizza il percorso relativo alla pagina di ricerca
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
            return (
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
            )
          }
        },
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
    <Tabs.Screen
      name="news"
      options={{
        title: 'Novità',
        href: null,
        headerLeft: () => (
          <TouchableOpacity
            onPress={handlePress}
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}
          >
            <FontAwesome
              name="chevron-left" // Usa l'icona per la freccia indietro
              color={Colors.blackPrimary} // Funzione per tornare indietro
              style={{ marginLeft: 10 }} // Aggiungi un po' di margine se necessario
              size={13}
            />
            <Text>Indietro</Text>
          </TouchableOpacity>
        ),
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
