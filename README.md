<h1>Chatter - Realtime Chat Application</h1>

Chatter is a MERN (MongoDB, Express, React, Node.js) stack-based web application that allows users to engage in real-time chat conversations. The application uses styled-components for styling and JWT (JSON Web Tokens) for secure authentication.

<h3>Getting Started</h3>
To run this application on your local machine, follow these steps:

1. Clone the repository to your local machine:

                git clone https://github.com/ekanshuj/chatter.git
                
2. Navigate to the project directory:

                cd chatter
                
3. Install the dependencies:

                npm install
                
4. Create a .env file in the root directory and add the following environment variables:

                MONGO_URI=<your_mongodb_uri>
                JWT_SECRET=<your_jwt_secret>
                
5. Start the application:

                npm start
                
6. Open a web browser and navigate to http://localhost:3000 to see the application in action.

<h3>Features</h3>

● Real-time chat conversations between users<br>
● Secure authentication using JWT<br>
● Styling using styled-components<br>

<h3>Technology Stack</h3>

● MongoDB<br>
● Express.js<br>
● React.js<br>
● Node.js<br>
● Socket.IO<br>
● JWT (JSON Web Tokens)<br>
● styled-components<br>

<h3>Directory Structure</h3>


                chatter/
                ├── client/
                │ ├── public/
                │ └── src/
                │ ├── components/
                │ ├── contexts/
                │ ├── pages/
                │ ├── services/
                │ ├── styles/
                │ ├── App.js
                │ └── index.js
                ├── server/
                │ ├── config/
                │ ├── controllers/
                │ ├── models/
                │ ├── routes/
                │ ├── utils/
                │ ├── index.js
                │ └── socket.js
                ├── README.md
                └── package.json
                
<h3>License</h3>

This project is licensed under the MIT License - see the LICENSE file for details.

<h3>Contact</h3>

If you have any questions or comments about this project, please feel free to contact the developer.
