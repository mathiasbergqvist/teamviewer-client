<script lang="ts">
	import Reveal from './Reveal.svelte';
	import TeamTable from './TeamTable.svelte';
	import type { Team } from '../utils/domain-models';
	import { Heading, Select, Label, Spinner, Alert, Button } from 'flowbite-svelte';
	import { sortPlayersByType } from '../utils/sorting.helpers';

	export let data: { teams: Array<Team> };
	let selectedTeamId: string;
	let allIsRevealed: boolean = false;

	$: teamOptions = data.teams.map((team: Team) => ({
		value: team._id,
		name: team.name
	}));
	$: selectedTeam = data.teams.find((team: Team) => team._id === selectedTeamId);
	$: sortedPlayers = selectedTeam && sortPlayersByType(selectedTeam?.players);

	const setAllVisibility = (reveal: boolean) => {
		allIsRevealed = reveal;
	};
</script>

<svelte:head>
	<title>Team viewer</title>
	<meta name="description" content="Team viewer" />
</svelte:head>

<div>
	{#await data}
		<Spinner />
	{:then}
		<Heading>Team Viewer</Heading>
		<div class="select-container">
			<Label>
				Choose a team
				<Select
					class="select"
					items={teamOptions}
					bind:value={selectedTeamId}
					size="lg"
					style="width: 350px"
				/>
			</Label>
		</div>
		{#if selectedTeam !== undefined}
			<div>
				<Heading tag="h2" align="center">{selectedTeam.name}</Heading>
				<Reveal title="League" answer={selectedTeam.league} revealed />
				<Reveal title="Stadium" answer={selectedTeam.stadium} />
				<Reveal title="Manager" answer={selectedTeam.manager} />
				{#if sortedPlayers}
					<TeamTable
						heading={sortedPlayers.goalkeepers.heading}
						players={sortedPlayers.goalkeepers.players}
						{allIsRevealed}
					/>
					<TeamTable
						heading={sortedPlayers.defenders.heading}
						players={sortedPlayers.defenders.players}
						{allIsRevealed}
					/>
					<TeamTable
						heading={sortedPlayers.midfielders.heading}
						players={sortedPlayers.midfielders.players}
						{allIsRevealed}
					/>
					<TeamTable
						heading={sortedPlayers.forwards.heading}
						players={sortedPlayers.forwards.players}
						{allIsRevealed}
					/>
				{/if}
				<div class="button-container">
					<Button on:click={() => setAllVisibility(true)}>Show all</Button>
					<Button on:click={() => setAllVisibility(false)}>Hide all</Button>
				</div>
			</div>
		{/if}
	{:catch}
		<Alert>
			<span class="font-medium">Default alert!</span>
			Change a few things up and try submitting again.
		</Alert>
	{/await}
</div>

<style>
	.select-container {
		display: flex;
		justify-content: center;
		margin: 25px;
	}

	.button-container {
		display: flex;
		gap: 10px;
		margin: 25px 0;
	}
</style>
