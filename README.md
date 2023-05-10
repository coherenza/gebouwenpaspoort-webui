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

- The front-end is currently hosted on Github pages, on [https://gbp2.pandata.nl].
A new version is built and deployed upon pushing to master. See the [.github/deploy.yml]

- Meilisearch is hosted on DigitalOcean at [http://green.pandata.nl] and [http://blue.pandata.nl].
Check `config.ts` to see the one we're currently using.
In order to change from blue to green or vice versa, change `const server` in `config.ts`.

- The domains [http://green.pandata.nl] and [http://blue.pandata.nl] point to load balancers at DigitalOcean.
This is configured in the DNS A-records for the domain `pandata.nl`.
The load balancers forward all traffic to the 'meili-blue' and 'meili-green' droplets.
The only purpose of the load balancers is to enable HTTPS.

For testing, you may connect your local front-end to blue or green (the one that is not used for production).
Of course both servers must be running for this testing scenario.

To run MeiliSearch on a (blue / green) server, SSH into the droplet (can be done in DigitalOcean console) and run the command below:

```sh
docker run -it \
  -d --restart unless-stopped \
  -p 7700:7700 \
  # Set a good secret here
  -e MEILI_MASTER_KEY='.....'
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:v1.0.2
```

## Updating the Meilisearch index

- Turn off the docker container on the server using SSH (`docker ps`, `docker stop ID`).
- Copy the data (indexes, ...) from a local dev server to the `meili_data/data.ms` directory.
- After copying, restart the docker image (`docker ps`, `docker stop`).

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
