<script lang="ts">
	import { Alert } from 'flowbite-svelte';
	export let statusMessage: 'success' | 'error' | 'hide' | 'incomplete' = 'hide';
	export let successMessage: string;
</script>

<div class="alert">
	{#if statusMessage === 'error'}
		<Alert color="red">Something went wrong. Please try again.</Alert>
	{:else if statusMessage === 'success'}
		<Alert color="green">
			{successMessage}
		</Alert>
	{:else if statusMessage === 'incomplete'}
		<Alert>Please fill in the complete form</Alert>
	{/if}
</div>

<style>
	.alert {
		margin: 20px;
		max-width: 500px;
	}
</style>
