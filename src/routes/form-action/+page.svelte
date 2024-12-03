<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form method="POST" use:enhance>
	<input name="id" type="text" />
	<button>Submit</button>
</form>
