<script lang="ts">
	import type { Player } from '../utils/domain-models';
	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Table
	} from 'flowbite-svelte';
	import { getFilteredPlayers, sortPlayers } from '../utils/sorting.helpers';
	import countryFlagEmoji from 'country-flag-emoji';

	export let players: Array<Player>;
	export let removedPlayerIds: Array<string> = [];
	export let addedPlayers: Array<Player> = [];

	$: sortedPlayers = sortPlayers(players);
	$: filteredPlayers =
		removedPlayerIds.length > 0 || addedPlayers.length > 0
			? getFilteredPlayers(removedPlayerIds, addedPlayers, players)
			: sortedPlayers;
	export let handleRemovePlayer: (player: Player) => void;
</script>

{#if filteredPlayers.length > 0}
	<caption
		class="p-5 text-lg font-semibold text-left text-gray-900 dark:text-white dark:bg-gray-800"
		>Players</caption
	>
	<Table striped={true}>
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Number</TableHeadCell>
			<TableHeadCell>Position</TableHeadCell>
			<TableHeadCell>Country</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Remove</span>
			</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
			{#each filteredPlayers as { number, countryUnicode, position, name, _id }}
				<TableBodyRow>
					<TableBodyCell>{name}</TableBodyCell>
					<TableBodyCell>{number}</TableBodyCell>
					<TableBodyCell>{position}</TableBodyCell>
					{#if countryUnicode !== undefined}
						<TableBodyCell>{countryFlagEmoji.get(countryUnicode)?.emoji}</TableBodyCell>
					{/if}
					<TableBodyCell>
						<a
							on:click={() => handleRemovePlayer(player)}
							class="font-medium text-primary-600 hover:underline dark:text-primary-500">Remove</a
						>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
{/if}

<style>
	a:hover {
		cursor: pointer;
	}
</style>
