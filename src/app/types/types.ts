export type movieT = {
  id: number
  name: string
  year: number
  description: string
  genre: genresT[]
}

export enum genresT {
  'драма' = 1,
  'биография',
  'история',
  'фэнтези',
  'приключения',
  'боевик',
  'мультфильм',
  'комедия',
  'триллер',
  'детектив',
  'фантастика',
}
