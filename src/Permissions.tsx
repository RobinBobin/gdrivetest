import React, {
  useMemo
} from "react";
import GeneralCategory, {
  CategoryProperties,
  Callbacks
} from "./GeneralCategory";

const Permissions: React.VFC <CategoryProperties> = ({gdrive}) => {
  const callbacks = useMemo <Callbacks> (() => {
    const result: Callbacks = [];
    
    if (gdrive) {
      result.push({
        onPress: async () => (
          await gdrive.permissions.create(
            "file_id",
            undefined,
            {
              role: "",
              type: ""
            }
          )
        ),
        title: "create"
      });
      
      result.push({
        onPress: async () => {
          await gdrive.permissions.delete(
            "file_id",
            "permission_id"
          );
          
          return "Permission deleted";
        },
        title: "delete"
      })
    }
    
    return result;
  }, [gdrive]);
  
  return (
    <GeneralCategory
      callbacks={callbacks}
      name={"Permissions:"}
    />
  );
};

export default Permissions;
