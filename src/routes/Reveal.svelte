<script lang="ts">
	import { Button, Span } from 'flowbite-svelte';
	import { QuestionCircleSolid } from 'flowbite-svelte-icons';
	export let answer: string;
	export let title: string;
	export let revealed: boolean = false;

	const handleReveal = () => {
		revealed = true;
	};
</script>

<div>
	<Span>
		{title}:
	</Span>
	{#if revealed}
		<Span size="lg">
			{answer}
		</Span>
	{:else}
		<Button on:click={handleReveal} size="lg">
			<QuestionCircleSolid class="w-4 h-4 mr-2" /> Reveal
		</Button>
	{/if}
</div>

<style>
	div {
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 15px 0;
		min-height: 50px;
	}
</style>
