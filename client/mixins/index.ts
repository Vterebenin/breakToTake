import { User } from 'types'

export const sendNotification = async (user?: User, title?: string, text?: string) => {
	const notificationTitles = [
		'Its time...',
		'Hey, relax!',
		`Rest break, mr ${user ? user.username : 'Anderson'}...`,
		'Have a free time!'
	]

	const notificationBodies = [
		'Let your eyes be fine for some time, take a break!',
		'Its time to dream break',
		'Breaking out it is',
	]

  const access = await Notification.requestPermission()
  if (access === 'granted') {
	  const nTitle = title || notificationTitles[Math.floor(Math.random()*(notificationTitles.length - 1))]
  	const nBody = text || notificationBodies[Math.floor(Math.random()*(notificationBodies.length - 1))]

		const notification = new Notification(nTitle, {body: nBody, icon: '/flowers.jpg'})
	  console.log(notification)
  }
}