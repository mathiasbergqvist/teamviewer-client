import { Position, type Player } from './domain-models';
import { getFilteredPlayers, sortPlayers } from './sorting.helpers';

describe('sorting', () => {
	describe('sortPlayers()', () => {
		it('should sort players based on position', () => {
			const mockPlayers: Array<Player> = [
				{
					position: Position.Forward
				},
				{
					position: Position.Goalkeeper
				}
			] as Array<Player>;
			const expected = [{ position: 'Goalkeeper' }, { position: 'Forward' }];
			const actual = sortPlayers(mockPlayers);
			expect(actual).toEqual(expected);
		});
	});

	describe('getFilteredPlayers()', () => {
		it('should filter out ids of removed players', () => {
			const mockIds = ['id1', 'id3'];
			const mockAddedPlayers = [{ _id: 'id4' }, { _id: 'id5' }] as Array<Player>;
			const mockPlayers = [{ _id: 'id1' }, { _id: 'id2' }, { _id: 'id3' }] as Array<Player>;

			const expected = [{ _id: 'id2' }, { _id: 'id4' }, { _id: 'id5' }] as Array<Player>;
			const actual = getFilteredPlayers(mockIds, mockAddedPlayers, mockPlayers);
			expect(actual).toEqual(expected);
		});
	});
});
