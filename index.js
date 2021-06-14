/**
 * @format
 * @flow strict-local
 */

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  GDrive,
  ListQueryBuilder,
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
        
        // const q = new ListQueryBuilder()
        //   .push()
        //     .e("name", "Untitledd")
        //     .or()
        //     .e("name", "Untitled")
        //   .pop()
        //   .and()
        //   .in("root", "parents");
        
        // console.log(q.toString());
        
        // console.log((await gdrive.files.list({
        //   q
        // })).files.length);
        
        // console.log(await gdrive.files.newMetadataOnlyUploader()
        //   .setRequestBody({
        //     mimeType: MimeTypes.BINARY,
        //     // parents: ["1NVmJNo_SNWkb9OqGdZRUyhG3RceNZ5wf"]
        //   })
        //   .execute()
        // );
        
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
        //   .setData("Hooray!!!", MimeTypes.TEXT)
        //   .setIdOfFileToUpdate("1K8zqOD_KqCzgU0Qerq9NhndSXOD3iyDp")
        //   // .setIdOfFileToUpdate("10pxt9J5dj4VQ_2YA_2WMueTUGWjnqPwO")
        //   .setRequestBody({
        //     name: "text_changed_Hooray!!!"
        //   })
        //   .execute());
        
        // console.log(await gdrive.about.get({fields: "user"}));
        
        // console.log(await gdrive.permissions.create("1K8zqOD_KqCzgU0Qerq9NhndSXOD3iyDp", null, {
        //   role: "writer",
        //   type: "anyone"
        // }));
        
        // console.log(`result: '${await gdrive.permissions.delete("1K8zqOD_KqCzgU0Qerq9NhndSXOD3iyDp", "anyoneWithLink")}'`);
        
        console.log(await gdrive.files.createIfNotExists({
          q: new ListQueryBuilder()
            .e("name", "condition_folder")
            .and()
            .e("mimeType", MimeTypes.FOLDER)
            .and()
            .in("root", "parents")
        },
          gdrive.files.newMetadataOnlyUploader()
            .setRequestBody({
              name: "condition_folder",
              mimeType: MimeTypes.FOLDER,
              parents: ["root"]
            }))
        );
        
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
