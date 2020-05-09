# ipfs-pinata-deploy-action

# Hello world javascript action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `path`
**Required** Path to directory which should be sent to Pinata. Default `"build"`.

### `pin-name`
**Required** Human name for pin on Pinata.

### `pinata-api-key`
**Required** Pinata API key.

### `pinata-secret-api-key`
**Required** Pinata Secret API key.

### `verbose`
**Required** Verbose mode. Default `"false"`.

## Outputs

### `hash`

Deployed hash value.

## Example usage
````
uses: anantaramdas/ipfs-pinata-deploy-action@v1.5.0
with:
  pin-name: 'My personal site'
  path: './build'
  pinata-api-key: 11111111111111111111
  pinata-secret-api-key: 2222222222222222222222222222222222222222222222222222222222222222
  verbose: true
````