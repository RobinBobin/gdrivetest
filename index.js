/**
 * @format
 * @flow strict-local
 */

 import { GoogleSignin } from "@react-native-google-signin/google-signin";
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
    
    (async () =>{
      try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signIn();
        
        console.log((await GoogleSignin.getTokens()).accessToken);
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
