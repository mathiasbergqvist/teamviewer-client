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
	import { onDestroy } from 'svelte';
	import debounce from 'debounce';

	export let handleSelectedPlayer: (player: Player) => void;
	export let players: Array<Player> = [];
	export let header: string;
	export let buttonText: string;

	let modalOpen: boolean;
	let searchTerm = '';
	let filteredItems = players;

	// A function to filter players based on the search term
	function updateFilteredItems() {
		filteredItems = players.filter((player) =>
			player.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}

	// Create a debounced version of the updateFilteredItems function
	const debouncedUpdateFilteredItems = debounce(updateFilteredItems, 300);

	// Watch searchTerm and players and call the debounced function
	$: {
		if (searchTerm) {
			debouncedUpdateFilteredItems();
		} else {
			filteredItems = players;
		}
	}

	// Cleanup debounced function on component destroy
	onDestroy(() => {
		debouncedUpdateFilteredItems.clear();
	});
</script>

{#if players.length > 0}
	<Button on:click={() => (modalOpen = true)} color="yellow" style="margin: 15px 0; width: 700px;"
		>{header}</Button
	>
	<Modal
		title={header}
		size="xl"
		style="min-height: 1500px;"
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
					<span class="sr-only">{buttonText}</span>
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
								{buttonText}
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
