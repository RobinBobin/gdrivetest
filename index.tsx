/**
 * @format
 */

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GDrive } from "@robinbobin/react-native-google-drive-api-wrapper";
import React, {
  useEffect,
  useState
} from "react";
import {
  AppRegistry,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from "react-native";
import { name } from './app.json';
import About from "./src/About";
import Files from "./src/Files";
import Permissions from "./src/Permissions";

const App: React.VFC = () => {
  const [gdrive, setGDrive] = useState <GDrive> ();
  
  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.appfolder"
      ]});
    
    (async () => {
      try {
        await GoogleSignin.signIn();
        
        const gdrive = new GDrive();
        
        gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
        
        gdrive.fetchCoercesTypes = true;
        gdrive.fetchRejectsOnHttpErrors = true;
        gdrive.fetchTimeout = 3000;
        
        setGDrive(gdrive);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  
  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.apiContainer}
      >
        <About
          gdrive={gdrive}
        />
        <Files
          gdrive={gdrive}
        />
        <Permissions
          gdrive={gdrive}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  apiContainer: {
    marginBottom: 20
  },
  container: {
    backgroundColor: "cyan",
    flex: 1,
    paddingHorizontal: 25
  }
});

AppRegistry.registerComponent(name, () => App);
