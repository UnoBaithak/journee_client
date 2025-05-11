# WebApp

The webapp sits on the `webapp` branch of Hera
It is a `NextJs` App Router application. 
Under app there are multiple domain specific directories, each handling their own domain specific pages and code, with the idea being that they can be split into `MFe` (`Micro Frontend`) easily if required at any point of time. 

For CSS we are using `tailwind` css. 
Any common components across domains are to go in the `components/` directory parallel to the `app` directory. \
Common `types` are in the `types` folder, which represent the common models that might be required across domain, similarly for images its the `public` folder, but can be changed. \
For utils its the `utils` folder. 

Since we use `NextJs App Router` the routing happens accordingly -> Refer [Next Js App Router](https://nextjs.org/docs/app)

For `itinerary` and `plan` we use `useContext` hook of React to create a context provider for all their subpages to avoid fetching data from backend again and again, but this needs to be optimised as right now, the data fetch only happens in the root page of respective domain, so if you load any subpage, the context is absent. 

We also need to work on breaking down the pages into manageable components (domain specific or global) so that its easier to develop and maintain. 

The deployment happens through `Github Actions` via the `.github/workflows/main.yml` file and the site is deployed to `Vercel` and deployments happen for each push. (need to fix this, will work on it)

All deployments are `prod` deployments and are available at [https://journee-nu.vercel.app/](https://journee-nu.vercel.app/)

To run the app locally, just run the command `npm run dev`. 

