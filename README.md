# [McHacks Dashboard](https://app.mchacks.ca)

This repository contains the code for the hackathon dashboard of [McHacks](https://mchacks.ca), Canada's favourite hackathon hosted annually at McGill University. It connects with our [API](https://github.com/hackmcgill/hackerAPI) and is hosted at [app.mchacks.ca](https://app.mchacks.ca).

## Setup

1. Make sure you have [node **v20.10.0**](https://nodejs.org/en/download) installed. You can check using `node -v`.
   - It is recommended to install and use [node version manager (nvm)](https://www.nvmnode.com/guide/download.html).
   - If you have another standalone version of node installed, uninstall it or make sure that your shell calls the node from nvm and _not_ the standalone one.
   - Run `nvm install 20.10.0`
   - If you want your default node version to be a different version, you can install that version and follow instructions [here](https://www.nvmnode.com/guide/usage.html#setting-a-default-node-js-version)
   - The .nvmrc file should automatically have nvm use 20.10.0 when you execute node commands in this folder
2. Make sure you have [yarn](https://yarnpkg.com/lang/en/) installed. You can check using `yarn -v`.
   - Once you have node installed, you can install/activate yarn by running `npm install -g corepack` (and possibly `corepack enable`)
   - Make sure your yarn executables are on the PATH (check where the folder with executables is using `yarn global bin`)
3. Run `npm install` to install dependencies.
4. Make a `.env` file in the repo folder and add the variable:
   - `PUBLIC_URL` - the URL of the public deployment (theoretically, it's not needed to develop locally)
5. Run `npm run start` or `npm run start-windows` to serve locally!
6. In order to use the dashboard, you must have the hackerAPI also running. After starting the API, login to the dashboard account using credentials from 1Password.

## Folder Structure

    ```
    .
    ├── .github
    ├── .netlify
    ├── .vscode
    ├── docs
    ├── public
    |   ├── favicon
    |   ├── fonts
    ├── src
    |   ├── api
    |   ├── assets
    |   ├── config
    |   ├── features
    |   ├── shared
    |   └── util
    ```

## Screenshots

### Create / edit your account

![Imgur](https://imgur.com/SquZyex.png)

### Create / edit your application

![Imgur](https://imgur.com/gsyu6Xu.jpg)

### Hacker Dashboard

![Imgur](https://i.imgur.com/SuCcHuU.png)

### Team Viewing

![Imgur](https://imgur.com/Zzbnd3o.png)

### HackPass QR code for check-in

![Imgur](https://imgur.com/pCFlgJc.png)

### Staff Dashboard

![Imgur](https://imgur.com/MoZykrc.png)

### Search with filters, fuzzy search

![Imgur](https://imgur.com/GGoUXQm.png)

### Single hacker view modal

![Imgur](https://imgur.com/DrqP79P.png)

### Single hacker view page

![Imgur](https://imgur.com/ZyAebHZ.png)

### Check-in via QR code or email

![Imgur](https://imgur.com/6NSChzs.png)
