#!/bin/bash

adb reverse tcp:8081 tcp:8081
echo "Android device ready..."
react-native start