import { join } from "path";
import { writeFile } from "fs/promises";
import { error } from "console";

const commonJsPackageJson = {
    type: "commonjs",
};

const esmPackageJson = {
    type: "module",
};

const pathCommonJs = join("build", "cjs", "package.json");
const pathEsm = join("build", "esm", "package.json");

const run = async () =>
    Promise.all([
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

run().then().catch(error);
