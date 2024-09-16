import { CardsPerTe, Colors, PostingCard } from '@siva/ui'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SectionTitle } from './components/SectionTitle'

type PostingCard = React.ComponentProps<typeof PostingCard.Large>['posting']

interface CardRendererProps {
    item: PostingCard
}

const CardRenderer = ({ item }: CardRendererProps) => {
    return (
        <View style={styles.cardWrapper}>
            <PostingCard.Large posting={item} onCardClick={() => { }} />
        </View>
    )
}

export const ExploreSection = () => {
    const postings: Array<PostingCard> = [
        {
            brand: 'Volvo',
            model: 'XC60',
            duration: 'MENSILE',
            price: 6500,
            description: 'A cool SUV',
            imageUrl: 'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/huracan.png',
            location: 'Corsico, MI',
            owner: 'Fratelli Giacomel',
            kmLimit: 0,
            anticipo: 0,
            minimumMonths: 0,
            minimumAge: 0
        },
        {
            brand: 'Volvo',
            model: 'XC90',
            duration: 'GIORNALIERO',
            price: 330,
            description: 'A cool SUV',
            imageUrl: 'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/g-class.png?t=2024-07-24T20%3A57%3A21.219Z',
            location: 'Pavia, PV',
            owner: 'Fratelli Giacomel',
            kmLimit: 0,
            anticipo: 0,
            minimumMonths: 0,
            minimumAge: 0
        },
        {
            brand: 'Volvo',
            model: 'Polestar 2',
            duration: 'MENSILE',
            price: 330,
            description: 'A cool SUV',
            imageUrl: 'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/smart-fortwo.png?t=2024-07-24T20%3A57%3A29.672Z',
            location: 'Milano',
            owner: 'Fratelli Giacomel',
            kmLimit: 0,
            anticipo: 0,
            minimumMonths: 0,
            minimumAge: 0
        },
        {
            brand: 'Volvo',
            model: 'XC40',
            duration: 'GIORNALIERO',
            price: 330,
            description: 'A cool SUV',
            imageUrl: 'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/g-class.png?t=2024-07-24T20%3A57%3A21.219Z',
            location: 'Pavia, PV',
            owner: 'Fratelli Giacomel',
            kmLimit: 0,
            anticipo: 0,
            minimumMonths: 0,
            minimumAge: 0
        },
    ]

    return (
        <>
            <View style={styles.titleRow}>
                <SectionTitle>Esplora</SectionTitle>

            </View>
            <FlatList
                horizontal={false}
                data={postings}
                keyExtractor={(item) => item.model}
                renderItem={({ item }) => <CardRenderer item={item} />}
                contentContainerStyle={styles.contentContainerStyle}
            />
        </>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        paddingBottom: 100,
        paddingHorizontal: 18,
        paddingTop:10,
        overflow:"visible"
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
    },
    cardWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
    },
    titleRow: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
    },
})
