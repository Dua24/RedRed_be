const fs = require('fs');
const convertFile2Base64 = (file) => {
    console.log(file)
    const base64Data = file.data.toString('base64');
    return `data:image/png;base64,${base64Data}`;
}


module.exports = { convertFile2Base64 }