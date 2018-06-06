Kodify's React Technical Test
=============================

## Real-time chat application

**Required features**

- [X] It should allow 2+ users to chat with each other using a web browser
- [X] `/nick <name>` - If users set their name, it should appear at the top on the other person's screen
- [X] `/think <message>` - It should make the text appear in dark grey (instead of black)
- [X] `/oops` - It should remove the latest message sent by the user who has given the command

**Optional features**

- [X] When the user is typing, indication that they are typing should be shown to the other user
- [X] (smile) should produce a smiley face, (wink) should produce a winking face
- [ ] When a new message arrives, it should slide in, and the messages above slide up
- [ ] `/fadelast` - would fade out the last message to 10% visibility
- [ ] `/highlight <message>` - would make the font of the message 10% bigger, and make the background 10% darker
- [X] `/countdown <number> <url>` - would start a visible countdown on the other persons browser, and at the end of the countdown redirect them to the URL specified

## Setup

After cloning this repo, don't forget to install the dependencies:

```
$ npm install
```

**Start web server**

This app has been bootstrapped with create-react-app. By default, it starts the server on port 3000 but if it's already
taken, it will look for the next available port. To start the server, type the following in your teminal:

```bash
$ npm start
```

**Start socket server**

To start a socket server type the following in your terminal:

```bash
$ npm run start-server
```

By default, the server will runs on the port 3001 but you can change it:

```bash
$ PORT=3002 npm run start-server
```

If you run the server on another machine, you can change the url of it by editing the environment variable in the `.env` file in the root of the repository.

You can host it on a remote server, use ngrok or another machine in your local network. Or it's also useful if you have changed the port on which the server runs.

```bash
REACT_APP_SOCKET_URL='http://192.168.1.2:3001'
```

**Run tests**

```bash
$ npm test
```
