module.exports = {
    opts: {
        access: 'all',
        destination: './docs/api',
        tutorials: './tutorials',
        recurse: true
    },
    plugins: [
        'plugins/markdown'
    ],
    templates: {
        path: 'ink-docstrap',
        systemName: 'Gibbons',
        footer: 'Gibbons (I. Cazemier)',
        navType: 'inline',
        theme: 'superhero',
        linenums: true,
        collapseSymbols: false,
        inverseNav: false,
        outputSourceFiles: true,
        syntaxTheme: 'dark',
        includeDate: true
    }
};
