# Booknest

Booknest is a web application designed to help users list and book hotel rooms. This project uses MongoDB, Express, and Node.js, among other technologies, to provide a seamless and efficient platform for both users and hosts.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Vansh-tech1/WanderLust.git
    cd WanderLust
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up the database**:
    - Ensure you have MongoDB installed and running.
    - Create a `.env` file and add your MongoDB connection string:
      ```env
      MONGODB_URI=your_mongodb_connection_string
      ```

4. **Start the server**:
    ```sh
    npm start
    ```

## Usage

- Navigate to `http://localhost:3000` in your browser to start using the Booknest application.
- Users can browse and book hotel rooms.
- Hosts can list their rooms for others to book.

## Features

- **User Authentication**: Secure login and signup functionality.
- **Room Listings**: Users can browse, search, and filter hotel rooms.
- **Booking System**: Seamless booking process for users.
- **Hosting**: Users can list their own rooms and manage bookings.

## Technologies Used

- **MongoDB**: Database for storing user and booking information.
- **Express.js**: Web framework for Node.js.
- **Node.js**: JavaScript runtime for building the server-side application.
- **EJS**: Templating engine for rendering dynamic HTML pages.
- **Bootstrap**: CSS framework for responsive design.
- **Passport.js**: Authentication middleware for Node.js.
- **Connect-Flash**: Flash message middleware for Express.

## Contributing

We welcome contributions from the community! To contribute to Booknest, please follow these steps:

1. Fork the repository.
2. Create a new branch with your feature or bug fix:
    ```sh
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```sh
    git commit -m "Add feature"
    ```
4. Push to the branch:
    ```sh
    git push origin feature-name
    ```
5. Open a pull request and describe your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
