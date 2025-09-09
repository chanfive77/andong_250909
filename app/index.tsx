import { Text, View } from "react-native";
import { styles } from "./styles";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.mainText}>Hellow~ World!</Text>
    </View>
  );
}