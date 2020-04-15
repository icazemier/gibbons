module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                },
                useBuiltIns: 'usage',
                corejs: '3.0.0',
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
