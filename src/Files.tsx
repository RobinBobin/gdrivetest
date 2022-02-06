import {
  ListQueryBuilder,
  MimeTypes
} from "@robinbobin/react-native-google-drive-api-wrapper";
import React, {
  useMemo
} from "react";
import GeneralCategory, {
  CategoryProperties,
  Callbacks
} from "./GeneralCategory";

const Files: React.VFC <CategoryProperties> = ({gdrive}) => {
  const callbacks = useMemo <Callbacks> (() => {
    const result: Callbacks = [];
    
    if (gdrive) {
      result.push({
        title: "create bin file",
        onPress: async () => (
          await gdrive.files.newMultipartUploader()
            .setData([1, 2, 3, 4, 5], MimeTypes.BINARY)
            .setRequestBody({
              name: "bin",
              //parents: ["folder_id"]
            })
            .execute()
        )
      });
      
      result.push({
        title: "create folder",
        onPress: async () => (
          await gdrive.files.newMetadataOnlyUploader()
            .setRequestBody({
              name: "Folder",
              mimeType: MimeTypes.FOLDER,
              parents: ["root"]
            })
            .execute()
        )
      });
      
      result.push({
        title: "create if not exists",
        onPress: async () => (
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
        )
      });
      
      result.push({
        title: "create text file",
        onPress: async () => {
          return (await gdrive.files.newMultipartUploader()
            .setData("cm9iaW4=", MimeTypes.TEXT)
            .setIsBase64(true)
            .setRequestBody({
              name: "base64 text",
            })
            .execute()).id;
        }
      });
      
      result.push({
        title: "empty trash",
        onPress: async () => {
          await gdrive.files.emptyTrash();
          
          return "Trash emptied";
        }
      });
      
      result.push({
        title: "get webViewLink",
        onPress: async () => (
          await gdrive.files.getMetadata(
            "some_id",
            {
              fields: "webViewLink"
            }
          )
        )
      });
      
      result.push({
        title: "list files",
        onPress: async () => (
          await gdrive.files.list({
            fields: "files/id,files/name",
            q: new ListQueryBuilder()
              .in("1Nxnus5JVwVjZMTxIi6_-9aVIfT0CPRKp", "parents")
          })
        )
      });
      
      result.push({
        title: "read text file",
        onPress: async () => await gdrive.files.getText("text_file_id")
      });
      
      result.push({
        title: "read bin file",
        onPress: async () => await gdrive.files.getBinary("bin_file_id", undefined, "1-1")
      });
    }
    
    return result;
  }, [gdrive]);
  
  return (
    <GeneralCategory
      callbacks={callbacks}
      name={"Files:"}
    />
  );
};

export default Files;
