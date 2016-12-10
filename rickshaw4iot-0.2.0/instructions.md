Instructions for iot-visualization
-----------------------------------

1. [Install the cf command-line tool](https://www.ng.bluemix.net/docs/#starters/BuildingWeb.html#install_cf).
2. [Download the iot-visualization application](https://github.com/jeffdare/iot-visualization/archive/v0.1.0.zip).
3. Extract the package and `cd` to it. And edit the manifest.yml file with the application that you have created in Bluemix. If your application's name is 'iotsample', then modify it as follows
		disk_quota: 1024M
		host: iotsample
		name: iotsample
		command: node app.js

4. Connect to Bluemix:

		cf api https://api.ng.bluemix.net

5. Log into Bluemix:

		cf login -u <your Bluemix Id>
		//optional step, not needed if you are pushing to default org and space
		cf target -o <your org> -s dev

6. Deploy your app:

		cf push <your bluemix-application-name>

7. Access your app: <your bluemix-application-name>.mybluemix.net

