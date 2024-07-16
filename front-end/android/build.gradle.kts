buildscript {
    val buildToolsVersion by extra("34.0.0")
    val minSdkVersion by extra(23)
    val compileSdkVersion by extra(34)
    val targetSdkVersion by extra(34)
    val ndkVersion by extra("26.1.10909125")
    val kotlinVersion by extra("1.9.22")

    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath("com.android.tools.build:gradle:8.0.2")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")
        classpath("com.google.gms:google-services:4.3.10")
        classpath("com.google.firebase:firebase-appdistribution-gradle:5.0.0")
        classpath("com.google.firebase:firebase-crashlytics-gradle:2.8.1")
        classpath("com.google.firebase:perf-plugin:1.4.0")
    }
}

allprojects {
  repositories {
    google()  // Google's Maven repository
    mavenCentral()  // Maven Central repository
  }
}

apply(plugin = "com.facebook.react.rootproject")
apply(plugin = "kotlin-android")
apply(plugin = "com.android.application")
