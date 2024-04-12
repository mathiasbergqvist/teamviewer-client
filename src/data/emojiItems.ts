import countryFlagEmoji from 'country-flag-emoji';
import { compareNames } from '../utils/sorting.helpers';

type EmojiItem = {
	name: string;
	value: string;
};

const sortedEmojiItems = countryFlagEmoji.list.sort(compareNames);
const emojiItems: Array<EmojiItem> = sortedEmojiItems.map((emojiData: any) => ({
	name: `${emojiData.emoji} ${emojiData.name}`,
	value: emojiData.code
}));

export default emojiItems;
