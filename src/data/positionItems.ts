import { Position } from '../utils/domain-models';

type PositionItem = {
	value: Position;
	name: Position | string;
};

const positionItems: Array<PositionItem> = [
	{
		value: Position.Goalkeeper,
		name: Position.Goalkeeper
	},
	{
		value: Position.Defender,
		name: Position.Defender
	},
	{
		value: Position.LeftBack,
		name: 'Left Back'
	},
	{
		value: Position.CentreBack,
		name: 'Centre Back'
	},
	{
		value: Position.RightBack,
		name: 'Right Back'
	},
	{
		value: Position.Midfielder,
		name: Position.Midfielder
	},
	{
		value: Position.DefensiveMidfielder,
		name: 'Defensive Midfielder'
	},
	{
		value: Position.AttackingMidfielder,
		name: 'Attacking Midfielder'
	},
	{
		value: Position.Forward,
		name: Position.Forward
	},
	{
		value: Position.LeftWinger,
		name: 'Left Winger'
	},
	{
		value: Position.Striker,
		name: Position.Striker
	},
	{
		value: Position.RightWinger,
		name: 'Right Winger'
	},
	{
		value: Position.Forward,
		name: Position.Forward
	},
	{
		value: Position.Squad,
		name: Position.Squad
	}
];

export default positionItems;
