import { Photo } from "@capacitor/camera";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
import { MyPhoto } from "../model/photo.model";

const PHOTO_STORAGE_KEY = 'photos_storage_key';

export const transformPhotoIntoBase64 = async (photo: Photo): Promise<string> => {
    const fetchResponse = await fetch(photo.webPath!);
    const blob = await fetchResponse.blob();
    return await transformBlobIntoBase64(blob) as string;
}

const transformBlobIntoBase64 = (blob: Blob): Promise<string | ArrayBuffer> => new Promise(
    (resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    }
);

export const getPhotosFromStorage = async (): Promise<MyPhoto[]> => {
    const storageRef = await Storage.get({ key: PHOTO_STORAGE_KEY });
    const result: MyPhoto[] = JSON.parse(storageRef.value) || [];
    return result;
}

export const savePhotosRefInStorage = async (photo: MyPhoto) => {
    const savedRefPhotos: MyPhoto[] = await getPhotosFromStorage();
    savedRefPhotos.unshift(photo);
    await Storage.set({
        key: PHOTO_STORAGE_KEY,
        value: JSON.stringify(savedRefPhotos)
    });
}

export const readPhotoOnFS = async (photo: MyPhoto) => {
    const result = await Filesystem.readFile({
        path: photo.filepath,
        directory: Directory.Data
    });
    photo.webviewpath = `data:image/jpeg;base64,${result.data}`;
}

export const writePhotoOnFS = async (capturedPhoto: Photo): Promise<string> => {
    const transformedInBase64 = await transformPhotoIntoBase64(capturedPhoto);

    const filename = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
        path: filename,
        data: transformedInBase64,
        directory: Directory.Data
    });
    return filename;
}