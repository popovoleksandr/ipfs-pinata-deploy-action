const core = require('@actions/core');
const github = require('@actions/github');
const pinataSDK = require('@pinata/sdk');
const fsPath = require('path');

const path = core.getInput('path');
const sourcePath = fsPath.basename(path);
const pinName = core.getInput('pin-name');
const pinataApiKey = core.getInput('pinata-api-key');
const pinataSecretApiKey = core.getInput('pinata-secret-api-key');

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
        wrapWithDirectory: true
    }
};

pinata.pinFromFS(sourcePath, options).then((result) => {
    //handle results here
    console.log(result);
    console.log("HASH: " + result);
    core.setOutput("hash", result.IpfsHash);

}).catch((err) => {
    //handle error here
    console.log(err);
});