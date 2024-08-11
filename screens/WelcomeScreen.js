import React from 'react';
import { View, Text, Pressable, StyleSheet, ImageBackground, Image } from 'react-native';

const WelcomeScreen = ({ onNavigate }) => {
    return (
        <ImageBackground 
            source={require('../assets/img10.jpg')} 
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <View style={styles.transparentBox}>
                    <Image 
                        source={require('../assets/img14.png')} // Ensure this path is correct
                        style={styles.logo}
                        resizeMode="contain" // Adjust this to fit the logo appropriately
                    />
                    <Text style={styles.title}>Welcome To VogueVault</Text>
                    <Pressable style={styles.button} onPress={() => onNavigate('Login')}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => onNavigate('Signup')}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent overlay for better text visibility
    },
    transparentBox: {
        width: '80%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
        borderRadius: 10,
        alignItems: 'center',
    },
    logo: {
        width: 100, // Adjust width as needed
        height: 100, // Adjust height as needed
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'black', // Text color for visibility
        textAlign: 'center', // Center align the text
        fontWeight:900,
        fontStyle:'italic'
    },
    button: {
        marginVertical: 10, // Add vertical margin to separate buttons
        width: '100%', // Ensure buttons take up the full width of the transparent box
        paddingVertical: 15, // Adjust padding for button height
        backgroundColor: 'black', // Violet background color
        borderRadius: 10, // Rounded corners
        alignItems: 'center', // Center align the button text
    },
    buttonText: {
        color: 'white', // White text color for better contrast
        fontSize: 16, // Adjust font size as needed
        fontWeight: 'bold', // Bold text for emphasis
    },
});

export default WelcomeScreen;
