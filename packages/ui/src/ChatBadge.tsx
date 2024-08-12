import { StyleSheet, Text, View } from 'react-native';

type ChatBadgeProps = {
  messages?: number;
};

const ChatBadge = ({ messages }: ChatBadgeProps) => {
  if (messages === undefined || messages < 1) return null;

  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{messages}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: 'red',
    borderRadius: 10,
    display:"flex",
    width:18,
    height:18,
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
