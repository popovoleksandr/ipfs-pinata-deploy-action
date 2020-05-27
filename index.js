const core = require('@actions/core');
const pinataSDK = require('@pinata/sdk');
const fsPath = require('path');

// Getting all inputs
const path = core.getInput('path');
const pinName = core.getInput('pin-name');
const pinataApiKey = core.getInput('pinata-api-key');
const pinataSecretApiKey = core.getInput('pinata-secret-api-key');
const verbose = core.getInput('verbose');
const removeOld = core.getInput('remove-old');

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

// Function to unpin old hashes
function unpinHash(hashToUnpin) {
	pinata.unpin(hashToUnpin).then((result) => {
        if(verbose) {
            console.log(result);
        }
    }).catch((err) => {
        console.log(err);
    });
}

// Function to search for all old pins with the same name and unpin them if they are not the latest one
function removeOldPinsSaving(hash) {
	const metadataFilter = {
		name: pinName,
	};
	const filters = {
		status: "pinned",
		pageLimit: 1000,
		pageOffset: 0,
		metadata: metadataFilter,
	};
	pinata.pinList(filters).then((result) => {
            if(verbose) {
                console.log(result);
            }
			result.rows.forEach((element) => {
				if (element.ipfs_pin_hash != hash) {
					unpinHash(element.ipfs_pin_hash);
				}
			});
		}).catch((err) => {
            console.log(err);
        });
}

// Deploying (pining) to IPFS using Pinata from file system
pinata.pinFromFS(sourcePath, options).then((result) => {
    if(verbose) {
        console.log(result);
        console.log("HASH: " + result.IpfsHash);
    }

    if(removeOld) {
        removeOldPinsSaving(result.IpfsHash);
    }

    // Providing hash as output parameter of execution
    core.setOutput("hash", result.IpfsHash);
}).catch((err) => {
    console.log(err);
});
