import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Movies from '../pages/Movies';
import Search from '../pages/Search';
import Tvshows from '../pages/TvShows';

const Tab = createMaterialTopTabNavigator();

const Navigation = ({ navigation }) => {
  return (
      <Tab.Navigator screenOptions={{ tabBarLabelStyle: { textTransform: 'none', fontSize: 14 },}}>
        <Tab.Screen name="Movies">
            {() => <Movies navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Search Results">
            {() => <Search navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="TV Shows">
            {() => <Tvshows navigation={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
  );
}

export default Navigation;