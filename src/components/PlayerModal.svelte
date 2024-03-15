<script lang="ts">
	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Modal,
		Button
	} from 'flowbite-svelte';
	import countryFlagEmoji from 'country-flag-emoji';
	import type { Player } from '../utils/domain-models';

	export let handleSelectedPlayer: (player: Player) => void;
	export let players: Array<Player> = [];
	let modalOpen: boolean;
	let searchTerm = '';
	$: filteredItems = players.filter(
		(player) => player.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
</script>

{#if players.length > 0}
	<Button on:click={() => (modalOpen = true)} color="yellow" style="margin: 15px 0; width: 500px;"
		>Add player</Button
	>
	<Modal
		title="Add Player"
		style="min-height: 500px;"
		bind:open={modalOpen}
		on:close={() => {
			modalOpen = false;
		}}
		autoclose
	>
		<TableSearch placeholder="Search player name" hoverable={true} bind:inputValue={searchTerm}>
			<TableHead>
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>Number</TableHeadCell>
				<TableHeadCell>Position</TableHeadCell>
				<TableHeadCell>Country</TableHeadCell>
				<TableHeadCell>
					<span class="sr-only">Add</span>
				</TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#each filteredItems as player}
					<TableBodyRow>
						<TableBodyCell>{player.name}</TableBodyCell>
						<TableBodyCell>{player.number}</TableBodyCell>
						<TableBodyCell>{player.position}</TableBodyCell>
						{#if player.countryUnicode !== undefined}
							<TableBodyCell>{countryFlagEmoji.get(player.countryUnicode)?.emoji}</TableBodyCell>
						{/if}
						<TableBodyCell>
							<a
								class="font-medium text-primary-600 hover:underline dark:text-primary-500"
								on:click={() => handleSelectedPlayer(player)}
							>
								Add
							</a>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</TableSearch>
	</Modal>
{/if}

<style>
	a:hover {
		cursor: pointer;
	}
</style>
