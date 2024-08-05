export type Id = number
export type ImagePath = string

export interface Image {
	imagePath: ImagePath
	imageName: string
	imageYear: string
}
export interface ComicsImages {
	id: Id
	images: Image[]
}
export interface ComicsItem {
	readonly resourceURI: string
	readonly name: string
}
export interface Comics {
	readonly available: number
	readonly collectionURI: string
	readonly items: ComicsItem[]
	readonly returned: number
}

export type ItemType = 'cover' | '' | 'interiorStory'

export interface StoriesItem {
	readonly resourceURI: string
	readonly name: string
	readonly type: ItemType
}
export interface Stories {
	readonly available: number
	readonly collectionURI: string
	readonly items: StoriesItem[]
	readonly returned: number
}

export type Extension = 'gif' | 'jpg'
export interface Thumbnail {
	readonly path: string
	readonly extension: Extension
}

export type URLType = 'comiclink' | 'detail' | 'wiki'
export interface URL {
	readonly type: URLType
	readonly url: string
}

export interface Character {
	readonly id: Id
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
