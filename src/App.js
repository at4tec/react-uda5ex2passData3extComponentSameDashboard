import React, { Component } from "react";

const profiles = [
  {
    id: 1,
    userID: "1",
    favoriteMovieID: "1"
  },
  {
    id: 2,
    userID: "2",
    favoriteMovieID: "1"
  },
  {
    id: 3,
    userID: "4",
    favoriteMovieID: "5"
  },
  {
    id: 4,
    userID: "5",
    favoriteMovieID: "2"
  },
  {
    id: 5,
    userID: "3",
    favoriteMovieID: "5"
  },
  {
    id: 6,
    userID: "6",
    favoriteMovieID: "4"
  }
];

const users = {
  1: {
    id: 1,
    name: "Jane Jones",
    userName: "coder"
  },
  2: {
    id: 2,
    name: "Matthew Page",
    userName: "mpage"
  },
  3: {
    id: 3,
    name: "Autumn Green",
    userName: "user123"
  },
  4: {
    id: 3,
    name: "John Doe",
    userName: "user123"
  },
  5: {
    id: 5,
    name: "Lauren Johnson",
    userName: "user123"
  },
  6: {
    id: 6,
    name: "Nicholas Lain",
    userName: "user123"
  }
};

const movies = {
  1: {
    id: 1,
    name: "Planet Earth 1"
  },
  2: {
    id: 2,
    name: "Selma"
  },
  3: {
    id: 3,
    name: "Million Dollar Baby"
  },
  4: {
    id: 4,
    name: "Forrest Gump"
  },
  5: {
    id: 5,
    name: "Get Out"
  }
};

class App extends Component {
  /*
  The constructor is a "special method for creating and initializing an object."
  (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). The
  Component's constructor is the first thing that runs when the object is created.
  */

    
  

  /*
  The render method gets called automatically every time the value of the
  component's props changes.
  */
  render() {
    this.usersByMovie = [];

    /*
    We can map the users by the movie they liked.
    */
    profiles.forEach(profile => {
      const movieID = profile.favoriteMovieID;

      if (this.usersByMovie[movieID]) {
        this.usersByMovie[movieID].push(profile.userID);
      } else {
        this.usersByMovie[movieID] = [profile.userID];
      }
    });

    return (
      <div>
          <h2>How Popular is Your Favorite Movie?3</h2>
        <Dashboard
          usersByMovie={this.usersByMovie}
          movies={movies}
          users={users}
        />
      </div>
    );
  }
}


class Dashboard extends Component {
  render() {
    
    const movieCards = Object.keys(movies).map(id => (
      <MovieCard
        key={id}
        users={this.props.users}
        usersWhoLikedMovie={this.props.usersByMovie[id]}
        movieInfo={this.props.movies[id]}
      />
    ));

    /*
    Return JSX
    */
    return <ul>{movieCards}</ul>;
  }
}


class MovieCard extends Component {
  render() {
    /*
    Destructuring via ES6. We're getting the profiles, users, and movies properties
    off of the pros passed into this presentational component. If you need a
    refresher on this syntax, check out this course:
    https://www.udacity.com/course/es6-javascript-improved--ud356
    */
    const { users, usersWhoLikedMovie, movieInfo } = this.props;

    return (
      <li key={movieInfo.id}>
        <h2>{movieInfo.name}</h2>
        <h3>Liked By:</h3>
        <UserList usersWhoLikedMovie={usersWhoLikedMovie} users={users} />
      </li>
    );
  }
}


class UserList extends Component {
  render() {
    /*
    Destructuring via ES6. We're getting the profiles, users, and movies properties
    off of the pros passed into this presentational component. If you need a refresher on this syntax, check
    out this course: https://www.udacity.com/course/es6-javascript-improved--ud356
    */
    const { users, usersWhoLikedMovie } = this.props;

    if (!usersWhoLikedMovie || usersWhoLikedMovie.length === 0) {
      return <p>None of the current users liked this movie.</p>;
    }

    const listofItems = usersWhoLikedMovie.map(id => (
      <li key={id}>
        <p>{users[id].name}</p>
      </li>
    ));

    return <ul>{listofItems}</ul>;
  }
}

export default App;
