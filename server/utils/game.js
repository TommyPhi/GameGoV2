// Function that grabs data via API from IGDB and returns an array of objects with game data.
function game() {
  return fetch(
    // API endpoint
    "https://api.igdb.com/v4/games",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        // Refactor to use environment variables
        "Client-ID": "l83wlx5z3n90drfbn3q1izomvhpz0m",
        Authorization: "Bearer ubsmghb3xn8rm99vca1msxr4oucy65",
      },
      // Query to filter data
      body: `
          fields name, cover.image_id, total_rating, genres.name, release_dates.human, summary, artworks.image_id, videos.video_id, involved_companies.company.name, involved_companies.publisher, involved_companies.developer, game_modes.name;
          limit 25;
          where aggregated_rating > 90 & rating > 90 & involved_companies.developer = true;
          offset 25;
          sort rating desc;
        `,
    }
  )
    .then((response) => {
      return response.json().then((result) => {
        // Array to store game data
        const games = [];

        // Loop through the data and push it to the games array
        result.forEach((game) => {
          // Variables to store the developer and publisher
          let publisher;
          let developer;
          // Loop through the involved_companies array and check if the company is a developer, publisher or both
          game.involved_companies.forEach((company) => {
            if (company.publisher == false && company.developer == false) {
              return;
            } else if (company.developer == true && company.publisher == true) {
              developer = company.company.name;
              publisher = company.company.name;
            } else if (
              company.developer == true &&
              company.publisher == false
            ) {
              developer = company.company.name;
            } else if (
              company.developer == false &&
              company.publisher == true
            ) {
              publisher = company.company.name;
            }
          });

          // Array to store the artworks
          const artworks = [];
          // Loop through the artworks array and push the image_id to the artworks array
          if (game.artworks === undefined) {
            return;
          } else if (game.artworks.length < 6) {
            game.artworks.forEach((artwork) => {
              artworks.push(
                `https://images.igdb.com/igdb/image/upload/t_1080p/${artwork.image_id}.jpg`
              );
            });
          } else {
            for (let i = 0; i < 6; i++) {
              artworks.push(
                `https://images.igdb.com/igdb/image/upload/t_1080p/${game.artworks[i].image_id}.jpg`
              );
            }
          }

          // Arrays to store the genres
          const genres = [];
          // Loop through the genres array and push the name to the genres array
          game.genres.forEach((genre) => {
            genres.push(genre.name);
          });

          // Arrays to store the game modes
          const game_modes = [];
          // Loop through the game_modes array and push the name to the game_modes array
          game.game_modes.forEach((gameMode) => {
            game_modes.push(gameMode.name);
          });

          // Push the game data to the games array
          games.push({
            id: game.id,
            name: game.name,
            developer: developer,
            publisher: publisher,
            release_date: game.release_dates[0].human,
            genres: genres,
            game_modes: game_modes,
            rating: Math.round(game.total_rating),
            summary: game.summary,
            game_cover_url: `https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg`,
            artworks: artworks,
            video_link: `https://www.youtube.com/watch?v=${game.videos[0].video_id}`,
          });
        });
        return games;
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = game;
