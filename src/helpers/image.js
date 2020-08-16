export function getBase64Image(img) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = URL.createObjectURL(img);
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            const dataURL = canvas.toDataURL("image/png");
            resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
        }
    });
}