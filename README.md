# ionic projet - Angular UI

## Environnement OS Debian 11 - Installation

### Node.js v16.x:

- L'utilisation de `nvm`, gestionnaire de version node, rend plus simple l'installation de Node.
- Ce même outil permet d'avoir plusieur version de Node et aide à switcher entre ces versions.
- Dans un premier temps, on installe `nvm` puis la dernière version LTS de Node:
```
$: curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh --proxy <PROXY> | bash
$: source ~/.bashrc # Activation de la configuration injectée
$: nvm --version
0.39.0
$: nvm install --lts
$: node --version
v16.13.0
```

### VSCode

- Télécharger ici le package debian  à installer : https://go.microsoft.com/fwlink/?LinkID=760868

- Installer le fichier `.deb` qui a été téléchargé: `sudo apt install ./<file>.deb`

## Projet : creer une application mobile

### Création de la coquille

Le but est d'utiliser le framework Ionic associé à de l'Angular.

Ionic: 

Angular: 

Nous allons utiliser :
- des utilitaires Ionic en commande en ligne , paquetage nodejs `@ionic/cli` ;
- paquetage `native-run` aidant à faire tourner l'application sur les terminaux et émulateurs ;
- paquetage `cordova-res` permettant d'utiliser un catalogue d'icons existants et splash-screen.

```shell
npm install -g @ionic/cli native-run cordova-res
```

Créons l'aplication grâce à ionic CLI:

```shell
ionic start takephoto tabs --type=angular --capacitor
cd takephoto
npm install @capacitor/camera @capacitor/storage @capacitor/filesystem
```
`Capacitor` et ses plugins permettent un accès couche native.

Afin d'avoir un paquet complet, la librairie PWA-Elements ramène des dépendances afin de compléter l'API d'accès à la caméra.

```
$ npm install @ionic/pwa-elements
```

### Prendre une photo
On crée un service qui va implémenter l'accès à la caméra grâce à l'API `capacitor camera`.

```
ionic g service services/photo
```

L'initialisation du composant caméra ouvre l'appareil photo + un bouton flottant pour déclencher la caméra

### Récupérer la photo dans un gallerie

Stockage persistant sur le système de fichier
1- fectch() permet de récupérer l'image au format Blob
2- FileReader.readAsDataUrl() permet de convertir le format Blob en base64 stocké dans un string base64DataString
3- Directory , Filesystem sont apportés par l'API Capacitor FileSystem
4- Sauvegarde un pointer vers les photos sauvegardées sur le FS
5- Chargement des photos
6- Fonctionnement Hybrid

### Accès aux ressources du téléphone
- Accéléromètre :
```
$ npm i --save cordova-plugin-device-motion 
$ npm i --save @awesome-cordova-plugins/device-motion 
```
- Géolocalisation :
```
$ npm i --save @awesome-cordova-plugins/geolocation
```
- Gyroscope : 
```
$ npm i cordova-plugin-gyroscope
$ npm i --save @ionic-native/gyroscope
```

### Déploiement sur mobile Android

```
$ ionic build
$ npm i @capacitor/core
$ npm i @capacitor/android
$ ionic cap add android # création d'un projet android
$ ionic cap copy # copie des fichiers build dans le projet android
$ ionic cap sync
$ ionic cap open android # ouvre le projet dans Android Studio | mettre à jour la variable CAPACITOR_ANDROID_STUDIO_PATH ou créer un lien symbolique vers /usr/local/android-studio/bin/studio.sh
```
- Mise à jour des permissions pour l'utilisation de la caméra: `AndroidManifest.xml`:
```
!-- Permissions -->
  <uses-feature android:name="android.hardware.sensor.accelerometer" />
  <uses-feature android:name="android.hardware.sensor.barometer" />
  <uses-feature android:name="android.hardware.sensor.ambient_temperature" />
  <uses-feature android:name="android.hardware.sensor.gyroscope" />
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS" />
```
- Déploiement de l'applicaion sur Android studio:
```
# Installation de l'utilitaire ADB pour un controle de device USB
$ sudo apt-get install android-tools-adb android-tools-fastboot
# Vérification de la version
$ adb --version
# Lancement du service pour l'appariement d'un terminal
$ sudo adb start-server
$ sudo adb kill-server
# Liste des terminaux attachés
$ adb devices
```