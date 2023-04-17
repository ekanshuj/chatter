#Chatter - Realtime Chat Application
Chatter is a MERN (MongoDB, Express, React, Node.js) stack-based web application that allows users to engage in real-time chat conversations. The application uses styled-components for styling and JWT (JSON Web Tokens) for secure authentication.

Getting Started
To run this application on your local machine, follow these steps:

Clone the repository to your local machine:
bash
Copy code
git clone https://github.com/ekanshuj/chatter.git
Navigate to the project directory:
bash
Copy code
cd chatter
Install the dependencies:
Copy code
npm install
Create a .env file in the root directory and add the following environment variables:
makefile
Copy code
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
Start the application:
sql
Copy code
npm start
Open a web browser and navigate to http://localhost:3000 to see the application in action.
Features
Chatter has the following features:

Real-time chat conversations between users
Secure authentication using JWT
Styling using styled-components
User can join or leave a chat room
User can see the list of users who are currently in the same chat room
Technology Stack
MongoDB
Express.js
React.js
Node.js
Socket.IO
JWT (JSON Web Tokens)
styled-components
Directory Structure
The directory structure of the project is as follows:

arduino
Copy code
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
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
If you have any questions or comments about this project, please feel free to contact the developer.
