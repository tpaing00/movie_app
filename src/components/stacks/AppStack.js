import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowScreen from "../screens/ShowScreen";
import IndexScreen from "../screens/IndexScreen";

const Stack = createNativeStackNavigator()

const AppStack = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
                name="IndexScreen" 
                component={IndexScreen} 
                options={{
                    title: 'Movies App',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTitleStyle: {
                        color: '#fff',
                    },
                }}/>
            <Stack.Screen name='ShowScreen' component={ShowScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default AppStack;