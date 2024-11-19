import { FontAwesome } from '@expo/vector-icons'
import { Colors, Icon } from '@siva/ui'
import { BlurView } from 'expo-blur'
import { Tabs, useRouter } from 'expo-router'
import { Button, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useAppStore } from '../setup/store'

function TabLayout() {
  const router = useRouter()
  const { openModal, onSearchTextChange, closeModal, openSearch, isSearchOpen, closeSearch } =
    useAppStore((state) => state.saved)

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
        <View style={{ paddingRight: 24, display: 'flex', flexDirection: 'row', gap: 24 }}>
          {isSearchOpen ? (
            <>
              <Button
                title="Annulla"
                onPress={() => {
                  closeModal()
                  closeSearch()
                }}
                color={Colors.blackPrimary}
              />
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  closeModal()
                  openSearch()
                }}
              >
                <Icon name="search" color={Colors.blackPrimary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={openModal}>
                <Icon name="filter" color={Colors.blackPrimary} />
              </TouchableOpacity>
            </>
          )}
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
        headerShown: false,
      }}
    />,
    <Tabs.Screen
      name="saved"
      options={{
        title: 'Preferiti',
        tabBarIcon: ({ color }) => <Icon name="tab_heart" color={color} />,
        headerRight: () => NavBarItems.saved.right,
        headerTitleAlign: 'left',
        headerTitle: isSearchOpen
          ? () => (
              <TextInput
                placeholder="Cerca..."
                onChangeText={onSearchTextChange}
                style={{
                  fontSize: 16,
                  backgroundColor: Colors.lightGray,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 10,
                  borderColor: '#999',
                  width: '100%',
                  minWidth: 260,
                }}
              />
            )
          : `Preferiti`,
      }}
    />,
    <Tabs.Screen
      name="add"
      options={{
        title: 'Inserziona',
        tabBarIcon: ({ color }) => <Icon name="tab_plus" color={color} />,
      }}
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault()
          navigation.navigate('screens/AddPostingView')
        },
      })}
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
