import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image, Pressable, TextInput, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFavorites } from './FavoritesContext';

const logoImage = require('../assets/img14.png');

const AnotherWelcomeScreen = ({ onSignOut, onNavigate }) => {
    const { favorites, toggleFavorite } = useFavorites();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCards, setFilteredCards] = useState([]);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const favoriteCount = useMemo(() => favorites.length, [favorites]);

    const handleFavorites = () => {
        onNavigate('Favorites'); // Navigate to Favorites screen
    };

    const handleHelp = () => {
        onNavigate('Help');
    };

    const handleSignOut = () => {
        onNavigate('Welcome'); // Navigate to Welcome screen after sign out
    };

    const toggleSearchBar = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const handleScreenPress = () => {
        if (isSearchVisible) {
            setIsSearchVisible(false);
            setSearchQuery('');
            setFilteredCards(cards);
        }
    };

    // Sample data for cards
    const cards = [
        {
            id: 1,
            name: 'Sony WH-CH520, Wireless On-Ear Bluetooth Headphones with Mic',
            info: 'MRP ₹3,989',
            image: require('../assets/img1.jpg'),
        },
        {
            id: 2,
            name: 'Apple Watch SE (2nd Gen)',
            info: '$159.99',
            image: require('../assets/img3.jpg'),
        },
        {
            id: 3,
            name: 'Nike SB Dunk Low White and Gum Light Brown NEW - Size 10 Mens US - White Black',
            info: '$220',
            image: require('../assets/img4.jpg'),
        },
        {
            id: 4,
            name: 'Apple AirPods Pro IPRIME revendedora Apple Tel:(11) 99298-9047',
            info: 'MRP ₹30,495',
            image: require('../assets/img5.jpg'),
        },
        {
            id: 5,
            name: 'Google Pixel Watch 2',
            info: 'From $289.99',
            image: require('../assets/img6.jpg'),
        },
        // Add more card objects as needed
    ];

    // Initialize filteredCards with all products initially
    useState(() => {
        setFilteredCards(cards);
    }, []);

    // Function to update filtered cards based on search query
    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = cards.filter(card => card.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredCards(filtered);
    };

    // Navigate to BuyScreen and pass product details
    const handleBuyNow = (product) => {
        onNavigate('Buy', { product });
    };

    return (
        <TouchableWithoutFeedback onPress={handleScreenPress}>
            <ImageBackground 
                source={require('../assets/img44.jpg')} 
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <View style={styles.header}>
                        <Image source={logoImage} style={styles.logo} />
                        <Text style={styles.welcomeText}>Welcome to VogueVault</Text>
                    </View>
                    {isSearchVisible && (
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            value={searchQuery}
                            onChangeText={handleSearch}
                            autoFocus={true}
                        />
                    )}
                    <ScrollView contentContainerStyle={styles.cardsContainer}>
                        {filteredCards.map((card, index) => (
                            <View key={card.id} style={styles.card}>
                                <Image source={card.image} style={styles.cardImage} />
                                <Text style={styles.cardName}>{card.name}</Text>
                                <Text style={styles.cardInfo}>{card.info}</Text>
                                <View style={styles.buttonContainer}>
                                    <Pressable onPress={() => toggleFavorite(card)}>
                                        <Icon
                                            name={favorites.some(fav => fav.id === card.id) ? 'star' : 'star-o'}
                                            size={30}
                                            color={favorites.some(fav => fav.id === card.id) ? 'gold' : 'gray'}
                                        />
                                        <Text style={styles.favoriteText}></Text>
                                    </Pressable>
                                    <Pressable style={styles.buyButton} onPress={() => handleBuyNow(card)}>
                                        <View style={styles.buyIcon}>
                                            <Icon name="shopping-cart" size={20} color="#fff" />
                                        </View>
                                        <Text style={styles.buyButtonText}>Buy Now</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))}
                        {filteredCards.length === 0 && (
                            <Text style={styles.noResultsText}>No results found</Text>
                        )}
                    </ScrollView>
                    <View style={styles.navigationBar}>
                        <Pressable style={styles.navButton} onPress={toggleSearchBar}>
                            <Icon name="search" size={30} color="#fff" />
                            <Text style={styles.navText}>Search</Text>
                        </Pressable>
                        <Pressable style={styles.navButton} onPress={handleHelp}>
                            <Icon name="question-circle" size={30} color="#fff" />
                            <Text style={styles.navText}>Help</Text>
                        </Pressable>
                        <Pressable style={styles.navButton} onPress={handleFavorites}>
                            <Icon name="star" size={30} color="#fff" />
                            {favoriteCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{favoriteCount}</Text>
                                </View>
                            )}
                            <Text style={styles.navText}>Favorites</Text>
                        </Pressable>
                        <Pressable style={styles.navButton} onPress={handleSignOut}>
                            <Icon name="sign-out" size={30} color="#fff" />
                            <Text style={styles.navText}>Sign Out</Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginRight: 10, // Add margin to the right of the logo
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 900,
        color: 'white',
    },
    searchInput: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        width: '90%',
    },
    cardsContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
        width: '90%',
    },
    cardImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    cardName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    cardInfo: {
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        position: 'relative', // Ensure the badge is positioned relative to its parent
    },
    buyButton: {
        alignItems: 'center',
    },
    buyIcon: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
    },
    buyButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    favoriteText: {
        fontSize: 12,
        marginTop: 5,
    },
    badge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 20,
        paddingVertical: 2,
        paddingHorizontal: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    navigationBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    navButton: {
        alignItems: 'center',
    },
    navText: {
        color: '#fff',
        fontSize: 12,
    },
    noResultsText: {
        fontSize: 18,
        marginTop: 20,
        color: 'gray',
        textAlign: 'center',
    },
});

export default AnotherWelcomeScreen;
