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
	import { removePlayersFromArray, sortPlayers } from '../utils/sorting';

	export let players: Array<Player>;
	export let removedPlayerIds: Array<string> = [];

	$: sortedPlayers = sortPlayers(players);
	$: filteredPlayers =
		removedPlayerIds.length > 0 ? removePlayersFromArray(removedPlayerIds, players) : sortedPlayers;
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
			<TableHeadCell>
				<span class="sr-only">Remove</span>
			</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
			{#each filteredPlayers as player}
				<TableBodyRow>
					<TableBodyCell>{player.name}</TableBodyCell>
					<TableBodyCell>{player.number}</TableBodyCell>
					<TableBodyCell>{player.position}</TableBodyCell>
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
	a {
		&:hover {
			cursor: pointer;
		}
	}
</style>
