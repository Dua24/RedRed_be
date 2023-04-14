const admin = require("../config/fileUpload")
const uploadSingleFile = async (file) => {
    try {
        // Upload the file to Firebase storage
        const bucket = admin.storage().bucket();
        const fileName = `${Date.now()}-${file.name}`;
        const fileRef = bucket.file(`posts/${fileName}`);
        const stream = fileRef.createWriteStream({
            metadata: { contentType: file.mimetype },
            resumable: false
        });

        await new Promise((resolve, reject) => {
            stream.on('finish', () => {
                resolve();
            });
            stream.on('error', (err) => {
                console.error(err);
                reject(err);
            });
            stream.end(file.data);
        });

        return fileName

    } catch (err) {
        console.error(err);
        return null
    }
}

const getFileUploaded = async (file) => {
    try {
        const bucket = admin.storage().bucket();
        const fileRef = bucket.file(`posts/${file}`);
        const fileData = await fileRef.download();
        // Convert the buffer to a data URL
        const dataUrl = 'data:image/jpeg;base64,' + fileData[0].toString('base64');
        return dataUrl
    } catch (err) {
        console.log("ERROR", err)
        return null
    }
}

module.exports = { uploadSingleFile, getFileUploaded }