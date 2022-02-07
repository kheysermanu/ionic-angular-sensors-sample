import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { MyPhoto } from '../model/photo.model';
import { getPhotosFromStorage, readPhotoOnFS, savePhotosRefInStorage, transformPhotoIntoBase64, writePhotoOnFS } from './helpers';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor() { }

  public takePhoto(): Promise<Photo> {
    // Take a photo
    return Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  }

  public async savePhoto(capturedPhoto: Photo | void) {
    if (capturedPhoto) {
      await savePhotosRefInStorage(await this.savePhotoOnFileSystem(capturedPhoto))
    }
  }

  public async savePhotoOnFileSystem(capturedPhoto: Photo): Promise<MyPhoto> {
    const filename = await writePhotoOnFS(capturedPhoto);
    return {
      filepath: filename,
      webviewpath: capturedPhoto.webPath
    };
  }

  public async loadSavedPhotos(): Promise<MyPhoto[]> {
    const loadedData: MyPhoto[] = await getPhotosFromStorage();
    for (let photo of loadedData) {
      await readPhotoOnFS(photo);
    }
    return loadedData;
  }

  public async loadOnlyFirstPhoto(loadedData: MyPhoto): Promise<MyPhoto> {
    await readPhotoOnFS(loadedData);
    return loadedData;
  }

  public async getFirstPhotosFromStorage(): Promise<MyPhoto> {
    return (await getPhotosFromStorage())[0];
  }
}
