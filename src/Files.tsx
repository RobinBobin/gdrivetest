import {
  ListQueryBuilder,
  MIME_TYPES,
  ROOT_FOLDER_ID,
} from '@robinbobin/react-native-google-drive-api-wrapper'
import React, { useMemo } from 'react'
import GeneralCategory, {
  CategoryProperties,
  Callbacks,
} from './GeneralCategory'

const Files: React.VFC<CategoryProperties> = ({ gdrive }) => {
  const callbacks = useMemo<Callbacks>(() => {
    const result: Callbacks = []

    if (gdrive) {
      result.push({
        onPress: async () =>
          await gdrive.files.copy('1o_-rYoJH1WO6bHOWrATC_TdcGZG_8wZY'),
        title: 'Copy',
      })

      result.push({
        onPress: async () =>
          await gdrive.files
            .newMultipartUploader()
            .setData([1, 2, 3, 4, 5])
            .setDataMimeType(MIME_TYPES.application.octetStream)
            .setRequestBody({
              name: 'bin',
              //parents: ["folder_id"]
            })
            .execute(),
        title: 'create bin file',
      })

      result.push({
        onPress: async () => {
          const data = Array.from(Array(256 * 1024)).map((_, index) => index)

          const uploadRequest = await gdrive.files
            .newResumableUploader()
            .setDataMimeType(MIME_TYPES.application.octetStream)
            .setRequestBody({
              name: `resumable bin ${Date.now()}`,
            })
            .execute()

          uploadRequest.setContentLength(data.length)

          return await uploadRequest.uploadChunk(data)
        },
        title: 'resumable upload (single)',
      })

      result.push({
        onPress: async () =>
          await gdrive.files
            .newMetadataOnlyUploader()
            .setRequestBody({
              name: 'Folder',
              mimeType: MIME_TYPES.application.vndGoogleAppsFolder,
              parents: [ROOT_FOLDER_ID],
            })
            .execute(),
        title: 'create folder',
      })

      result.push({
        onPress: async () =>
          await gdrive.files.createIfNotExists(
            {
              q: new ListQueryBuilder('name', '=', 'condition_folder')
                .and(
                  'mimeType',
                  '=',
                  MIME_TYPES.application.vndGoogleAppsFolder,
                )
                .and(ROOT_FOLDER_ID, 'in', 'parents'),
            },
            gdrive.files.newMetadataOnlyUploader().setRequestBody({
              name: 'condition_folder',
              mimeType: MIME_TYPES.application.vndGoogleAppsFolder,
              parents: [ROOT_FOLDER_ID],
            }),
          ),
        title: 'create if not exists',
      })

      result.push({
        onPress: async () =>
          await gdrive.files
            .newMultipartUploader()
            .setDataMimeType('application/json')
            .setData(JSON.stringify({ a: 10, b: 20 }))
            .setRequestBody({ name: 'my json file' })
            .execute(),
        title: 'create json file',
      })

      result.push({
        onPress: async () => {
          return (
            await gdrive.files
              .newMultipartUploader()
              .setData('cm9iaW4=')
              .setDataMimeType('text/plain')
              .setIsBase64(true)
              .setRequestBody({
                name: 'base64 text',
              })
              .execute()
          ).id
        },
        title: 'create text file',
      })

      result.push({
        onPress: async () => {
          await gdrive.files.delete('1X1RWHyA3RjWEh9mSl5Qomma7aEJlVRnA')
        },
        title: 'delete',
      })

      result.push({
        onPress: async () => {
          await gdrive.files.emptyTrash()

          return 'Trash emptied'
        },
        title: 'empty trash',
      })

      result.push({
        onPress: async () =>
          await gdrive.files.getMetadata('some_id', {
            fields: 'webViewLink',
          }),
        title: 'get webViewLink',
      })

      result.push({
        onPress: async () =>
          await gdrive.files.list({
            fields: 'files/id,files/name',
            q: new ListQueryBuilder(
              '1Nxnus5JVwVjZMTxIi6_-9aVIfT0CPRKp',
              'in',
              'parents',
            ),
          }),
        title: 'list files',
      })

      result.push({
        onPress: async () => await gdrive.files.getJson('json_file_id'),
        title: 'read json file',
      })

      result.push({
        onPress: async () =>
          await gdrive.files.getText('text_file_id', {
            range: '1-5',
          }),
        title: 'read text file',
      })

      result.push({
        onPress: async () =>
          await gdrive.files.getBinary('bin_file_id', {
            range: '2-4',
          }),
        title: 'read bin file',
      })
    }

    return result
  }, [gdrive])

  return <GeneralCategory callbacks={callbacks} name={'Files'} />
}

export default Files
