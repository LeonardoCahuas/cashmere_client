import { Colors } from '@siva/ui'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface ButtonProps {
  label: string
  onClick: () => void
  icon: React.ReactNode
  active: boolean
}

const VehicleTypeButton: React.FC<ButtonProps> = ({ label, onClick, icon, active }) => {
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    backgroundColor: 'white',
    color: 'black',
    borderColor: Colors.greySecondary,
    borderWidth: 1,
  },
  buttonActive: {
    backgroundColor: 'rgba(0, 193, 92, 0.2)',
    borderColor: Colors.greenPrimary,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.greyPrimary,
    marginLeft: 10,
  },
  buttonTextActive: {
    color: 'black',
  },
})

export default VehicleTypeButton