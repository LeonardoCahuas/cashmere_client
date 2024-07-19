import { CardsPerTe } from '@siva/ui';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const cardData = {
  brand: "Lamborghini",
  model: "Huracan",
  duration: "GIORNALIERO",
  price: 1200,
  description: "Sotto il pontes ma stai schersando",
  imageUrl: "",
  location: "Udine",
  owner: "Giunima auto"
}
const Home: React.FC = () => {
  return (
    <View style={{display:"flex", flexDirection:"row"}}>
      <CardsPerTe posting={cardData} onCardClick={() => console.log("salve signora")}  />
      <CardsPerTe posting={cardData} onCardClick={() => console.log("salve signora")}  />
    </View>
  );
};

export default Home;
