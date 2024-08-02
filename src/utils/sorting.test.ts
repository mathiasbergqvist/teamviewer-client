import { Position, type Goalkeeper, type Player } from './domain-models';
import {
	compareNames,
	compareNumber,
	filterPlayersByType,
	getFilteredPlayers,
	getSortedDefenders,
	getSortedForwards,
	getSortedMidfielders,
	sortFootballPlayersByType,
	sortSoccerPlayers,
	sortSoccerPlayersByType
} from './sorting.helpers';

describe('sorting.helpers', () => {
	describe('compareNames()', () => {
		test.each([
			['foo', 'bar', 1],
			['bar', 'foo', -1],
			['Bar', 'foo', -1],
			['foo', 'foo', 0],
			['bar', 'bar', 0]
		])('.compareNames(%s, %s)', (a: string, b: string, expected: number) => {
			const actual = compareNames({ name: a }, { name: b });
			expect(actual).toBe(expected);
		});
	});

	describe('compareNumber()', () => {
		test.each([
			[{ number: 1 }, { number: 2 }, -1],
			[{ number: 2 }, { number: 1 }, 1],
			[{ number: 1 }, { number: 1 }, 0]
		])(
			'.compareNumber(%s, %s)',
			(a: { number: number }, b: { number: number }, expected: number) => {
				const actual = compareNumber(a, b);
				expect(actual).toBe(expected);
			}
		);
	});

	describe('getSortedDefenders()', () => {
		it('should sort defenders based on defensive position and number', () => {
			const mockPlayers: Array<Player> = [
				{
					position: Position.LeftBack,
					number: 1
				},
				{
					position: Position.Defender,
					number: 3
				},
				{
					position: Position.LeftBack,
					number: 5
				},
				{
					position: Position.CentreBack,
					number: 6
				},
				{
					position: Position.CentreBack,
					number: 2
				},
				{
					position: Position.RightBack,
					number: 4
				}
			] as Array<Player>;
			const expected = [
				{ position: 'LeftBack', number: 1 },
				{ position: 'LeftBack', number: 5 },
				{ position: 'CentreBack', number: 2 },
				{ position: 'CentreBack', number: 6 },
				{ position: 'Defender', number: 3 },
				{ position: 'RightBack', number: 4 }
			];
			const actual = getSortedDefenders(mockPlayers);
			expect(actual).toEqual(expected);
		});
	});

	describe('getSortedMidfielders()', () => {
		it('should sort midfielders based on attacking position and number', () => {
			const mockPlayers: Array<Player> = [
				{
					position: Position.AttackingMidfielder,
					number: 7
				},
				{
					position: Position.Midfielder,
					number: 3
				},
				{
					position: Position.Defender,
					number: 2
				},
				{
					position: Position.DefensiveMidfielder,
					number: 4
				},
				{
					position: Position.AttackingMidfielder,
					number: 1
				}
			] as Array<Player>;
			const expected = [
				{ position: 'DefensiveMidfielder', number: 4 },
				{ position: 'Midfielder', number: 3 },
				{ position: 'AttackingMidfielder', number: 1 },
				{ position: 'AttackingMidfielder', number: 7 }
			];
			const actual = getSortedMidfielders(mockPlayers);
			expect(actual).toEqual(expected);
		});
	});

	describe('getSortedForwards()', () => {
		it('should sort forwards based on forward position and number', () => {
			const mockPlayers: Array<Player> = [
				{
					position: Position.LeftWinger,
					number: 1
				},
				{
					position: Position.DefensiveMidfielder,
					number: 4
				},
				{
					position: Position.Striker,
					number: 2
				},
				{
					position: Position.Forward,
					number: 3
				},
				{
					position: Position.RightWinger,
					number: 4
				},
				{
					position: Position.Forward,
					number: 7
				}
			] as Array<Player>;
			const expected = [
				{ position: 'LeftWinger', number: 1 },
				{ position: 'Striker', number: 2 },
				{ position: 'Forward', number: 3 },
				{ position: 'Forward', number: 7 },
				{ position: 'RightWinger', number: 4 }
			];
			const actual = getSortedForwards(mockPlayers);
			expect(actual).toEqual(expected);
		});
	});

	describe('filterPlayersByType()', () => {
		it('should filter players by type', () => {
			const mockPlayers: Array<Player> = [
				{
					position: Position.Goalkeeper,
					number: 1
				},
				{
					position: Position.Defender,
					number: 2
				},
				{
					position: Position.Midfielder,
					number: 3
				},
				{
					position: Position.Forward,
					number: 4
				},
				{
					position: Position.Goalkeeper,
					number: 5
				}
			] as Array<Player>;
			const expected = [
				{ position: 'Goalkeeper', number: 1 },
				{ position: 'Goalkeeper', number: 5 }
			];
			const actual = filterPlayersByType<Goalkeeper>(mockPlayers, Position.Goalkeeper);
			expect(actual).toEqual(expected);
		});
	});

	describe('sortFootballPlayersByType()', () => {
		it('should sort players by type', () => {
			const mockPlayers: Array<Player> = [
				{
					position: Position.Quarterback,
					number: 1
				},
				{
					position: Position.RunningBack,
					number: 2
				},
				{
					position: Position.WideReceiver,
					number: 88
				},
				{
					position: Position.WideReceiver,
					number: 3
				},
				{
					position: Position.TightEnd,
					number: 4
				},
				{
					position: Position.Quarterback,
					number: 5
				}
			] as Array<Player>;
			const expected = {
				quarterbacks: {
					heading: 'Quarterbacks',
					players: [
						{ position: 'Quarterback', number: 1 },
						{ position: 'Quarterback', number: 5 }
					]
				},
				runningBacks: {
					heading: 'Running Backs',
					players: [{ position: 'RunningBack', number: 2 }]
				},
				wideReceivers: {
					heading: 'Wide Receivers',
					players: [
						{ position: 'WideReceiver', number: 3 },
						{ position: 'WideReceiver', number: 88 }
					]
				},
				tightEnds: {
					heading: 'Tight Ends',
					players: [{ position: 'TightEnd', number: 4 }]
				}
			};
			const actual = sortFootballPlayersByType(mockPlayers);
			expect(actual).toEqual(expected);
		});
	});

	describe('sortSoccerPlayersByType()', () => {
		it('should sort players by type', () => {
			const mockPlayers: Array<Player> = [
				{
					position: Position.Goalkeeper,
					number: 1
				},
				{
					position: Position.Defender,
					number: 2
				},
				{
					position: Position.Midfielder,
					number: 3
				},
				{
					position: Position.Forward,
					number: 4
				},
				{
					position: Position.Goalkeeper,
					number: 5
				}
			] as Array<Player>;
			const expected = {
				goalkeepers: {
					heading: 'Goalkeepers',
					players: [
						{ position: 'Goalkeeper', number: 1 },
						{ position: 'Goalkeeper', number: 5 }
					]
				},
				defenders: {
					heading: 'Defenders',
					players: [{ position: 'Defender', number: 2 }]
				},
				midfielders: {
					heading: 'Midfielders',
					players: [{ position: 'Midfielder', number: 3 }]
				},
				forwards: {
					heading: 'Forwards',
					players: [{ position: 'Forward', number: 4 }]
				}
			};
			const actual = sortSoccerPlayersByType(mockPlayers);
			expect(actual).toEqual(expected);
		});
	});

	describe('sortSoccerPlayers()', () => {
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
			const actual = sortSoccerPlayers(mockPlayers);
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
