import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBadge = () => {
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: 'red',
    borderRadius: 10,
    display:"flex",
    width:15,
    height:15,
    flexDirection:"column", 
    justifyContent: 'center',
    alignItems: 'center', 
    position: 'absolute',
    top: -5, 
    right: -5, 
    zIndex:999
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default ChatBadge;
