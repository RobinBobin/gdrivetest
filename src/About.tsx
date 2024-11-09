import React, { useMemo } from 'react'
import GeneralCategory, {
  CategoryProperties,
  Callbacks,
} from './GeneralCategory'
import { STANDARD_PARAMETERS_FIELDS_ALL } from '@robinbobin/react-native-google-drive-api-wrapper'

const About: React.VFC<CategoryProperties> = ({ gdrive }) => {
  const callbacks = useMemo<Callbacks>(() => {
    const result: Callbacks = []

    if (gdrive) {
      result.push({
        onPress: async () =>
          await gdrive.about.get(STANDARD_PARAMETERS_FIELDS_ALL),
        title: 'get',
      })
    }

    return result
  }, [gdrive])

  return <GeneralCategory callbacks={callbacks} name={'About'} />
}

export default About
