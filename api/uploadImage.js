import { ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import { storage } from "../firebase/config";


export async function uploadImage(img, type) {
  try {
    const postId = Date.now().toString();
    const response = await fetch(img);
    const file = await response.blob();

    const storageRef = ref(storage, `${type}/${type}_${postId}`);

    await uploadBytes(storageRef, file)

    const imageUrl = await getDownloadURL(storageRef);

    return imageUrl;
  } catch (error) {
    console.log("🚀 ~ uploadImage ~ error:", error);
  }
}