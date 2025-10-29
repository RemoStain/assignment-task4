module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@react-native-community|@testing-library|expo(nent)?|@expo(nent)?/.*|expo-linear-gradient)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
