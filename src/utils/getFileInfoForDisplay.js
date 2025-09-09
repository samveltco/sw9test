// ©2024 Austin App House. All rights reserved.
export default data => {
    const fileName = data.split("/")[data.split("/").length - 1];
    const imageNameSplittedArray = fileName.split(".");
    const fileType = (
        imageNameSplittedArray[imageNameSplittedArray.length - 1] === "png"
        || imageNameSplittedArray[imageNameSplittedArray.length - 1] === "jpg"
        || imageNameSplittedArray[imageNameSplittedArray.length - 1] === "jpeg"
        || imageNameSplittedArray[imageNameSplittedArray.length - 1] === "bmp"
    ) ? 'image' : 'file';
    return {
        type: fileType,
        file: data,
        name: fileName
    };
}