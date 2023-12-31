# PassportGlobal Mobile Friendly web app  

## Quickstart
Conigure your `.env` variables as in `.env.example`.
Then run:
```
npm run dev
```
to get it running on your local machine.

## How it works

Bootsrapped with [Optimism Starter Kit](https://github.com/ethereum-optimism/optimism-starter).

To run this locally you need to create `.env` file by copying `.env.example` file and set values for the environment variables there.

In addition to standard environment variables which was derived from the Optimism Started Ket you need to provide Google Maps API key with permission to the following APIs:

- Maps API
- Places API
- Geocoding API

NOTE: Google Maps API key will be available for a general public, so the API key access must be restricted via Google Developer Console (e.g. by IP address or website domain name).

## Deploying Contracts

```
npm run deploy
```

This npm script will deploy a new version of `PassportGlobal` to the chain of `FORGE_RPC_URL` set in `.env`. The eas contract addresses will be dynamically set. Add new networks in `HelperConfig.s.sol`.
