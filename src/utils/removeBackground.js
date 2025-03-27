import * as bodyPix from "@tensorflow-models/body-pix";
import "@tensorflow/tfjs";
import heic2any from "heic2any";

// Convert HEIC image to JPEG if necessary
async function convertHEICtoJPG(file) {
    if (file.type === "image/heic" || file.type === "image/heif") {
        const blob = await heic2any({ blob: file, toType: "image/jpg" });
        return new File([blob], file.name.replace(/\.heic$/, ".jpg"), { type: "image/jpg" });
    }
    return file;
}

// Remove background function
async function removeBackground(imageElement) {
    const net = await bodyPix.load();
    const segmentation = await net.segmentPerson(imageElement);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixel = imageData.data;

    for (let i = 0; i < pixel.length; i += 4) {
        if (segmentation.data[i / 4] === 0) { // Background pixels
            pixel[i + 3] = 0; // Make transparent
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png"); // Convert to PNG with transparent background
}

// Export the function as default
export default removeBackground;
