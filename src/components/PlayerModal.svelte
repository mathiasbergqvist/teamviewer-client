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
	<Button 
		on:click={() => (modalOpen = true)} 
		color="yellow"
		style="margin: 15px 0; width: 500px;"
		>Add player</Button
	>
	<Modal
		title="Add Player"
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
			</TableHead>
			<TableBody class="divide-y">
				{#each filteredItems as player}
					<TableBodyRow on:click={() => handleSelectedPlayer(player)}>
						<TableBodyCell>{player.name}</TableBodyCell>
						<TableBodyCell>{player.number}</TableBodyCell>
						<TableBodyCell>{player.position}</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</TableSearch>
	</Modal>
{/if}