// @ts-ignore
import { data } from './fake-data'

// const API_URL = `${import.meta.env.VITE_API_URL}/`

export interface IData {
	link: string
	text: string
	timestamp: string
}

export const fetchSubtitles = async (): Promise<IData[]> => {
	return data

	// return await fetch(API_URL).then(response => response.json())
}
