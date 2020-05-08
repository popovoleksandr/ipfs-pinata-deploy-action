const core = require('@actions/core');
const github = require('@actions/github');
const pinataSDK = require('@pinata/sdk');
const fsPath = require('path');

const path = core.getInput('path');

const workspace = process.env.GITHUB_WORKSPACE.toString();

let sourcePath = path;
if(!fsPath.isAbsolute(path)) {
    sourcePath = fsPath.join(workspace, path);
}

const pinName = core.getInput('pin-name');
const pinataApiKey = core.getInput('pinata-api-key');
const pinataSecretApiKey = core.getInput('pinata-secret-api-key');

console.log("path: " + path);
console.log("sourcePath: " + sourcePath);

const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);

const options = {
    pinataMetadata: {
        name: pinName,
        // keyvalues: {
        //     customKey: 'customValue',
        //     customKey2: 'customValue2'
        // }
    },
    pinataOptions: {
        cidVersion: 0,
        wrapWithDirectory: false
    }
};

pinata.pinFromFS(sourcePath, options).then((result) => {
    //handle results here
    console.log(result);
    console.log("HASH: " + result.IpfsHash);
    core.setOutput("hash", result.IpfsHash);

}).catch((err) => {
    //handle error here
    console.log(err);
});