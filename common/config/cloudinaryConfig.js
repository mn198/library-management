const { config, uploader } =  require('cloudinary');

const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: 'dqozjnqyz',
    api_key: '359833591411681',
    api_secret: '0eAfFpn9Xt-eR-FkSvgU3f0tt9E',
  });
  next();
}

module.exports = { cloudinaryConfig, uploader };