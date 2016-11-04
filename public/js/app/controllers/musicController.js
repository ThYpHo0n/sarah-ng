function MusicCtrl($scope, $http) {
	var vm = this;
	vm.muteClient = muteClient;
	vm.setVolume = setVolume;
	$http.get('/music/config').then(function(response) {
		vm.moped = response.data.moped;
	});

	function muteClient(client) {
		$http.post('/music/mute', {'client': client, 'mute': !client.config.volume.muted}).then(function(response) {
			client.config.volume.muted = !client.config.volume.muted;
		}).catch(function(error) {
			console.log(error);
		});
	}

	function setVolume(client, volume) {
		$http.post('/music/volume', {'client': client, 'volume': volume}).then(function(response) {
			console.log(response.data);
		}).catch(function(error) {
			console.log(error);
		});
	}

	$http.get('/music').then(function(response) {
		if (!response.data.error) {
			vm.clients = response.data;
			angular.forEach(vm.clients, function(client) {
				client.volume = client.config.volume.percent;
				$scope.$watch(function() {
							return client.volume;
						}, function(newValue, oldValue) {
							if (newValue !== oldValue) {
								setVolume(client.host.mac, newValue);
							}
						}, true
				);
			});
		} else {
			console.log(response.data);
		}
	});
}
