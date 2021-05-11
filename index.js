/**
 * @format
 * @flow strict-local
 */

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  Files,
  GDrive,
  blobToByteArray
} from "@robinbobin/react-native-google-drive-api-wrapper";
import React, {
  useEffect
} from "react";
import {
  AppRegistry,
  SafeAreaView
} from "react-native";
import { name } from './app.json';

function App() {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.appfolder"
      ]});
    
    (async () => {
      try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signIn();
        
        global.gdrive = new GDrive();
        
        global.gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
        global.gdrive.files = new Files();
        
        // const list = await (await global.gdrive.files.list()).json();
        
        console.log(await (await global.gdrive.files.get("1K8zqOD_KqCzgU0Qerq9NhndSXOD3iyDp", {alt: "media"})).text());
        
        console.log(await blobToByteArray(await (await global.gdrive.files.get("1qXgpUYTOc4b4wUzMkIk31MeKBH8KFJYF", {alt: "media"})).blob()));
      } catch (error) {
        console.log("oops", error, error.code);
      }
    })();
  }, []);
  
  return <SafeAreaView style={{
    backgroundColor: "cyan",
    flex: 1
  }} />
}

AppRegistry.registerComponent(name, () => App);
