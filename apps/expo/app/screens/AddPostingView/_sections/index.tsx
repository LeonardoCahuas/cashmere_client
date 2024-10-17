import { Colors, Icon, IconName, PrimaryButton } from '@siva/ui'
import { useAppStore } from 'apps/expo/app/setup/store'
import { router } from 'expo-router'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SectionTitle } from './SectionTitle'

const Add = () => {
  const { posting, setPosting } = useAppStore((s) => s.add)
  const insets = useSafeAreaInsets()
  const selectedType = posting?.vehicle_type || 'car'
  const selectedDuration = posting?.duration || 'long_term'

  const periods = [
    {
      label: 'Breve Termine',
      value: 'short_term',
      description: 'Offre accesso a beni di qualità senza investimenti iniziali significativi.',
      icon: 'lightning',
    },
    {
      label: 'Lungo Termine',
      value: 'long_term',
      description:
        'È una soluzione pratica per rispondere rapidamente alle esigenze mutevoli senza vincoli duraturi.',
      icon: 'clock',
    },
  ]

  const vehicleTypes: Array<{ label: string; value: string; icon: IconName }> = [
    {
      label: 'Auto',
      value: 'car',
      icon: 'car',
    },
    {
      label: 'Moto',
      value: 'motorcycle',
      icon: 'motorbike',
    },
    {
      label: 'Furgone',
      value: 'van',
      icon: 'truck',
    },
  ]

  const screenWidth = Dimensions.get('screen').width
  const height = Dimensions.get('screen').height - insets.top - insets.bottom - 84
  const gridItemWidth = (screenWidth - 48 - 8) / 2

  const periodSetter = (val: string) => setPosting({ duration: val })
  const typeSetter = (val: string) => setPosting({ vehicle_type: val })

  return (
    <View style={styles.container}>
      <View style={[styles.scrollableArea, { height }]}>
        <ScrollView contentContainerStyle={styles.scrollContainer} contentInset={{ bottom: 120 }}>
          <View style={styles.content}>
            <View style={styles.titleSection}>
              <Text style={styles.tabTitle}>Noleggia con Siva</Text>
              <Text style={styles.subtitle}>
                Inserisci tutte le informazioni del tuo veicolo e inizia a noleggiare.{' '}
              </Text>
            </View>
            <View style={styles.section}>
              <SectionTitle>Tipo di annuncio</SectionTitle>
              <View style={styles.list}>
                {periods.map((item) => (
                  <PeriodSelector
                    key={item.value}
                    item={item}
                    icon={item.icon as IconName}
                    selected={selectedDuration}
                    onPress={periodSetter}
                  />
                ))}
              </View>
            </View>
            <View style={styles.section}>
              <SectionTitle>Categoria</SectionTitle>
              <View style={styles.grid}>
                {vehicleTypes.map(({ label, value, icon }) => (
                  <TouchableOpacity
                    key={value}
                    onPress={() => typeSetter(value)}
                    style={[
                      styles.gridItem,
                      {
                        width: gridItemWidth,
                        borderWidth: selectedType === value ? 2 : 1,
                        backgroundColor: selectedType === value ? Colors.greenSelection : 'white',
                        borderColor:
                          selectedType === value ? Colors.greenPrimary : Colors.greySecondary,
                      },
                    ]}
                  >
                    <Icon
                      name={icon}
                      color={selectedType === value ? Colors.blackPrimary : Colors.textSecondary}
                      width={36}
                      height={36}
                    />
                    <Text style={styles.gridItemText}>{label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.fixedButtonsContainer}>
        <PrimaryButton
          style={{ width: screenWidth - 48 }}
          onPress={() => {
            router.push('/screens/AddPostingView/vehicle')
          }}
        >
          Avanti
        </PrimaryButton>
      </View>
    </View>
  )
}

export default Add

const styles = StyleSheet.create({
  fixedButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    paddingTop: 16,
    flexWrap: 'wrap',
  },
  gridItem: {
    height: 140,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemText: {
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  scrollableArea: {
    width: '100%',
  },
  scrollContainer: {
    width: '100%',
    paddingTop: 24,
  },
  content: {
    width: '100%',
    paddingHorizontal: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  titleSection: {
    width: '100%',
    display: 'flex',
    gap: 8,
  },
  tabTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.greyPrimary,
  },
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginTop: 16,
  },
})

const PeriodSelector = ({
  item,
  selected,
  onPress,
  icon,
}: {
  item: { label: string; value: string; description: string }
  selected: string
  onPress: (val: string) => void
  icon: IconName
}) => {
  return (
    <TouchableOpacity
      style={{
        ...selectorStyle.container,
        borderColor: selected === item.value ? Colors.greenPrimary : Colors.tertiaryGray,
        backgroundColor: selected === item.value ? Colors.greenSelection : 'white',
        borderWidth: selected === item.value ? 2 : 1,
      }}
      onPress={() => onPress(item.value)}
    >
      <View style={selectorStyle.titleRow}>
        <Icon name={icon} color={Colors.blackPrimary} width={20} height={20} />
        <Text style={selectorStyle.title}>{item.label}</Text>
      </View>
      <Text style={selectorStyle.description}>{item.description}</Text>
    </TouchableOpacity>
  )
}

const selectorStyle = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: Colors.greyPrimary,
    width: '100%',
    lineHeight: 16,
  },
})
