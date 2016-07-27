
Install guide for the eenvplus-geoloket application extended with the gsc-crowdsource service
====

Dependencies
----

The application requires multiple backends to function.

- The eenvplus-geoloket application requires a specific rest backend service that serves the sewer-data, the [eenvplus-sdi](https://github.com/VlaamseMilieumaatschappij/eenvplus-sdi). For development purposes the following service is available:  http://o-envplus.vmm.be/api/rest/services/ , the production url is: http://e-envplus.vmm.be/api/rest/services/
- The authentication service needs to be available to. The production version of eenvplus uses the integrated authentication service of the wildfly webserver. For development purposes you can use a local standalone keycloak server. You can download it here: http://www.keycloak.org/downloads.html.  How to configure this application you can follow this guide: https://keycloak.gitbooks.io/getting-started-tutorials/content/v/2.0/topics/first-boot.html .
- The 3th component you need is the [GeoSmartCity crowdsource](https://github.com/GeoSmartCity-CIP/crowd-sourcing/) component. The  installation of this component is explained in the following chapter.

gsc-crowdsource backend service
----

This application requires the [The geosmartcity crowdsourcing backend](https://github.com/GeoSmartCity-CIP/crowd-sourcing)
to install this application, you can follow steps outlined below:

- Install tomcat (webserver) and postgis (database) on

  Installers Windows:
  -  http://download.osgeo.org/postgis/windows/pg95/postgis-bundle-pg95x64-setup-2.2.2-2.exe
  -  http://apache.belnet.be/tomcat/tomcat-7/v7.0.69/bin/apache-tomcat-7.0.69-windows-x64.zip

  Linux using apt:

      sudo apt-get install tomcat7
      sudo service tomcat7 start
      sudo apt-get install postgresql postgresql-contrib

- create the db (in this case named 'cs'), configure schema and load extensions and create users in postgis for development on localhost (in 2 separate sql files, found in the sql folder):

   ```sh
      createuser --createdb --login --createrole --pwprompt --superuser rszturc
      psql -f createCS_db.sql
      psql -f configCS_db.sql cs
   ```
- when you have database with postgis and a user with write privileges, you can create the correct tables:

   ```sh
      psql -f tablesCS_db.sql  <database name>
   ```

- Download the backend as war-file: https://github.com/GeoSmartCity-CIP/crowd-sourcing/releases/download/v1.7/CrowdSourcing.war
- Load the crowd-sourcing backend into tomcat or other java application server:  http://localhost:8080/manager/html

- Configure the application:

- edit: [apache-tomcat-home]\webapps\CrowdSourcing\WEB-INF\web.xml

   ```xml
    ...
      <context-param>
        <param-name>db-url</param-name>
        <param-value>jdbc:postgresql://localhost:5432/cs</param-value>
      </context-param>
      <context-param>
        <param-name>db-user</param-name>
        <param-value>rszturc</param-value>
      </context-param>
      <context-param>
        <param-name>db-password</param-name>
        <param-value>123</param-value>
      </context-param>
    ...
    ```

- edit or create: [apache-tomcat-home]\webapps\CrowdSourcing\META-INF\context.xml

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Context allowCasualMultipartParsing="true" ></Context>
    ```

eenvplus-geoloket
----

Checkout the source code:

    $ git clone https://github.com/GeoSmartCity-CIP/eenvplus-geoloket

Install build tools on linux using apt:

    $ cd eenvplus-geoloket
    $ sudo apt-get install nodejs
    $ sudo npm install -g grunt-cli
    $ sudo npm install -g bower
    $ npm install
    $ bower install

Install nodejs on windows using installer: https://nodejs.org/dist/v4.4.7/node-v4.4.7-x64.msi
Then run the follwing from the nodejs DOS-window in eenvplus project folder:

    > npm install -g grunt-cli
    > npm install -g bower
    > npm install
    > bower install

Configure the application:

- The url of the crowdsource service needs to be set in the [src/config.json](https://github.com/GeoSmartCity-CIP/eenvplus-geoloket/blob/master/src/config.json) file.

```js
      {
        "csurl": "http://localhost:8081/CrowdSourcing"
      }
```

- Other parameters including the url of the eenvplus-sdi and the authentication service need to be set in the [grunt.js](https://github.com/GeoSmartCity-CIP/eenvplus-geoloket/blob/master/gruntfile.js#L53:L60) file.
The authentication service can be integrated in a wildfly webserver or a standalone keycloak service.

```js
   ...
      dev: {
        versionslashed: '',
        apache_base_path: '',
        api_url:  '//o-envplus.vmm.be/api', //the url of the eenvplus-sdi exclude the '/rest/services/'
        auth_url: '//localhost:8080/auth',  //the url of the  keycloak authentication service
        wmts_url: '//tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts', //the url of the wmts used for the background
        mode: 'dev'
      }
   ...
```

Build:

    $ grunt build-dev

Or to build a .war file for Java servers

    $ maven clean install

Run on localhost

    $ grunt http

More info, eenvplus-geoloket install guide: https://docs.google.com/document/d/1qes32oXinYOm0G3cDhy333aumS5SaXmWvseBCmreBmo/edit
