# Gebouwenpaspoort

Running on http://gbp2.pandata.nl/

<video src="https://user-images.githubusercontent.com/2183313/203753767-f1efe496-2503-4785-ad21-d52223b6975e.mov"></video>

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
```

Create a `.env` to set some optional vars, which are important to set in production.

```ini
VITE_MEILI_API_KEY={key}
VITE_MEILI_SERVER={url}
```

## Deploying

- The front-end is currently hosted on Github pages, on [https://gbp2.pandata.nl]. A new version is built and deployed upon pushing to master. See the [.github/deploy.yml]
- Meilisearch is hosted on DigitalOcean at [http://meili.pandata.nl:7700]. To run it, see command below:

```h
docker run -it \
  -d --restart unless-stopped \
  -p 7700:7700 \
  -e MEILI_MASTER_KEY='.....'
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:v1.0.2
```

Copy the data (indexes, ...) from a local dev server to the `meili_data/data.ms` directory.
After copying, restart the docker image (`docker ps`, `docker stop`).

## Build

If you need to compile the JS files, run `pnpm build` to `/dist`.
You can now host this folder on your favorite HTML server.
See [vite guide](https://vitejs.dev/guide/build.html) for more build options.

# Changing the Meilisearch index on the Digital Ocean server (meili-droplet)

Open a terminal window on the droplet.
Go into the `meili_data` directory.

```
cd meili_data
```

Use `ls -al` to verify that the contents looks like this:

```
lrwxrwxrwx 1 root root   16 Dec 22 15:18 data.ms -> data_20221215.ms
drwxr-xr-x 6 root root 4096 Dec 15 16:30 data_20221215.ms
drwxr-xr-x 6 root root 4096 Dec 22 15:14 data_20221222.ms
```

The directory `data_20221222.ms` contains the new data.
Change where the `data.ms` symbolic link points to by doing (using the correct directory names):

```
root@meili-droplet:~/meili_data# rm data.ms && ln -s data_20221222.ms data.ms
```

Verify the new target of the symbolic link:

```
root@meili-droplet:~/meili_data# ls -al
total 20
drwxr-xr-x 5 root root 4096 Dec 22 15:28 .
drwx------ 7 root root 4096 Dec  1 08:44 ..
lrwxrwxrwx 1 root root   16 Dec 22 15:28 data.ms -> data_20221222.ms
drwxr-xr-x 6 root root 4096 Dec 15 16:30 data_20221215.ms
drwxr-xr-x 6 root root 4096 Dec 22 15:14 data_20221222.ms
```

Before you restart the server by restarting the docker container, see above,
go back to the home directory.

```
cd ..
```
