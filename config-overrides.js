const {override, fixBabelImports,addDecoratorsLegacy,addLessLoader ,addWebpackAlias} = require('customize-cra');
const path = require('path')
module.exports = override(
    addDecoratorsLegacy(),
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src/"),//配置绝对路径
    }),
fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
    addLessLoader({
        strictMath: true,
        noIeCompat: true,
        localIdentName: '[local]--[hash:base64:5]' // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    })
);

