import React, {
  useMemo
} from "react";
import {
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";
import { GDrive } from "@robinbobin/react-native-google-drive-api-wrapper";

const GeneralCategory: React.VFC <GeneralCategoryProperties> = ({callbacks, name}) => {
  const buttons = useMemo <React.ReactElement[]> (() => callbacks.map(({title, onPress}, index) => (
    <View
      key={index}
      style={index ? styles.buttonContainer : undefined}
    >
      <Button
        onPress={async () => {
          try {
            console.log(await onPress());
          } catch (error) {
            console.log(error);
          }
        }}
        title={title}
      />
    </View>
  )), [callbacks]);
  
  return (
    !buttons.length
    ?
      null
    :
      <View
        style={styles.container}
      >
        <Text
          style={styles.name}
        >
          { name }
        </Text>
        { buttons }
      </View>
  );
};

export default GeneralCategory;

export interface CategoryProperties {
  gdrive?: GDrive
};

interface Callback {
  title: string,
  onPress: () => Promise <any>
}
export type Callbacks = Array <Callback>;

export interface GeneralCategoryProperties {
  callbacks: Callbacks,
  name: string
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20
  },
  container: {
    marginTop: 25
  },
  name: {
    fontSize: 20,
    marginBottom: 10
  }
})
