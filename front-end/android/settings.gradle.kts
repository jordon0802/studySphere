rootProject.name = "studySphere"
apply(from = file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"))
include(":app")
includeBuild("../node_modules/@react-native/gradle-plugin")
