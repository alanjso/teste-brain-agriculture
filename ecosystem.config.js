module.exports = {
    apps: [
        {
            name: "Teste - Brain Agriculture",
            script: "./src/init.js",
            watch: true,
            env: {
                "NODE_ENV": "production"
            }
        }
    ]
}
