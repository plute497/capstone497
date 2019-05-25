#!/bin/bash


cd android

export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_211.jdk/Contents/Home
./gradlew assembleGvrRelease
open $PWD/app/build/outputs/apk/gvr/release