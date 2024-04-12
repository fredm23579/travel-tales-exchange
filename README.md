# Travel-Blog Website

## Description

The travel-tales-exchange blog is a dynamic web application allowing users to share and comment on blog posts. It provides a platform for users to express their thoughts, opinions, and share information in a blog format. Built with a focus on user interaction and ease of use, the blog offers a clean and responsive interface for a seamless blogging experience.

## Live Demo

Check out the live demo of the application here: [Travel Blog Live](https://travel-tales-exchange-50aa2535b133.herokuapp.com/login)

![Screenshot](public/img/clear-water-beaches-florida-2048x917.png)

## Features

- **User Authentication**: Users can sign up for an account and log in to access personalized features.
- **Blog Posting**: Logged-in users can create, edit, and delete their own blog posts.
- **Comments**: Users can add comments to blog posts, fostering community interaction.
- **Responsive Design**: A clean and responsive user interface, adapting to various screen sizes and devices.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A web application framework for Node.js.
- **Sequelize**: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- **Handlebars.js**: A minimal templating engine.
- **MySQL
- **dotenv
- **connect-session-sequelize

## Installation

To run this application locally, you'll need Node.js and a MySQL database set up on your machine.

1. Clone the repository: git clone

2. Install the dependencies: npm i

3. Create a `.env` file in the root directory with the following contents:

DB_NAME='your_database_name'
DB_USER='your_username'
DB_PASSWORD='your_password'

4. Run the schema.sql in your MySQL database to create the necessary database.

5. Start the server: node server.js

6. Visit `http://localhost:3000` in your browser.

## Contributing

Contributions to the Ensemble Blog project are welcome!

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.


## License

This project is open source and available under the [MIT License](LICENSE).

---

© 2024 Travel Blog by [Fred Motta](https://github.com/fredm23579)
