const core = require('@actions/core');
const pinataSDK = require('@pinata/sdk');
const fsPath = require('path');

// Getting all inputs
const path = core.getInput('path');
const pinName = core.getInput('pin-name');
const pinataApiKey = core.getInput('pinata-api-key');
const pinataSecretApiKey = core.getInput('pinata-secret-api-key');
const verbose = core.getInput('verbose');

// Getting workspace directory
const workspace = process.env.GITHUB_WORKSPACE.toString();

if(verbose) {
    console.log("workspace: " + workspace);

    const env = JSON.stringify(process.env);
    console.log("env: " + env);
}

// If path is absolute use it
let sourcePath = path;

// Otherwise combine it using workspace and provided path
if(!fsPath.isAbsolute(path)) {
    sourcePath = fsPath.join(workspace, path);
}

if(verbose) {
    console.log("path: " + path);
    console.log("sourcePath: " + sourcePath);
}

// Connecting to Pinata
const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);

// Constructing Pinata options
const options = {
    pinataMetadata: {
        name: pinName,
    },
    pinataOptions: {
        cidVersion: 0,
        wrapWithDirectory: false
    }
};

// Deploying (pining) to IPFS using Pinata from file system
pinata.pinFromFS(sourcePath, options).then((result) => {
    if(verbose) {
        console.log(result);
        console.log("HASH: " + result.IpfsHash);
    }

    // Providing hash as output parameter of execution
    core.setOutput("hash", result.IpfsHash);
}).catch((err) => {
    console.log(err);
});