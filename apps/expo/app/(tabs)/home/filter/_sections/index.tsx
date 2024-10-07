import { Stack } from 'expo-router'
import { View } from 'react-native'
import { FilterSection } from './Filter'

const Filter = () => {
    return (
        <View>
            <Stack.Screen
                options={{
                    title: 'Per te',
                }}
            />
            <FilterSection />
        </View>
    )
}

export default Filter
