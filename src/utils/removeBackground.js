import * as bodyPix from "@tensorflow-models/body-pix";
import "@tensorflow/tfjs";

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

export default removeBackground;
