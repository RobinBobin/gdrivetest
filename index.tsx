/**
 * @format
 */

import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { GDrive } from '@robinbobin/react-native-google-drive-api-wrapper'
import React, { useEffect, useState } from 'react'
import { AppRegistry, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { name } from './app.json'
import About from './src/About'
import Files from './src/Files'
import Permissions from './src/Permissions'
import MultipleResumableUpload from './src/MultipleResumableUpload'

const App: React.VFC = () => {
  const [gdrive, setGDrive] = useState<GDrive>()

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.appfolder',
      ],
    })

    const init = async () => {
      try {
        await GoogleSignin.signIn()

        const gdrv = new GDrive()

        gdrv.accessToken = (await GoogleSignin.getTokens()).accessToken
        gdrv.fetchTimeout = 3000

        setGDrive(gdrv)
      } catch (error) {
        console.log(error)
      }
    }

    init()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.apiContainer}>
        <About gdrive={gdrive} />
        <Files gdrive={gdrive} />
        <MultipleResumableUpload gdrive={gdrive} />
        <Permissions gdrive={gdrive} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  apiContainer: {
    marginBottom: 20,
  },
  container: {
    backgroundColor: 'cyan',
    flex: 1,
    paddingHorizontal: 25,
  },
})

AppRegistry.registerComponent(name, () => App)
