export interface Character {
	readonly id: number
	readonly name: string
	readonly description: string
	readonly modified: string
	readonly thumbnail: Thumbnail
	readonly resourceURI: string
	readonly comics: Comics
	readonly series: Comics
	readonly stories: Stories
	readonly events: Comics
	readonly urls: URL[]
}

export interface Comics {
	readonly available: number
	readonly collectionURI: string
	items: ComicsItem[]
	readonly returned: number
}

export interface ComicsItem {
	readonly resourceURI: string
	readonly name: string
	imagePath: string
}

export interface Stories {
	readonly available: number
	readonly collectionURI: string
	readonly items: StoriesItem[]
	readonly returned: number
}

export interface StoriesItem {
	readonly resourceURI: string
	readonly name: string
	readonly type: ItemType
}

export type ItemType = 'cover' | '' | 'interiorStory'

export interface Thumbnail {
	readonly path: string
	readonly extension: Extension
}

export type Extension = 'gif' | 'jpg'
export interface URL {
	readonly type: URLType
	readonly url: string
}

export type URLType = 'comiclink' | 'detail' | 'wiki'
