module.export = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default',
        }),
    ]
}