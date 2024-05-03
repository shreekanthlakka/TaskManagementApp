import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const upload = async (localFilePath) => {
    try {
        if (!localFilePath) return;
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: auto,
        });
        fs.unlinkSync(localFilePath);
        return res;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export { upload };
