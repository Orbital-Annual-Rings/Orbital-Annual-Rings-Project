import * as React from 'react';
import Navigation from './Navigation';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { useState, useEffect } from 'react';

Notifications.setNotificationHandler({
handleNotification: async () => {
return {
shouldShowAlert: true
}}
})

export default function App() {

useEffect(() => {
Permissions.getAsync(Permissions.NOTIFICATIONS).then((statusObj) => {
if (statusObj.status !== 'granted') {
return Permissions.askAsync(Permissions.NOTIFICATIONS)
}
return statusObj;
}).then((statusObj) => {
if (statusObj.status !== 'granted') {
return (
<Navigation/>
);
}
})
}, [])

  return (
    <Navigation/>

  );
}

