<svelte:head>
	<title>Team viewer</title>
	<meta name="description" content="Team viewer" />
</svelte:head>

<script lang="ts">
	import Reveal from "./Reveal.svelte";
	import type { Team } from "./models";
	import {Heading, P, Select, Label} from 'flowbite-svelte';

    export let data: {teams: Array<Team>};
	let selectedTeamId: string;

	$: teamOptions = data.teams.map((team: Team) => ({
		value: team._id,
		name: team.name,
	}));
	$: selectedTeam = data.teams.find((team: Team) => team._id === selectedTeamId);
</script>

<div class="text-column">
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
	{/if}
		
    <!-- <ul>
        {#each data.teams as { name, stadium, manager, league, players }}
            <li>
                <h2>Name: {name}</h2>
                <h2>Stadium: {stadium}</h2>
                <h2>Manager: {manager}</h2>
                <h2>League: {league}</h2>
                <ul>
                    {#each players as { name, position, number }}
                        <li>
                            <h3>Who?: {name}, {number}</h3>
                            <h3>Position: {position}</h3>
                        </li>
                    {/each}
                </ul>
            </li>
        {/each}
    </ul> -->
</div>
