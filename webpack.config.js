const config = {
    entry: `${__dirname}/src/app.js`,
    output: {
        path: `${__dirname}/public/js`,
        filename: 'bundle.js'
    },
    mode: 'production'
    // resolve: {
    //     alias: {
    //         'vue$': 'vue/dist/vue.esm.js'
    //     },
    //     extensions: ['*', '.js', '.vue', '.json']
    // }
   
};

module.exports = config;