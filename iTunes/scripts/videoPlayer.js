export const videoPlayerInit = () => {

	const videoPlayer = document.querySelector('.video-player');
	const videoButtonPlay = document.querySelector('.video-button__play');
	const videoButtonStop = document.querySelector('.video-button__stop');
	const videoTimePassed = document.querySelector('.video-time__passed');
	const videoProgress = document.querySelector('.video-progress');
	const videoTimeTotal = document.querySelector('.video-time__total');
	const videoVolume = document.querySelector('.video-volume');
	const videoFullscreen = document.querySelector('.video-fullscreen');		
	const volumeDownIcon = document.querySelector('.volume-down-icon');
	// const volumeOffIcon = document.querySelector('.volume-off-icon');
	const volumeUpIcon = document.querySelector('.volume-up-icon');

	const toggleIcon = () => {
		if (videoPlayer.paused){
			videoButtonPlay.classList.remove('fa-pause');
			videoButtonPlay.classList.add('fa-play');
		} else {
			videoButtonPlay.classList.remove('fa-play');
			videoButtonPlay.classList.add('fa-pause');
		}
	};



	const togglePlay = (event) => {
		event.preventDefault();

		if (videoPlayer.paused){
			videoPlayer.play();
		} else {
			videoPlayer.pause();
		}
		toggleIcon();
	};

	const stopPlay = () => {
		videoPlayer.pause();
		videoPlayer.currentTime = 0;
	};

	const addZero = n => n < 10 ? '0' + n : n;

	const changeValue =  () => {
		const valueVolume = videoVolume.value;
		videoPlayer.volume = valueVolume / 100;

		toggleVolumeIcon();
		
		
	};

	const toggleVolumeIcon = () => {
		if (videoPlayer.volume == 0){
			volumeDownIcon.classList.remove('fa-volume-down');
			volumeDownIcon.classList.add('fa-volume-off');
		} else {
			volumeDownIcon.classList.remove('fa-volume-off');
			volumeDownIcon.classList.add('fa-volume-down');
		}
	};

	videoPlayer.addEventListener('click', togglePlay);
	videoButtonPlay.addEventListener('click', togglePlay);

	videoPlayer.addEventListener('play', toggleIcon);
	videoPlayer.addEventListener('pause', toggleIcon);

	videoButtonStop.addEventListener('click', stopPlay);

	videoPlayer.addEventListener('timeupdate', () => {
		const currentTime = videoPlayer.currentTime;
		const duration = videoPlayer.duration;
		
		videoProgress.value = (currentTime / duration) * 100;

		let minutePassed = Math.floor(currentTime / 60);
		let secondsPassed = Math.floor(currentTime % 60);

		let minuteTotal = Math.floor(duration / 60);
		let secondsTotal = Math.floor(duration % 60);
		//console.log(minutePassed, minuteTotal);

		
		videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
		videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;

		
	});

	videoProgress.addEventListener('input', () => {
		const duration = videoPlayer.duration;
		const value = videoProgress.value;

		videoPlayer.currentTime = (value * duration) / 100;
	});

	videoVolume.addEventListener('input', changeValue);

	videoPlayer.addEventListener('volumechange', () => {
		videoVolume.value = Math.round(videoPlayer.volume * 100);
		//	changeVolume();
		
	});


	volumeDownIcon.addEventListener('click', () => {
		videoPlayer.volume = 0;
		//toggleVolumeIcon();
	});

	

	changeValue();


	videoFullscreen.addEventListener('click', changeValue);
	

};

