import React, {
  useMemo
} from "react";
import GeneralCategory, {
  CategoryProperties,
  Callbacks
} from "./GeneralCategory";

const About: React.VFC <CategoryProperties> = ({gdrive}) => {
  const callbacks = useMemo <Callbacks> (() => {
    const result: Callbacks = [];
    
    if (gdrive) {
      result.push({
        onPress: async () => await gdrive.about.get("*"),
        title: "get"
      });
    }
    
    return result;
  }, [gdrive]);
  
  return (
    <GeneralCategory
      callbacks={callbacks}
      name={"About:"}
    />
  );
};

export default About;
