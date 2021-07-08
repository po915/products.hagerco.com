# Hager react site

author: [Anil Dhurjaty](https://gitlab.novacoast.com/adhurjaty)

React front-end for the new hager website (old one [here](http://www.hagerco.com/)).

This application uses [Censhare](https://www.censhare.com/us/) as the data backend and routes requests using [React Router](https://www.npmjs.com/package/react-router-dom)

Project diagram [here](https://www.draw.io/#G14HdJsDpBKRZRcZWMe_bym9AzfJWUS1pa)

## Starting dev environment

This project uses Dev Containers in order to run the dev environment. To get started, install the Dev Container Extension in VSCode. This link will give further clarity: https://code.visualstudio.com/docs/remote/containers.

Once the dev container is loaded up, you can use the terminal in VSCode and execute "npm run dev" to start up the dev environment. If this doesn't work, run "npm install"; this is a bug, will need to probably fix the docker container later.

Afterwards, click on the green "Dev container" button and select "Forward Port" (MAKE SURE TO DO THIS AFTER RUNNING NPM RUN DEV). 

It should bring up Port 8080, after selecting that, navigate to 0.0.0.0:8080 to see the website. 

## Resources

Base HCMS Endpoint: https://onlinechannel.hagerco.com/hcms/v1.11/entity (This will list all the endpoints for the HCMS)

Hierarchy of Products: 

Parent Product category (any product that has no parents)-> product category -> product -> productItem

To see the schema of any endpoint, rather than "entity" put "schema", i.e. https://onlinechannel.hagerco.com/hcms/v1.11/schema/product

There are mixins included, to see that schema put it at the end, https://onlinechannel.hagerco.com/hcms/v1.11/schema/productProperties

For documentation on Censhare see link: 

https://ecosphere.censhare.com/en/online-solutions/headless-cms/Introduction (requires login, ask me to share credentials).

For the Censhare web client:

https://censhare.hagerco.com

Username: Novacoast
