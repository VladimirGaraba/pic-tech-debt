# Development Setup

## Local Application Development (Laravel & SPA)
Follow Laravel Homestead setup instructions (https://laravel.com/docs/5.7/homestead)

When configuring shared folders in `Homestead.yaml`, the `sites: to:` path should be `/home/vagrant/code/laravel/public` e.g.
`folders:
    - map: ~/Documents/Sites/Picsi/PICSI
      to: /home/vagrant/code
sites:
    - map: pic.local
      to: /home/vagrant/code/laravel/public
      php: "7.3"`

cloning the repo should be done to `code` or where-ever you mapped code to in Homestead.yaml 
Current versions of Homestead automatically setup your homestead with a hosts file entry, but you may need to map it to pic.local

Follow remaining instructions as is, substituting your local settings as needed.

**Note:** You will need to set up both the SPA and Laravel in order for the site to work, as the SPA requires Laravel for authentication.

**Note:** Commands below should be executed from within vagrant and not the host machine.

### Setup SPA

In `src/`:

1. `yarn install` 
2. `npm run build` to generate the static webpacked version of the app. After setting up Laravel, you can run the app from this build from pic.local.

If you are making SPA changes, you will also need to:

1. Create a `.env.development` file containing `API_PROXY=http://pic.local`. This ensures auth to Laravel works from :3000 - if you are running homestead or similar.
2. `npm run build:dll`
3. `npm run start` to run app from pic.local:3000 for development purposes. This is a foreground process which runs the development node server with hotdeploy. You will need to leave the terminal open and start a new terminal. Note: it doesn't always run with watch.. and it seems to need `npm run build`

For failures in yarn install:

* leveldown errors, you may find `npm install --save pouchdb` fixes this.. its a known bug in yarn - https://github.com/yarnpkg/yarn/issues/2496 - otherwise temporarily remove pouchdb, do `yarn install` then add it back in and do `yarn install` again..
* complaints about babel-runtime apparently don't stop it starting - they should be fixed sometime though please

### Setup Laravel

In `laravel/`:

1. Create symlink for `public/app` to `../src/build` (`cd ~/code/laravel/public ; ln -s ../../src/build/ ./public/app`). This configures Laravel to use the local static build of the SPA created in the previous section.
2. Create the `pic` database in MySQL on Homestead. Default Homestead credentials for MySQL are `u: root p:secret`
3. Copy env.txt file (contact for Keybase or LastPass share) into `laravel/`. If you used a different database name in step 2, update the `DB_DATABASE` value.
4. `composer install`
4. `php artisan migrate --seed`
5. `yarn install`
6. `npm run watch` or `npm run dev` for development

Note - you may hit a complaint about cross-env not existing

1. `sudo npm install cross-env -g`
1. `sudo npm update`
1. `sudo npm install --save`

For Laravel errors, the logs are found at `laravel/storage/logs/laravel.log`.


### Credentials

The following credentials are for the db you have created for your local instance of Laravel. If you have set the API_PROXY to the demo or staging server (not recommended) you will need to request credentials on that server with site set to Dev Site to ensure test data does not pollute the other site spaces.

* admin@local.test / password - this is the global admin
* site_admin@local.test / password - this is a single site admin
* user@local.test / password - this is a regular user

### Creating Test Data

A Dev Site has been created for creating test content for development purposes. **DO NOT** create test data on any other site. By "Dev Site" we mean a User site, not dev.picsi.co...

To this end, all the test users will be attached to the Dev Site. If you create a separate user for yourself, ensure that it also belongs to the Dev Site.

### Notes

If you are running from a VM/server instead of homestead.. copy env.txt to .env.. copy/link the laravel dir to somewhere nginx is pointing at as root, ensure its owned by www-data... ensure the link to the SPA is either an absolute path, or copy it to the app dir as nginx might not be able to find it.

Homestead host will show up on 
http://pic.local:8000 or https://pic.local:44300

homestead-7: 80 (guest) => 8000 (host) (adapter 1)
    homestead-7: 443 (guest) => 44300 (host) (adapter 1)
    homestead-7: 3306 (guest) => 33060 (host) (adapter 1)
    homestead-7: 4040 (guest) => 4040 (host) (adapter 1)
    homestead-7: 5432 (guest) => 54320 (host) (adapter 1)
    homestead-7: 8025 (guest) => 8025 (host) (adapter 1)
    homestead-7: 27017 (guest) => 27017 (host) (adapter 1)
    homestead-7: 22 (guest) => 2222 (host) (adapter 1)

On linux Ubuntu 16 - if you get timeouts from vagrant, you may need to open virtualbox and fix display issues

### Troubleshooting

If you get the `EAI_AGAIN` error in console when trying to auth from :3000, update the vagrant `/etc/hosts` file with `127.0.0.1 pic.local`.

