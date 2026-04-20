import { v2 as cloudinary } from "cloudinary";

/**
 * Configure Cloudinary SDK.
 * Called once at app startup so every subsequent upload uses
 * the same credentials automatically.
 */
const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("☁️  Cloudinary configured");
};

export { cloudinary, configureCloudinary };
