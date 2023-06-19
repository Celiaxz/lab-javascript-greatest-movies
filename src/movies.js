// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map((movie) => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }
  const spielbergMovies = moviesArray.filter(
    (movie) =>
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
  );
  return spielbergMovies.length;
}

function sumScores(movies) {
  const scores = movies.reduce((sum, movie) => {
    if (movie.score) {
      return sum + movie.score;
    } else {
      return sum;
    }
  }, 0);
  return scores;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }
  const tScores = sumScores(moviesArray);
  const scoreAvg = tScores / moviesArray.length;
  return Number(scoreAvg.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter((movie) =>
    movie.genre.includes("Drama")
  );
  if (dramaMovies.length === 0) {
    return 0;
  }
  const tScore = sumScores(dramaMovies); //to find the score for drama movies
  const scoreAvg = tScore / dramaMovies.length;
  return Number(scoreAvg.toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  let sortMovies = moviesArray.slice();

  sortMovies.sort((movieA, movieB) => {
    if (movieA.year !== movieB.year) {
      return movieA.year - movieB.year;
    } else {
      const titlA = movieA.title.toLowerCase();
      const titlB = movieB.title.toLowerCase();

      if (titlA < titlB) {
        return -1;
      } else if (titlA > titlB) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  return sortMovies;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const sortMovies = moviesArray.slice(); // Create a copy of the original array

  sortMovies.sort((movieA, movieB) => {
    const titlA = movieA.title.toLowerCase();
    const titlB = movieB.title.toLowerCase();

    if (titlA < titlB) {
      return -1; // Sort movieA before movieB
    } else if (titlA > titlB) {
      return 1; // Sort movieB before movieA
    } else {
      return 0; // Keep the order unchanged if titles are the same
    }
  });
  const firsttwentyTitles = sortMovies.slice(0, 20).map((movie) => movie.title);
  return firsttwentyTitles;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map((movie) => {
    const duration = movie.duration;
    let totalMinutes = 0;

    if (duration.includes("h") && duration.includes("min")) {
      const [hours, minutes] = duration.split("h ");
      totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    } else if (duration.includes("h")) {
      totalMinutes = parseInt(duration) * 60;
    } else {
      totalMinutes = parseInt(duration);
    }
    const updatedMovie = { ...movie };
    updatedMovie.duration = totalMinutes;
    return updatedMovie; // Return the updated movie object with the duration in minutes
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  // Check if the array is empty
  if (moviesArray.length === 0) {
    return null;
  }

  // Object to store the count and total score for each year
  const yearToScores = {};

  moviesArray.forEach((movie) => {
    const year = movie.year;
    const score = movie.score;

    const ratingsObject = yearToScores[year];

    if (ratingsObject === undefined) {
      yearToScores[year] = { ratings: [score] };
    } else {
      ratingsObject.ratings.push(score);
    }
  });

  for (const year in yearToScores) {
    const ratings = yearToScores[year].ratings;
    const sumOfScores = ratings.reduce((sum, score) => sum + score, 0);
    const averageScore = sumOfScores / ratings.length;
    yearToScores[year].averageScore = averageScore;
  }

  let bestYear = "";
  for (const year in yearToScores) {
    const averageScore = yearToScores[year].averageScore;
    let bestYearAvgScore = 0;
    if (bestYear !== "") {
      bestYearAvgScore = yearToScores[bestYear].averageScore;
    }
    if (averageScore > bestYearAvgScore) {
      bestYear = year;
    }
  }
  const bestAverageScoreWinner = yearToScores[bestYear].averageScore;
  return `The best year was ${bestYear} with an average score of ${bestAverageScoreWinner}`;
}
