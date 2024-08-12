import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Colors } from '../base/colors'

interface ButtonProps {
  label: string
  onClick: () => void
  icon: React.ReactNode
  active: boolean
}

const CustomButton: React.FC<ButtonProps> = ({ label, onClick, icon, active }) => {
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
    borderRadius: 20,
    backgroundColor: Colors.tertiaryGray,
    margin: 5,
    color: 'black',
  },
  buttonActive: {
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 13,
    color: Colors.greySecondary,
    marginLeft: 10,
  },
  buttonTextActive: {
    color: 'white',
  },
})

export default CustomButton
