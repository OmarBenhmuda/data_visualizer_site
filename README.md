# Setting up the Database Visualizer Website


## Installing Node:
Before setting up the site locally, Node must be installed. 
https://nodejs.org/en/download/
The installer for Windows and macOS can be found in the link above.
Follow the installer instructions and node will be installed. Make sure to restart the computer to make sure all changes are saved.



## Cloning site locally:
https://github.com/OmarBenhmuda/workstudy-site
With access to the github link above, choose a spot locally where you wish to keep the source code. Then open powershell/terminal and run the command below:
***git clone https://github.com/OmarBenhmuda/workstudy-site***



## Installing Angular
If angular is already installed skip to the next step
To install angular run the command below on powershell/terminal

***npm install -g @angular/cli***

Next run:

***ng v***

If you get an error like below:
ng : File C:\Users\Omar\AppData\Roaming\npm\ng.ps1 cannot be loaded because running scripts is disabled on this system.  For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170,
Right click on the start button on the bottom left, and click on “Windows PowerShell (Admin)”
Run the follow command below and enter “Y” after in order to resolve the error:

***set-ExecutionPolicy Undefined -Scope CurrentUser***



## Installing Node Dependencies:
In the root folder of the newly added repo (workstudy-site) folder, run the command below:

***npm install***

That will install all the current node modules being used for the project. 



## Development Server (displaying the site):
In order to see how the site looks, you can start a development server with the command below:

***ng serve***

The server should be running on port 4200. Copy and paste http://localhost:4200/ into the browser (if it does not open up automatically) in order to view the site



## The Server:
The file “app.js” within the "backend" folder is what contains the node application and handles the API calls. When the application is built and contained in the folder /dist/workstudy-site/, the Node app uses the contents in that folder when app.js is running.
To run the application simply run the command:

***node app.js***

If the latest version of the website is not built, the app.js will display the latest version of the website in /dist/workstudy-site/. 
You can keep the app.js running while also using the development server demonstrated in the section above this one. 



## Building the app for production:
When the application is ready to be published onto a domain, you can run the command below:

***ng build --prod***

That will build the application and condense it into usable web files recognized by the browser. The built files will go into /dist/workstudy-site/.  Now when “app.js” file is run, these files will be used to display the contents of the site.





# Source Code:

## Backend Folder:
The backend folder contains the app.js file which you can run:

***node app.js***

This will start the application on port 3000. The developer can have this running alongside the angular development server (port 4200).

The editable UI contents of the website can be found in the “src” folder in the the site folder. 
The different folders/files within the src include:
“app” folder

## Components folder:
The components folder includes all the different components made for the application. For example, there is the fixed range component which is displayed when the Fixed Range is selected on the dropdown menu. Likewise, when the Realtime is selected, the realtime component is shown. 
To generate a new component, use the command below:

***ng g c components/[COMPONENT_NAME]***
  
## Services folder:
Within the services folder there is the data.service.ts file. This file handles all the API calls. If the PORT variable changes in the app.js file, it must also be changed in the data.service file. 
  
## app.component.css:
This CSS file is used for the global styling of the website. Whatever styles applied here are applied to every component.

## app.component.html:
This is the main HTML file used for the application. All components generated can be called within here. Within here there are 2 <div> containers that are shown. The display of these is handled using the “*ngIf” attribute. If the graphType variable is changed within the app.component.ts file, it will show the corresponding graph container. 
  
## app.component.ts:
This typescript file is used to control the app.component.html file. In this file the Sensor node checkbox Booleans are handled. It also holds the graphType variable which is used in app.componenent.html.
  
## app.module.ts:
This file contains all the declerations for the components created, and the built-in angular components used. 



