import { useAppStore } from 'apps/expo/app/setup/store'
import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { PageLayout } from '../../_components/PageLayout'
import { Section } from '../../_components/Section'
import { CheckItem } from './CheckItem'
import { SectionsGap } from './SectionsGap'
import { Subsection } from './Subsection'

const maintainanceServices = [
  { label: 'Manutenzione ordinaria', value: 'ordinary_maintenance' },
  { label: 'Manutenzione straordinaria', value: 'extraordinary_maintenance' },
]

const insurancePolicies = [
  { label: 'RCA', value: 'rca' },
  { label: 'Infortunio conducente', value: 'driver_injury' },
  { label: 'Furto e incendio', value: 'theft_and_fire' },
  { label: 'Cristalli', value: 'glass_damage' },
  { label: 'Atti vandalici', value: 'vadalism' },
  { label: 'Eventi atmosferici', value: 'atmospheric_events' },
  { label: 'Assistenza nelle pratiche burocratiche', value: 'bureaucratic_assistance' },
  { label: 'Assistenza soccorso stradale H24', value: 'H24_traffic_assistance' },
  { label: 'Mini Kasko', value: 'mini_kasko' },
  { label: 'Kasko', value: 'kasko' },
]

const otherServices = [
  { label: 'Consegna a domicilio', value: 'home_delivery' },
  { label: 'Con conducente', value: 'with_driver' },
]

const Services = () => {
  const { posting, setPosting } = useAppStore((s) => s.add)
  const services = posting?.services ?? []
  const policies = posting?.insurancePolicies ?? []
  const others = posting?.otherServices ?? []

  return (
    <PageLayout
      onButtonPress={() => {
        router.push('screens/AddPostingView/posting')
      }}
    >
      <SectionsGap>
        <Section
          title="Servizi inclusi nel noleggio"
          subtitle="Indica tutti i servizi aggiuntivi che sono inclusi nel noleggio del veicolo."
          icon="services"
        >
          <Subsection
            title="Manutenzione"
            subtitle="Indica la cadenza con cui la macchina riceve la manutenzione."
          >
            {maintainanceServices.map(({ label, value }) => (
              <CheckItem
                key={value}
                name={label}
                checked={services.includes(value)}
                onPress={() => {
                  setPosting({
                    services: services.includes(value)
                      ? services.filter((s) => s !== value)
                      : [...services, value],
                  })
                }}
              />
            ))}
          </Subsection>
        </Section>

        <View style={styles.container}>
          <Subsection
            title="Copertura assicurativa"
            subtitle="Fornisci un’indicazione sul tipo di polizza che il veicolo possiede."
          >
            {insurancePolicies.map(({ label, value }) => (
              <CheckItem
                key={value}
                name={label}
                checked={policies.includes(value)}
                onPress={() =>
                  setPosting({
                    insurancePolicies: policies.includes(value)
                      ? policies.filter((s) => s !== value)
                      : [...policies, value],
                  })
                }
              />
            ))}
          </Subsection>
        </View>

        <View style={styles.container}>
          <Subsection title="Altri servizi">
            {otherServices.map(({ label, value }) => (
              <CheckItem
                key={value}
                name={label}
                checked={others.includes(value)}
                onPress={() =>
                  setPosting({
                    otherServices: others.includes(value)
                      ? others.filter((s) => s !== value)
                      : [...others, value],
                  })
                }
              />
            ))}
          </Subsection>
        </View>
      </SectionsGap>
    </PageLayout>
  )
}

export default Services

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 24,
    backgroundColor: '#fff',
  },
})
