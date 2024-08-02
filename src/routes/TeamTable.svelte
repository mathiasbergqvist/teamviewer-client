<script lang="ts">
	import type { SortedFootballPlayers, SortedSoccerPlayers } from '../utils/sorting.helpers';
	import PlayerPositionTable from './PlayerPositionTable.svelte';
	export let players: SortedFootballPlayers | SortedSoccerPlayers;
	export let allIsRevealed: boolean = false;

	const isSortedSoccerPlayers = (obj: any): obj is SortedSoccerPlayers => {
		return (
			obj &&
			typeof obj === 'object' &&
			'goalkeepers' in obj &&
			'defenders' in obj &&
			'midfielders' in obj &&
			'forwards' in obj &&
			typeof obj.goalkeepers.heading === 'string' &&
			Array.isArray(obj.goalkeepers.players) &&
			typeof obj.defenders.heading === 'string' &&
			Array.isArray(obj.defenders.players) &&
			typeof obj.midfielders.heading === 'string' &&
			Array.isArray(obj.midfielders.players) &&
			typeof obj.forwards.heading === 'string' &&
			Array.isArray(obj.forwards.players)
		);
	};
</script>

{#if players && isSortedSoccerPlayers(players)}
	<PlayerPositionTable
		heading={players.goalkeepers.heading}
		players={players.goalkeepers.players}
		{allIsRevealed}
	/>
	<PlayerPositionTable
		heading={players.defenders.heading}
		players={players.defenders.players}
		{allIsRevealed}
	/>
	<PlayerPositionTable
		heading={players.midfielders.heading}
		players={players.midfielders.players}
		{allIsRevealed}
	/>
	<PlayerPositionTable
		heading={players.forwards.heading}
		players={players.forwards.players}
		{allIsRevealed}
	/>
{:else}
	<PlayerPositionTable
		heading={players.quarterbacks.heading}
		players={players.quarterbacks.players}
		{allIsRevealed}
	/>
	<PlayerPositionTable
		heading={players.runningBacks.heading}
		players={players.runningBacks.players}
		{allIsRevealed}
	/>
	<PlayerPositionTable
		heading={players.wideReceivers.heading}
		players={players.wideReceivers.players}
		{allIsRevealed}
	/>
	<PlayerPositionTable
		heading={players.tightEnds.heading}
		players={players.tightEnds.players}
		{allIsRevealed}
	/>
{/if}
