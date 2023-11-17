<svelte:head>
	<title>Team viewer</title>
	<meta name="description" content="Team viewer" />
</svelte:head>

<script lang="ts">
	import type { Team } from "./models";


    export let data: {teams: Array<Team>};
</script>

<div class="text-column">
	<h1>This is the team viewer</h1>
	<p>Let me see how it looks...</p>

    <ul>
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
    </ul>
    

	<ul>
		<li>Item 1</li>
		<li>Item 2</li>
		<li>Item 3</li>
		<li>Item 4</li>
	</ul>
	<form>
		<label for="pet-select">Choose a pet:</label>
		<select name="pets" id="pet-select">
			<option value="">--Please choose an option--</option>
			<option value="dog">Dog</option>
			<option value="cat">Cat</option>
			<option value="hamster">Hamster</option>
			<option value="parrot">Parrot</option>
			<option value="spider">Spider</option>
			<option value="goldfish">Goldfish</option>
		</select>
	</form>
</div>
