# SERVER

## Setup

After cloning the repository, install the dependencies:

```
npm install
```

Create a file `.env` following the example of `.env.example`.

To migrate database schema run

```
npm run migrate up
```

You can run server with following command:

```
npm run dev
```

---

# CLI

## Setup

⚠️ Run commands from the project's root directory ⚠️

To install CLI **globally** run

```
npm install -g
```

Run server with following command:

```
npm run dev
```

## Available CLI commands

- Gets repos from database

```
ghapi repos
```

- Gets repo by ID or name from database

```
ghapi repo <id>
```

- Start force sync with GitHub

```
ghapi sync
```

## Uninstall CLI

To uninstall CLI from your PC run command

```
npm uninstall -g
```
