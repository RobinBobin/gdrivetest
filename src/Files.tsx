import {
  ListQueryBuilder,
  MimeTypes,
} from '@robinbobin/react-native-google-drive-api-wrapper'
import ResumableUploader from '@robinbobin/react-native-google-drive-api-wrapper/api/aux/uploaders/ResumableUploader'
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
          await gdrive.files
            .newMultipartUploader()
            .setData([1, 2, 3, 4, 5], MimeTypes.BINARY)
            .setRequestBody({
              name: 'bin',
              //parents: ["folder_id"]
            })
            .execute(),
        title: 'create bin file',
      })

      result.push({
        onPress: async () => {
          const data = []

          for (let i = 0; i < 256 * 1024; ++i) {
            data[i] = i
          }

          const uploader: ResumableUploader = await gdrive.files
            .newResumableUploader()
            .setDataType(MimeTypes.BINARY)
            .setShouldUseMultipleRequests(true)
            .setRequestBody({
              name: `resumable bin ${Date.now()}`,
              //parents: ["folder_id"]
            })
            .execute()

          console.log('upload chunk 1', await uploader.uploadChunk(data))
          uploader.setContentLength(data.length)
          console.log('upload status', await uploader.requestUploadStatus())

          console.log('upload chunk 2', await uploader.uploadChunk([]))
          console.log('upload status', await uploader.requestUploadStatus())

          return "Your resumable upload didn't throw"
        },
        title: 'resumable upload (multi)',
      })

      result.push({
        onPress: async () => {
          const data = []

          for (let i = 0; i < 256 * 1024; ++i) {
            data[i] = i
          }

          const uploader = gdrive.files
            .newResumableUploader()
            .setData(data, MimeTypes.BINARY)
            .setRequestBody({
              name: `resumable bin ${Date.now()}`,
              //parents: ["folder_id"]
            }) as ResumableUploader

          console.log(await uploader.execute())

          console.log('upload status', await uploader.requestUploadStatus())

          return "Your resumable upload didn't throw"
        },
        title: 'resumable upload (single)',
      })

      result.push({
        onPress: async () =>
          await gdrive.files
            .newMetadataOnlyUploader()
            .setRequestBody({
              name: 'Folder',
              mimeType: MimeTypes.FOLDER,
              parents: ['root'],
            })
            .execute(),
        title: 'create folder',
      })

      result.push({
        onPress: async () =>
          await gdrive.files.createIfNotExists(
            {
              q: new ListQueryBuilder()
                .e('name', 'condition_folder')
                .and()
                .e('mimeType', MimeTypes.FOLDER)
                .and()
                .in('root', 'parents'),
            },
            gdrive.files.newMetadataOnlyUploader().setRequestBody({
              name: 'condition_folder',
              mimeType: MimeTypes.FOLDER,
              parents: ['root'],
            }),
          ),
        title: 'create if not exists',
      })

      result.push({
        onPress: async () => {
          return (
            await gdrive.files
              .newMultipartUploader()
              .setData('cm9iaW4=', MimeTypes.TEXT)
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
            q: new ListQueryBuilder().in(
              '1Nxnus5JVwVjZMTxIi6_-9aVIfT0CPRKp',
              'parents',
            ),
          }),
        title: 'list files',
      })

      result.push({
        onPress: async () => await gdrive.files.getText('text_file_id'),
        title: 'read text file',
      })

      result.push({
        onPress: async () =>
          await gdrive.files.getBinary('bin_file_id', undefined, '1-1'),
        title: 'read bin file',
      })
    }

    return result
  }, [gdrive])

  return <GeneralCategory callbacks={callbacks} name={'Files:'} />
}

export default Files
