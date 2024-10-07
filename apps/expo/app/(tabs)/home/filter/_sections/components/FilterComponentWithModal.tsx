import { FontAwesome } from '@expo/vector-icons'
import { Colors, Icon, IconName } from '@siva/ui'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface FilterComponentProps {
  title: string
  icon?: IconName
  items: string[]
  onClick: () => void
}

const FilterComponentModal: React.FC<FilterComponentProps> = ({ title, icon, items, onClick }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={1} onPress={onClick}>
      <View style={styles.cardLeft}>
        <View style={styles.iconContainer}>
          {icon && <Icon name={icon} color="black" width={20} height={20} />}
          <Text style={styles.title}>{title}</Text>
        </View>

        {items?.length > 0 && (
          <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
            {items.join(', ')}
          </Text>
        )}
      </View>
      <View>
        <FontAwesome name="chevron-right" size={13} color={Colors.greenPrimary} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'flex-start',
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    width: '80%',
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'left',
  },
})

export default FilterComponentModal