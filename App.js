import { StatusBar } from 'expo-status-bar';
import { GluestackUIProvider} from '@gluestack-ui/themed'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { config } from '@gluestack-ui/config'
import AppStack from './src/components/stacks/AppStack'


const App = () => {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <AppStack />
        <StatusBar/>
      </GluestackUIProvider>
    </SafeAreaProvider>
  )
}

export default App
