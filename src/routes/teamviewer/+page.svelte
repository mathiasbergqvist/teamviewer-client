<svelte:head>
	<title>Team viewer</title>
	<meta name="description" content="Team viewer" />
</svelte:head>

<script lang="ts">
	import Reveal from "./Reveal.svelte";
	import TeamTable from "./TeamTable.svelte";
	import type { Team } from "./models";
	import {Heading, P, Select, Label, Spinner, Alert} from 'flowbite-svelte';

    export let data: {teams: Array<Team>};
	let selectedTeamId: string;

	$: teamOptions = data.teams.map((team: Team) => ({
		value: team._id,
		name: team.name,
	}));
	$: selectedTeam = data.teams.find((team: Team) => team._id === selectedTeamId);
</script>

<div>
	{#await data}
		<Spinner />
	{:then}
		<Heading>Team Viewer</Heading>
		<P size="lg">Let me see how it looks...</P>
		<Label>
			Choose a team
			<Select class="mt-2" items={teamOptions} bind:value={selectedTeamId} />
		</Label>
		{#if selectedTeam !== undefined}
			<Heading tag="h2">{selectedTeam.name}</Heading>
			<Reveal title="League" answer={selectedTeam.league} revealed />
			<Reveal title="Stadium" answer={selectedTeam.stadium} />
			<Reveal title="Manager" answer={selectedTeam.manager} />
			<TeamTable players={selectedTeam.players} />		
		{/if}
	{:catch}
		<Alert>
			<span class="font-medium">Default alert!</span>
			Change a few things up and try submitting again.
	  	</Alert>
	{/await}
</div>
