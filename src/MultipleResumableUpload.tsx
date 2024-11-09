import React, { useMemo, useRef } from 'react'
import GeneralCategory, {
  CategoryProperties,
  Callbacks,
} from './GeneralCategory'
import { ResumableUploadRequest } from '@robinbobin/react-native-google-drive-api-wrapper/src/aux/uploaders/implementations/ResumableUploader/ResumableUploadRequest'

const MultipleResumableUpload: React.VFC<CategoryProperties> = ({ gdrive }) => {
  const contentLength = useRef(0)
  const request = useRef<ResumableUploadRequest>()

  const callbacks = useMemo<Callbacks>(() => {
    const data = Array.from(Array(256 * 1024)).map((_, index) => index)

    const result: Callbacks = []

    if (gdrive) {
      result.push({
        onPress: async () => {
          request.current = await gdrive.files
            .newResumableUploader()
            .setRequestBody({ name: `resumable bin ${Date.now()}` })
            .setShouldUseMultipleRequests(true)
            .execute()

          return
        },
        title: 'execute',
      })

      result.push({
        onPress: async () => {
          const { current } = request

          const chunk = contentLength.current
            ? data.slice(
                0,
                contentLength.current - (current?.transferredByteCount ?? 0),
              )
            : data

          console.log(await current?.uploadChunk(chunk))
          console.log(await current?.requestUploadStatus())

          console.log(
            'current?.transferredByteCount',
            current?.transferredByteCount,
          )
        },
        title: 'upload chunk',
      })

      result.push({
        onPress: async () => {
          const { current } = request

          contentLength.current = (current?.transferredByteCount ?? 0) + 2

          current?.setContentLength(contentLength.current)
        },
        title: 'set content length',
      })
    }

    return result
  }, [gdrive])

  return (
    <GeneralCategory callbacks={callbacks} name={'Multiple resumable upload'} />
  )
}

export default MultipleResumableUpload
