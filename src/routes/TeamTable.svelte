<script lang="ts">
	import type { Player } from '../../utils/domain-models';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button
	} from 'flowbite-svelte';
	import { QuestionCircleSolid } from 'flowbite-svelte-icons';
	import countryFlagEmoji from 'country-flag-emoji';

	export let heading: string;
	export let players: Array<Player>;

	let revealed: Array<string> = [];

	$: isRevealed = (id: string) => revealed.includes(id);

	const handleReveal = (id: string) => {
		revealed = [...revealed, id];
	};
</script>

<Table striped={true}>
	<caption class="p-5 text-lg font-semibold text-left text-gray-900" style="padding: 25px 0 0 0"
		>{heading}</caption
	>
	<TableHead>
		<TableHeadCell>Number</TableHeadCell>
		<TableHeadCell>Country</TableHeadCell>
		<TableHeadCell>Position</TableHeadCell>
		<TableHeadCell>Name</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each players as { number, countryUnicode, position, name, _id }}
			<TableBodyRow class="!h-12">
				<TableBodyCell>{number}</TableBodyCell>
				{#if countryUnicode !== undefined}
					<TableBodyCell>{countryFlagEmoji.get(countryUnicode)?.emoji}</TableBodyCell>
				{/if}
				<TableBodyCell>{position}</TableBodyCell>
				<TableBodyCell>
					{#if isRevealed(_id)}
						<p class="name">{name}</p>
					{:else}
						<Button on:click={() => handleReveal(_id)}>
							<QuestionCircleSolid class="w-4 h-4 mr-2" /> Reveal
						</Button>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<style>
	.name {
		font-weight: bold;
		line-height: 40px;
	}
</style>
