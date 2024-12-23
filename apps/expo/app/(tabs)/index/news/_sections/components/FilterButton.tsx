import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface ButtonProps {
  label: string
  onClick: () => void
  icon: React.ReactNode
  active: boolean
}

const FilterButton: React.FC<ButtonProps> = ({ label, onClick, icon, active }) => {
  const [isActive, setIsActive] = useState(false)

  const handlePress = () => {
    setIsActive(!isActive)
    onClick()
  }

  return (
    <TouchableOpacity style={[styles.button, active && styles.buttonActive]} onPress={handlePress}>
      {icon}
      <Text style={[styles.buttonText, active && styles.buttonTextActive]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black',
    borderWidth: 0.3,
  },
  buttonActive: {
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    marginLeft: 10,
  },
  buttonTextActive: {
    color: 'white',
  },
})

export default FilterButton
