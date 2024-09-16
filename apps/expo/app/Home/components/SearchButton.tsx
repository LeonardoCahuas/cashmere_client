import React from 'react';
import { useRouter } from 'expo-router';
import { Icon, PrimaryButton } from '@siva/ui';

export const SearchButton = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/search'); // Utilizza il percorso relativo alla pagina di ricerca
  };

  return (
    <PrimaryButton icon={<Icon name="search" color="white" />} onPress={handlePress}>
      Avvia la ricerca
    </PrimaryButton>
  );
};
