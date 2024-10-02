import { Center,VStack, Spinner } from "@gluestack-ui/themed";
import { Text } from "react-native";

const Loading = () => {
  return (
    <Center>
      <VStack>
        <Spinner size='lg' />
        <Text>Loading...</Text>
      </VStack>
    </Center>
  );
};
export default Loading;