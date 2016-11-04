# S.A.R.A.H.
This is a very much custom tailored webui for controlling lights, music and showing graphs. It's far from a generic solution or being stable. Feel free to make PRs.

## The backend (express.js)
It consists mainly of wrappers around python scripts to handle RPC calls to my Snapcast Server and interacting with my lamps (via piLight and BLE). The python scripts can be found in bin/scripts and the according services are in the services folder. Other then that it serves the static content of the Angular app and libs. 

## The frontend (Angular 1.x)
The Angular app can be found in public/js/app.

## Configuration
### lights.js
Example configuration:

	[
		{
			"id": 1,
			"name": "Backlight left",
			"room": "Bedroom",
			"type": "433hz_1_1"
		},
		{
			"id": 2,
			"name": "Backlight right",
			"room": "Bedroom",
			"type": "433hz_1_2"
		},
		{
			"id": 3,
			"name": "Ceiling light",
			"room": "Bedroom",
			"type": "433hz_1_3"
		},
		{
			"id": 4,
			"name": "Ceiling light",
			"room": "Living room",
			"type": "bt_lixada_rgb"
		}
	]
Here we configure 4 different lights, the first 3 are based on piLight 433hz. The last one is a Lixada RGB BLE light bulb. You can assign each light to a room and give it a dedicated name. It should be easy to add new types of lights quite easy with the given structure. Just have a look at the routes/lights.js 
### music.json
Example configuration:

	{
		"moped": {
			"url": "//sarah:6680/moped"
		}
	}
This one is quite easy because we just assume that the Snapcast server is running on the same device as this web ui. Nevertheless it should be quite easy to refactor it and configure the snapcast server ip via the music.json file. 

## ToDos
- Implement a rgb chooser for rgb BLE bulbs
- Implement heaters
- Refactor everything related to the database to make it pretty
- Make the hole app more generic, make things easier configurable (e.g. the snapcast server ip)
