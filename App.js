import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import AnotherWelcomeScreen from './screens/Product'; // Rename to AnotherWelcomeScreen
import SignupScreen from './screens/SignUpScreen';
import HelpScreen from './screens/HelpScreen';
import FavoritesScreen from './screens/Favorite';
import BuyScreen from './screens/BuyScreen'; // Import BuyScreen component
import { FavoritesProvider } from './screens/FavoritesContext'; // Ensure this matches your context file

const App = () => {
    const [page, setPage] = useState('Welcome');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [productData, setProductData] = useState(null); // State to hold product data

    // Async function to load user login state from AsyncStorage
    const loadLoginState = async () => {
        try {
            const userLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if (userLoggedIn !== null && userLoggedIn === 'true') {
                setIsLoggedIn(true);
                setPage('Product'); // Navigate to Product screen if user is logged in
            }
        } catch (error) {
            console.error('Error loading user login state:', error);
        }
    };

    useEffect(() => {
        loadLoginState(); // Load login state on component mount
    }, []);

    const handleLogin = async (email, password) => {
        // Check if the entered credentials are correct
        if (email === 'hari@123' && password === '1234') {
            setIsLoggedIn(true);
            setPage('Product'); // Navigate to Product screen after successful login
            try {
                await AsyncStorage.setItem('isLoggedIn', 'true');
            } catch (error) {
                console.error('Error saving user login state:', error);
            }
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    const handleLogout = async () => {
        setIsLoggedIn(false);
        setPage('Welcome'); // Navigate to Welcome screen after logout
        try {
            await AsyncStorage.removeItem('isLoggedIn');
        } catch (error) {
            console.error('Error removing user login state:', error);
        }
    };

    const renderScreen = () => {
        switch (page) {
            case 'Welcome':
                return <WelcomeScreen onNavigate={setPage} />;
            case 'Login':
                return <LoginScreen onLogin={handleLogin} onNavigate={setPage} />;
            case 'Product':
                return <AnotherWelcomeScreen onSignOut={handleLogout} onNavigate={handleNavigation} />;
            case 'Signup':
                return <SignupScreen onNavigate={setPage} />;
            case 'Help':
                return <HelpScreen onNavigate={setPage} />;
            case 'Favorites':
                return <FavoritesScreen onNavigate={setPage} />;
            case 'Buy':
                return <BuyScreen product={productData} onNavigate={handleNavigation} />; // Pass product data to BuyScreen
            default:
                return <WelcomeScreen onNavigate={setPage} />;
        }
    };

    // Function to handle navigation and set product data for BuyScreen
    const handleNavigation = (destination, data) => {
        setPage(destination);
        if (destination === 'Buy') {
            setProductData(data.product);
        }
    };

    return (
        <FavoritesProvider>
            <View style={styles.container}>
                {renderScreen()}
            </View>
        </FavoritesProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
