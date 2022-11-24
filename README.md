# Gebouwenpaspoort

## Get started

```sh
# Install meilisearch using homebrew (or other)
brew install meilisearch
# Run meilisearch server
meilisearch
# Install NPM dependencies
pnpm i
# Run server locally
pnpm dev
# Visit http://localhost:3030
# Press `import`
# Search things!
```

Create a `.env` to set some optional vars, which are important to set in production.

```ini
VITE_MEILI_API_KEY={key}
VITE_MEILI_SERVER={url}
```

## Deploying

- Front on Github pages, just push and the CI action will do the rest. [https://gbp2.pandata.nl]
- Meilisearch on DigitalOcean at [http://meili.pandata.nl:7700], see command below:

```h
docker run -it \
  -d --restart unless-stopped \
  -p 7700:7700 \
  -e MEILI_MASTER_KEY='masterkey'\
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:v0.29
````

<video src="https://user-images.githubusercontent.com/2183313/203753767-f1efe496-2503-4785-ad21-d52223b6975e.mov" />
