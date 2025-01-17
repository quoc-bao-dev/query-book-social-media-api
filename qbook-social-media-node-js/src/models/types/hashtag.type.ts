import { HashtagDocument } from '../hashtag.schema';

export type CreateHashTagInput = Pick<HashtagDocument, 'name'>;
