import { FontAwesome } from '@expo/vector-icons'
import { Colors, Icon } from '@siva/ui'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface DurationButtonProps {
  duration: 'short' | 'long'
}

const DurationCard: React.FC<DurationButtonProps> = ({ duration }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Icon
          name={duration == 'short' ? 'lightning' : 'clock'}
          color={Colors.greenPrimary}
          width={70}
          height={70}
        />
      </View>
      <Text style={styles.title}>Noleggio a {duration == 'short' ? 'breve' : 'lungo'} termine</Text>
      <Text style={styles.description}>
        {duration == 'short'
          ? 'È una soluzione pratica per rispondere rapidamente alle esigenze mutevoli senza vincoli duraturi.'
          : 'Offre accesso a beni di qualità senza investimenti iniziali significativi, promuovendo un approccio più sostenibile.'}
      </Text>
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchText}>Avvia ricerca</Text>
        <FontAwesome name="arrow-right" size={16} color={Colors.greenPrimary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    marginBottom: 5,
    paddingVertical: 50,
  },
  iconContainer: {
    backgroundColor: Colors.tertiaryGray,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    width: '80%',
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchText: {
    fontSize: 16,
    color: Colors.greenPrimary,
    marginRight: 8,
  },
})

export default DurationCard
