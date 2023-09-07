# Gebouwenpaspoort

Public version available on https://gebouwenpaspoort.pandata.nl/.


# Developing

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

Create a `.env` file to set some optional vars, which are important to set in production.

Content of `.env`:
```
VITE_MEILI_API_KEY=hebjepasjepoort
VITE_MEILI_SERVER=https://green.pandata.nl/
```

## Build

If you need to compile the JS files, run `pnpm build`, which puts the result into `/dist`.
You can now host this folder on your favorite HTML server.
See [vite guide](https://vitejs.dev/guide/build.html) for more build options.
You may have to change `.env` before building and restore it afterwards.


# Deploying

Deployment of the web UI now happens automatically at https://app.netlify.com/.
Jan has the account on Netlify.
Netlify watches changes on https://github.com/coherenza/gebouwenpaspoort-webui.

Alternatively, you could copy the contents of the `dist` directory into `/var/www/gbp`.

## Blue / Green deployment

Meilisearch is hosted on DigitalOcean at [http://green.pandata.nl] and [http://blue.pandata.nl].
Check `config.ts` to see the one we're currently using.
In order to change from blue to green or vice versa, change `const server` in `config.ts`.

The domains [http://green.pandata.nl] and [http://blue.pandata.nl] point to load balancers at DigitalOcean.
This is configured in the DNS A-records for the domain `pandata.nl`.
The load balancers forward all traffic to the 'meili-blue' and 'meili-green' droplets.
The only purpose of the load balancers is to enable HTTPS.

For testing, you may connect your local front-end to blue or green (the one that is not used for production).
Of course both servers must be running for this testing scenario.

## MeiliSearch

To run MeiliSearch on a (blue / green) server, SSH into the droplet (can be done in DigitalOcean console) and run the command below:

```
docker run -it -d --restart unless-stopped -p 7700:7700 -e MEILI_MASTER_KEY='hebjepasjepoort' -v $(pwd)/meili_data:/meili_data getmeili/meilisearch:v1.2
```

## Updating the Meilisearch index

- Turn off the docker container on the server using SSH (`docker ps`, `docker stop ID`).
- Copy the data (indexes, ...) from a local dev server to the `meili_data/data.ms` directory.
- After copying, restart the docker image (`docker ps`, `docker stop`).

## Changing the Meilisearch index on the Digital Ocean server (meili-droplet)

This is no longer needed now that we have blue / green deployment.

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
