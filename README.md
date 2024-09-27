# 🍿 Where Can I Watch?
![Ekran Resmi 2024-08-08 13 53 32](https://github.com/user-attachments/assets/f72ebb31-59c4-4dc4-b026-1865e8bec880)
### An app that provides you any series or film "where can you watch" in your country.


## Tech Stack
It built with **TypeScript, Next.js, Tailwind, react-select, Zustand and TMDB API**

## How to run?

### Local Server(Not Recommended)
- You need to provide a `TMDB_API_KEY` on your env file.
- After that, just run:
	 ```sh
	 yarn && yarn start //or
	 npm i && npm run dev //or
	 pnpm i && pnpm run dev 
	 ```
 
### Docker
- Just run 
	```sh
	docker-compose -f docker-compose.dev.yml logs -f where-can-i-watch
	```
- Now, you can see the app on https://localhost:3000

## Roadmap
- A toast message for fetching issues(Need to investigate).
- Caching with Upstash KV or Redis.
