function LightsCtrl($http) {
	var vm = this;
	vm.toggleLight = toggleLight;
	vm.toggleRoom = toggleRoom;

	$http.get('/lights').then(function(response) {
		vm.lights = response.data;console.log(response.data);
		vm.rooms = [];
		vm.lights.filter(function(light) {
			var rooms = vm.rooms.filter(function (room) {
				return room.name == light.room;
			});
			if (rooms.length == 0) {
				vm.rooms.push({'name' : light.room, 'state' : 0});
				return true;
			} else {
				return false;
			}
		});

		angular.forEach(vm.rooms, function (room) {
			angular.forEach(vm.lights, function (light) {
				if(light.state == 1) {
					room.state = 1;
				}
			});
		});
	});

	function toggleLight(light) {
		$http.post('/lights/toggle/' + light.id).then(function(response) {
			angular.forEach(vm.lights, function (aLight, key) {
				if(aLight.id == light.id) {
					vm.lights[key].state = response.data.state;
				}
			});
			vm.rooms.filter(function (room) {
				if(room.name == light.room) {
					if(response.data.state == 1) {
						room.state = 1;
					} else {
						var roomLightsOff = vm.lights.filter(function (light) {
							if(light.room == room.name && light.state == 0) {
								return true;
							}
						});
						var roomLights = vm.lights.filter(function (light) {
							if(light.room == room.name) {
								return true;
							}
						});
						if(roomLightsOff.length == roomLights.length) {
							room.state = 0;
						}
					}
				}
			});
		});
	}

	function toggleRoom(room, state) {
		var state = (state) ? 0 : 1;
		$http.post('/lights/toggle-room/' + room, {'room': room, 'state': state}).then(function(response) {
			angular.forEach(vm.lights, function (aLight, key) {
				if(aLight.room == room) {
					vm.lights[key].state = response.data.state;
				}
			});
			vm.rooms.filter(function (aRoom) {
				if(aRoom.name == room) {
					aRoom.state = state;
				}
			})
		});
	}
}
