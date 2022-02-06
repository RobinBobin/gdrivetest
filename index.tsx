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
  StyleSheet
} from "react-native";
import { name } from './app.json';
import Files from "./src/Files";

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
        gdrive.fetchTimeout = 1500;
        
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
      <Files
        gdrive={gdrive}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "cyan",
    flex: 1,
    paddingHorizontal: 25
  }
});

AppRegistry.registerComponent(name, () => App);
