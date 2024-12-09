import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const IndexPage = () => {
  return (
    <Redirect href={"/plan"} />
  )
}

export default IndexPage