# ipfs-pinata-deploy-action

# IPFS Pinata service deploy

This action deploys to IPFS through Pinata service

## Inputs

### `path`
**Required** Path to directory which should be sent to Pinata. Default `"build"`.

### `pin-name`
**Required** Human name for pin on Pinata.

### `pinata-api-key`
**Required** Pinata API key.

### `pinata-secret-api-key`
**Required** Pinata Secret API key.

### `remove-old`
Should action also remove old pin(-s) from Pinata service with same name. Default `"false"`.

### `verbose`
**Required** Verbose mode. Default `"false"`.

## Outputs

### `hash`

Deployed hash value.

## Example usage
````
uses: anantaramdas/ipfs-pinata-deploy-action@v1.6.4
with:
  pin-name: 'My personal site'
  path: './build'
  pinata-api-key: 11111111111111111111
  pinata-secret-api-key: 2222222222222222222222222222222222222222222222222222222222222222
  verbose: true
  remove-old: false
````

## Contributing
We are open for contribution. If you would like to contribute kindly create pull request. 