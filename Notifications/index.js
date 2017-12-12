const notification = new Notification(
	'Title of notification',
	{
		body: 'Body of notification'
	}
);
notification.onclick = () => {
	console.log('Notification clicked');
};