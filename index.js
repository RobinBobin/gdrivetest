/**
 * @format
 * @flow strict-local
 */

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  GDrive,
  MimeTypes
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
        
        gdrive = new GDrive();
        gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
        
        // gdrive.files.fetchCoercesTypes = true;
        // gdrive.files.fetchRejectsOnHttpErrors = true;
        
        // console.log(await (await gdrive.files.list({
        //   q: "name='GDocJSON'"
        // })).json());
        
        // console.log(await gdrive.files.getJson("1fNnvTc2ud_f_eWb_xCgKQg4mgp5YIdE2"));
        
        // console.log(await gdrive.files.getText("1K8zqOD_KqCzgU0Qerq9NhndSXOD3iyDp"));
        
        // console.log(await gdrive.files.getMetadata("1K8zqOD_KqCzgU0Qerq9NhndSXOD3iyDp"));
        
        // console.log(await gdrive.files.getBinary("1qXgpUYTOc4b4wUzMkIk31MeKBH8KFJYF", null, "1-1"));
        
        // console.log(await gdrive.files.emptyTrash());
        
        // console.log(await gdrive.files.copy("1qXgpUYTOc4b4wUzMkIk31MeKBH8KFJYF"));
        
        // const id = "1-ROyra6bD37MrzMCqBBFONPrCNOSaO9xXdPVy_RBjos";
        // const id = "1RHTSHeJoKIWzEPc6M85AkkVowXu7j0oP3e1SRJQPR2Q";
        
        // console.log(await gdrive.files.export(id, {mimeType: MimeTypes.CSV}));
        
        // console.log(await gdrive.files.generateIds());
        
        // console.log(await gdrive.files.delete("1aBo6eg5j3uWS8NLvXUJZ2yiCll6XYInV"));
        
        // console.log(await gdrive.files.newMediaUploader()
        //   .setData("english русский französisch", MimeTypes.TEXT)
        //   .setIdOfFileToUpdate("1K8zqOD_KqCzgU0Qerq9NhndSXOD3iyDp")
        //   .execute());
        
        // console.log((await gdrive.files.newMultipartUploader()
        //   .setData("cm9iaW4=", MimeTypes.TEXT)
        //   .setIsBase64(true)
        //   .setRequestBody({
        //     name: "multi_text",
        //   })
        //   .execute()).id);
        
        // console.log(await gdrive.files.newMultipartUploader()
        //   .setData([1, 2, 3, 4, 5], MimeTypes.BINARY)
        //   .setRequestBody({
        //     name: "multi_bin",
        //   })
        //   .execute());
        
        // console.log(await gdrive.files.newMultipartUploader()
        //   // .setIdOfFileToUpdate("10pxt9J5dj4VQ_2YA_2WMueTUGWjnqPwO")
        //   .setData("Hooray!!!", MimeTypes.TEXT)
        //   .setIdOfFileToUpdate("1K8zqOD_KqCzgU0Qerq9NhndSXOD3iyDp")
        //   .setRequestBody({
        //     name: "text_changed_Hooray!!!"
        //   })
        //   .execute());
        
        console.log(await gdrive.about.get({fields: "user"}));
        
        console.log("ok");
      } catch (error) {
        console.log("oops", error.toString());
      }
    })();
  }, []);
  
  return <SafeAreaView style={{
    backgroundColor: "cyan",
    flex: 1
  }} />
}

AppRegistry.registerComponent(name, () => App);
