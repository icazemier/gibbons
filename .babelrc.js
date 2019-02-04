module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                },
                useBuiltIns: 'usage',
                modules: process.env.MODULE ? false : 'commonjs'
            }
        ]
    ],
    sourceMaps: 'inline',
    retainLines: true,
    env: {
        test: {
            plugins: ['istanbul']
        }
    }
};