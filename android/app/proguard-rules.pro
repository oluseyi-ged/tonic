# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Disabling obfuscation is useful if you collect stack traces from production crashes
# (unless you are using a system that supports de-obfuscate the stack traces).
# -dontobfuscate

# React Native

# Keep our interfaces so they can be used by other ProGuard rules.
# See https://sourceforge.net/p/proguard/bugs/466/
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation @interface com.facebook.common.internal.DoNotStrip
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# Do not strip any method/class that is annotated with @DoNotStrip
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keep @com.facebook.common.internal.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
    @com.facebook.common.internal.DoNotStrip *;
}

-keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}

-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keepclassmembers,includedescriptorclasses class * { native <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactProp <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }

-dontwarn com.facebook.react.**
-keep,includedescriptorclasses class com.facebook.react.bridge.** { *; }

# okhttp

-keepattributes Signature
-keepattributes *Annotation*
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**

# okio

-keep class sun.misc.Unsafe { *; }
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn okio.**

# react-native-config
-keep class com.ellevate.BuildConfig { *; }

# Disable debugging
-dontusemixedcaseclassnames
-printmapping
-dontwarn android.test.**
-dontwarn org.mockito.**
-dontwarn org.hamcrest.**
-dontwarn com.squareup.okhttp.**
-dontwarn org.apache.commons.logging.**
-dontwarn org.apache.http.**
-dontwarn android.support.v4.**
-dontwarn android.support.annotation.**
-dontwarn android.arch.core.**
-dontwarn android.arch.lifecycle.**
-dontwarn android.arch.paging.**
-dontwarn org.jetbrains.annotations.**
-dontwarn org.joda.time.**
-dontwarn org.xmlpull.v1.**

# Disable debugging and tracing
#-dontdebug

# MeiZu Fingerprint

// DEPRECATED in 4.0.0
-keep class com.fingerprints.service.** { *; }
-dontwarn com.fingerprints.service.**

# Samsung Fingerprint

// DEPRECATED in 4.0.0
-keep class com.samsung.android.sdk.** { *; }
-dontwarn com.samsung.android.sdk.**