<script lang="ts">
	import { Alert, Heading, Spinner } from 'flowbite-svelte';
	import type { Player } from '../../utils/domain-models';

	export let data: { players: Array<Player> };
</script>

<svelte:head>
	<title>Edit player</title>
	<meta name="description" content="Edit player" />
</svelte:head>

{#await data}
	<Spinner />
{:then}
	<Heading>Edit Player</Heading>
{:catch}
	<Alert>
		<span class="font-medium">Error</span>
		Change a few things up and try submitting again.
	</Alert>
{/await}
