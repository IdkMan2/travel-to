import {assertEnvKeysDefined} from '@utils/env-utils';
import {UploadApiResponse, v2 as cloudinary} from 'cloudinary';
import {File} from 'formidable';

class CloudinaryUploader {
  private readonly imgFolder: string = 'img';

  constructor() {
    assertEnvKeysDefined(['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET']);
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: File): Promise<UploadApiResponse> {
    return await cloudinary.uploader.upload(file.path, {folder: this.imgFolder});
  }
}

export default new CloudinaryUploader();
