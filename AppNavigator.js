import React, { Component } from 'react';
import { createStackNavigator,
    createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import ProfileScreen from './ProfileScreen';

const RootStack = createStackNavigator({
    Home: { screen: HomeScreen,
        navigationOptions: {
        tabBarVisible: false,
        header: null,
    }},
    Maps: { screen: MapScreen},
    Profile: { screen: ProfileScreen},
});
const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;