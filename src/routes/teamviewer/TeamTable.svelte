<script lang="ts">
	import type { Player } from "./models";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch, Button } from 'flowbite-svelte';

    export let players: Array<Player>;

    let revealed: Array<string> = [];

    $: isRevealed = (id: string) => revealed.includes(id);

    const handleReveal = (id: string) => {
        revealed = [...revealed, id];
    };
</script>

<Table striped={true}>
    <TableHead>
        <TableHeadCell>Number</TableHeadCell>
        <TableHeadCell>Country</TableHeadCell>
        <TableHeadCell>Position</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
    </TableHead>
    <TableBody>
        {#each players as { number, countryUnicode, position, name, _id }}
            <TableBodyRow>
                <TableBodyCell>{number}</TableBodyCell>
                <TableBodyCell>&#{countryUnicode};</TableBodyCell>
                <TableBodyCell>{position}</TableBodyCell>
                <TableBodyCell>
                    {#if isRevealed(_id)}
                        {name}
                    {:else}
                        <Button on:click={() => handleReveal(_id)}>
                            ???
                        </Button>
                    {/if}
                </TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>