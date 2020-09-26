const path = require('path')

const resolve = url => path.resolve(__dirname, url)

module.exports = {

    pages: {
        main: {
            entry: 'src/renderer/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            chunks: ['main']
        }

    },

    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('./src/renderer/'),
                'renderer': resolve('./src/renderer/'),
                'styles': resolve('./src/renderer/assets/styles/'),
                'actions': resolve('./src/renderer/actions/'),
                'assets': resolve('./src/renderer/assets/'),
                'components': resolve('./src/renderer/components/'),
                'events': resolve('./src/renderer/events/'),
                'scripts': resolve('./src/renderer/scripts/'),
                'store': resolve('./src/renderer/store/'),
                'templates': resolve('./src/renderer/templates/')
            }
        }
    },

    pluginOptions: {
        electronBuilder: {
            chainWebpackMainProcess: (config) => {

            },
            chainWebpackRendererProcess: (config) => {

            },

            mainProcessFile: 'src/main/background.js'
        }
    }
}
