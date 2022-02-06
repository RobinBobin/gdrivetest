/**
 * @format
 */

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  GDrive,
  ListQueryBuilder,
  MimeTypes
} from "@robinbobin/react-native-google-drive-api-wrapper";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  AppRegistry,
  Button,
  SafeAreaView,
  StyleSheet
} from "react-native";
import { name } from './app.json';

function App() {
  const gdrive = useMemo(() => new GDrive(), []);
  const [ui, setUi] = useState <React.ReactElement[]> ();
  
  const invoker = useCallback(async cb => {
    try {
      return await cb();
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  const createBinaryFile = useCallback(async () => {
    console.log(await invoker(async () => (
      await gdrive.files.newMultipartUploader()
        .setData([1, 2, 3, 4, 5], MimeTypes.BINARY)
        .setRequestBody({
          name: "bin",
          //parents: ["folder_id"]
        })
        .execute()
    )));
  }, [invoker]);
  
  const createIfNotExists = useCallback(async () => {
    console.log(await invoker(async () => (
      await gdrive.files.createIfNotExists(
        {
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
          })
        )
    )));
  }, [invoker]);
  
  const createFolder = useCallback(async () => {
    console.log(await invoker(async () => (
      await gdrive.files.newMetadataOnlyUploader()
        .setRequestBody({
          name: "Folder",
          mimeType: MimeTypes.FOLDER,
          parents: ["root"]
        })
        .execute()
    )));
  }, [invoker]);
  
  const createTextFile = useCallback(async () => {
    console.log(await invoker(async () => {
      return (await gdrive.files.newMultipartUploader()
        .setData("cm9iaW4=", MimeTypes.TEXT)
        .setIsBase64(true)
        .setRequestBody({
          name: "base64 text",
        })
        .execute()).id;
    }));
  }, [invoker]);
  
  const emptyTrash = useCallback(async () => {
    if (await invoker(async () => {
      await gdrive.files.emptyTrash();
      
      return true;
    }))
    {
      console.log("Trash emptied");
    };
  }, [invoker]);
  
  const getWebViewLink = useCallback(async () => {
    console.log(await invoker(async () => (
      await gdrive.files.getMetadata(
        "some_id", {
          fields: "webViewLink"
        }
      )
    )));
  }, [invoker]);
  
  const listFiles = useCallback(async () => {
    console.log(await invoker(async () => (
      await gdrive.files.list({
        fields: "files/id,files/name",
        q: new ListQueryBuilder()
          .in("1Nxnus5JVwVjZMTxIi6_-9aVIfT0CPRKp", "parents")
      })
    )));
  }, [invoker]);
  
  const readFiles = useCallback(async () => {
    console.log(await invoker(async () => (
      await gdrive.files.getText("text_file_id")
    )));
    
    console.log(await invoker(async () => (
      await gdrive.files.getBinary("bin_file_id", undefined, "1-1")
    )))
  }, [invoker]);
  
  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.appfolder"
      ]});
    
    (async () => {
      if (await invoker(async () => {
        await GoogleSignin.signIn();
        
        gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
        
        gdrive.files.fetchCoercesTypes = true;
        gdrive.files.fetchRejectsOnHttpErrors = true;
        gdrive.files.fetchTimeout = 1500;
        
        return true;
      }))
      {
        const ui: Array <{
          title: string
          onPress: () => Promise <void>
        }> = [
          {
            title: "create bin file",
            onPress: createBinaryFile
          },
          {
            title: "create folder",
            onPress: createFolder
          },
          {
            title: "create if not exists",
            onPress: createIfNotExists
          },
          {
            title: "create text file",
            onPress: createTextFile
          },
          {
            title: "empty trash",
            onPress: emptyTrash
          },
          {
            title: "get webViewLink",
            onPress: getWebViewLink
          },
          {
            title: "list files",
            onPress: listFiles
          },
          {
            title: "read files",
            onPress: readFiles
          }
        ];
        
        setUi(ui.map(({title, onPress}, index) => (
          <Button
            key={index}
            onPress={onPress}
            title={title}
          />
        )));
      }
    })();
  }, [
    createBinaryFile,
    createFolder,
    createIfNotExists,
    createTextFile,
    emptyTrash,
    getWebViewLink,
    readFiles,
    invoker
  ]);
  
  return (
    <SafeAreaView
      style={styles.container}
    >
      {ui}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "cyan",
    flex: 1,
    justifyContent: "space-around",
    padding: 25
  }
});

AppRegistry.registerComponent(name, () => App);
