<script lang="ts">
	import Reveal from './Reveal.svelte';
	import TeamTable from './TeamTable.svelte';
	import type { Team } from '../utils/domain-models';
	import { Heading, Select, Label, Spinner, Alert, Button } from 'flowbite-svelte';
	import { sortPlayersByType } from '../utils/sorting.helpers';

	export let data: { teams: Array<Team> };
	let selectedTeamId: string;
	let selectedLeague: string;
	let allIsRevealed: boolean = false;
	let leagues: Array<{ name: string; value: string }> = [{ value: 'all', name: 'All' }];

	$: filteredTeams =
		selectedLeague && selectedLeague !== 'all'
			? data.teams.filter((team: Team) => team.league === selectedLeague)
			: data.teams;
	$: teamOptions = filteredTeams
		.sort((a, b) => a.name.localeCompare(b.name))
		.map((team: Team) => ({
			value: team._id,
			name: team.name
		}));
	$: selectedTeam = data.teams.find((team: Team) => team._id === selectedTeamId);
	$: sortedPlayers = selectedTeam && sortPlayersByType(selectedTeam?.players);

	data.teams.forEach((team: Team) => {
		if (!leagues.find((league) => league.value === team.league)) {
			leagues.push({ value: team.league, name: team.league });
		}
	});

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
			<Select
				class="select"
				items={leagues}
				bind:value={selectedLeague}
				size="lg"
				style="width: 200px"
				placeholder="League"
			/>
			<Select
				class="select"
				items={teamOptions}
				bind:value={selectedTeamId}
				size="lg"
				style="width: 300px"
				placeholder="Team"
			/>
		</div>
		{#if selectedTeam !== undefined}
			<hr />
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
	hr {
		border-top: thick double var(--color-theme-1);
		margin-bottom: 25px;
	}
	.select-container {
		display: flex;
		gap: 10px;
		flex-direction: row;
		justify-content: center;
		margin: 50px 25px 25px 25px;
	}

	.button-container {
		display: flex;
		gap: 10px;
		margin: 25px 0;
	}
</style>
