import { Stack } from 'expo-router'
import React from 'react'

export default function AuthLayout() {
  return (
  <Stack screenOptions={{headerShown:false }} initialRouteName='signup'>
    <Stack.Screen name='signup'  options={{title:'SignUp'}}></Stack.Screen>
    <Stack.Screen name='login' options={{title:'LogIn'}}></Stack.Screen>
  </Stack>
  )
}
