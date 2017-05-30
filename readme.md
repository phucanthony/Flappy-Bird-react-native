# React Native Flappy Bird with Redux

[react-native-url]: https://facebook.github.io/react-native/
[react-native-web-url]: https://github.com/necolas/react-native-web
[react-universal-ui-url]: https://npmjs.org/package/react-universal-ui
[reduxjs-url]: https://redux.js.org/ 

## About React Native UI Boilerplate
#### A boilerplate for cross-platform React project - which let you run your [React Native][react-native-url] App on both Native (iOs, Android) and Web

Extending [React Native][react-native-url]'s initial structure using [react-native-web][react-native-web-url] and UI components form [react-universal-ui][react-universal-ui-url].

## Overview
#### An example Flappy Bird made by React Native and Redux.
Can run on any platform (iOS, Android and Web)

## Usage
```
git clone https://github.com/phucanthony/Flappy-Bird-react-native.git FlappyBird
cd FlappyBird
npm install
npm run web-vendor
npm run web
```

**`web-vendor`** builds webpack's shared-dll which massively increase rebuild time for hot-reloading our code.
*(Under* **200ms** *in my machine, which is quite close to React Native's rebuild).*

## Run modes
```
npm run [web | web-vendor | ios | android]
```
