const cloudinary = require('cloudinary').v2;

const {CloudinaryStorage} = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: 'dqs4lto99',
    api_key: '588184996971885',
    api_secret: 'SvbxelCn4fA0V5aPoHYZVAYT1VI'
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'artProducts',
        allowedFormat: ['jpeg', 'jpg', 'png']
    }
})
module.exports = {cloudinary, storage};