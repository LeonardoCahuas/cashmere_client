import { Colors, Icon, IconName } from '@siva/ui'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface FilterComponentProps {
  title: string
  icon?: IconName
  description?: string
  children?: React.ReactNode
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  title,
  icon,
  description,
  children,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        {icon && <Icon name={icon} color="black" width={20} height={20} />}
        <Text style={styles.title}>{title}</Text>
      </View>

      {description && <Text style={styles.description}>{description}</Text>}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'flex-start',
    marginBottom: 5,
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

export default FilterComponent