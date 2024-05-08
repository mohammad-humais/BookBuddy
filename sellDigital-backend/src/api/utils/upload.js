// multer
const fs = require('fs')
const multer = require('multer')
const uploadsDir = './src/uploads/'
const imagesDir = `${uploadsDir}images`

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // make uploads directory if do not exist
        if (!fs.existsSync(uploadsDir))
            fs.mkdirSync(uploadsDir)

        if (!fs.existsSync(imagesDir))
            fs.mkdirSync(imagesDir)

        cb(null, imagesDir)
    },
    filename: function (req, file, cb) {
      
        var fileExtension = file.mimetype.split("/")[1]
        cb(null, + Date.now() + '.' + fileExtension)
    }
})
const upload = multer({ storage })
exports.cpUpload = upload.fields([{ name: 'image', maxCount: 1 }])
exports.logoUpload = upload.fields([{ name: 'logo', maxCount: 1 }])
exports.categoryUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'banner', maxCount: 1 }])
exports.applicationUpload = upload.array('image', 15)