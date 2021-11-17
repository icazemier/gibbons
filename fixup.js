const { join } = require("path");
const { writeFile } = require("fs/promises");
const { error } = require("console");

const commonJsPackageJson = {
    type: "commonjs",
};

const esmPackageJson = {
    type: "module",
};

const pathCommonJs = join("build", "cjs", "package.json");
const pathEsm = join("build", "esm", "package.json");

const run = async () => {
    await Promise.all([
        writeFile(
            pathCommonJs,
            JSON.stringify(commonJsPackageJson, undefined, 2),
            "utf-8"
        ),
        writeFile(
            pathEsm,
            JSON.stringify(esmPackageJson, undefined, 2),
            "utf-8"
        ),
    ]);
};

run().then().catch((err) => error(err));
