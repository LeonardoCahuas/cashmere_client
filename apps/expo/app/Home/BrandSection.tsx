import { BrandCard, CardsPerTe, Colors } from '@siva/ui'
import React from 'react'
import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import { SectionTitle } from './components/SectionTitle'

type BrandPosting = React.ComponentProps<typeof BrandCard>

interface CardRendererProps {
    item: BrandPosting
}

const CardRenderer = ({ item }: CardRendererProps) => {
    return (
        <View style={styles.cardWrapper}>
            <BrandCard brand={item.brand} onCardClick={() => { }} />
        </View>
    )
}

export const BrandSection = () => {
    const postings: Array<BrandPosting> = [
        {
            brand: {
                brand: "Audi",
                imageUrl: "https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/brands/audi.png"
            },
            onCardClick: () => console.log()
        },
        {
            brand: {
                brand: "Abarth",
                imageUrl: "https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/brands/abarth.jpeg"
            },
            onCardClick: () => console.log()
        },
        {
            brand: {
                brand: "Fiat",
                imageUrl: "https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/brands/fiat.png?t=2024-09-12T08%3A35%3A42.764Z"
            },
            onCardClick: () => console.log()
        },
        {
            brand: {
                brand: "Yamaha",
                imageUrl: "https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/brands/yamaha.png"
            },
            onCardClick: () => console.log()
        },
        {
            brand: {
                brand: "Volkswagen",
                imageUrl: "https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/brands/volkswagen.png?t=2024-09-12T08%3A36%3A24.014Z"
            },
            onCardClick: () => console.log()
        },
        {
            brand: {
                brand: "Mercedes",
                imageUrl: "https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/brands/mercedes.png"
            },
            onCardClick: () => console.log()
        },
        {
            brand: {
                brand: "BMW",
                imageUrl: "https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/brands/bmw.jpeg"
            },
            onCardClick: () => console.log()
        },
        {
            brand: {
                brand: "IVECO",
                imageUrl: "https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/brands/iveco.jpeg"
            },
            onCardClick: () => console.log()
        }
    ]

    return (
        <>
            <View style={styles.titleRow}>
                <SectionTitle>Marchi più richiesti</SectionTitle>

            </View>
            <FlatList
                data={postings}
                keyExtractor={(item) => item.brand.brand}
                renderItem={({ item }) => <CardRenderer item={item} />}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapperStyle}
                contentContainerStyle={styles.contentContainerStyle}
            />
           <View style={styles.logoContainer}>
                <Image
                    source={{
                        uri: 'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/LOGO.png?t=2024-09-06T07%3A09%3A24.114Z',
                    }}
                    style={{ width: 80, height: 25, marginBottom: 30 }}
                />
                <View style={styles.overlay} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        paddingTop: 16,
        paddingBottom: 40,
        paddingHorizontal: 8,
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
    },
    cardWrapper: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
    },
    titleRow: {
        paddingTop: 50,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingRight: 16,
    },
    logoContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Colore bianco semi-trasparente
        zIndex: 1, // Porta l'overlay in primo piano
    }
})
