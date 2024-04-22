// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import cors from 'cors';
// import Realm from 'realm-web'

// const app = express();
// const port = 5500;
// app.use(cors());
// app.use(bodyParser.json())
// app.use(express.json())

// mongoose.connect('url'
// ).then(() => {
//     console.log("Connected to MongoDB Atlas");
// }).catch((err) => {
//     console.log("Error connecting to MongoDB Atlas:", err);
// })

// const userSchema = new mongoose.Schema({
//     taskName: String,
//     taskDescription: String,
//     taskStatus: String,
//     userId: String
// })

// const userModel = mongoose.model('User', userSchema)
// app.get('/usersData', async (req, res) => {
//     try {
//         const userId = req.query.userId;
//         if (!userId) {
//             return res.status(400).json({ error: 'User ID is required' });
//         }
//         userModel.find({ userId: userId })
//             .then((userData) => {
//                 if (!userData) {
//                     return res.status(404).json({ error: 'User not found' });
//                 }
//                 res.json(userData);
//             })
//             .catch((error) => {
//                 console.log("Error in app.get:", error);
//                 res.status(500).json({ error: 'Error fetching user data' });
//             });
//     } catch (error) {
//         console.log("Error:", error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
// app.post('/usersData', async (req, res) => {
//     try{
//         let user = await userModel.create(req.body);
//         res.status(201).json(user);
//     }catch(error){
//         console.log("Error", error);
//         res.status(500).send("Error in POST", error)
//     }
// })
// app.put('/usersData', async (req, res) => {
//     try {
//         const { _id } = req.query;
//         const { taskName, taskDescription, taskStatus } = req.body; 
//         const updatedTask = await userModel.updateOne(
//             { _id: _id },
//             { $set:{
//                 taskName: taskName,
//                 taskDescription: taskDescription, 
//                 taskStatus: taskStatus
//             } }
//         );
//         if (updatedTask) {
//             res.status(200).json(updatedTask);
//         } else {
//             res.status(404).json({ error: 'Task not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.delete('/usersData', async (req, res) => {
//     try {
//         const { _id } = req.query;
//         const deletedTask = await userModel.deleteOne({ _id: _id });
//         if (deletedTask) {
//             res.status(200).json({ message: 'Task deleted successfully' });
//         } else {
//             res.status(404).json({ error: 'Task not found' });
//         }
//     } catch (error) {
//         console.error('Failed to delete task:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// import { App, Credentials } from "realm-web";
// import { google } from "googleapis";
// import axios from "axios";
// const BASE_URL = `http://localhost:5500`;
// const GOOGLE_CLIENT_ID = 'client id';
// console.log(GOOGLE_CLIENT_ID);
// const GOOGLE_CLIENT_SECRET = 'secret';
// const GOOGLE_PROJECT_ID = '';

// const oauthConfig = {
//   client_id: GOOGLE_CLIENT_ID,
//   project_id: GOOGLE_PROJECT_ID,
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_secret: GOOGLE_CLIENT_SECRET,
//   redirect_uris: `http://localhost:5500/auth/google/callback`,
//   JWTsecret: "secret",
//   scopes: [
//     "https://www.googleapis.com/auth/userinfo.email",
//     "https://www.googleapis.com/auth/userinfo.profile",
//     "openid",
//   ],
// };
// // const OAuth2 = google.auth.OAuth2;
// const OAuth2 = google.auth.OAuth2;

// const oauth2Client = new OAuth2(
//   oauthConfig.client_id,
//   oauthConfig.client_secret,
//   oauthConfig.redirect_uris
// );

// const realmApp = new App({
//   id: 'realmid',
// });

// app.get("/", function (req, res) {
//   const loginLink = oauth2Client.generateAuthUrl({
//     access_type: "offline", // Indicates that we need to be able to access data continuously without the user constantly giving us consent
//     scope: oauthConfig.scopes,
//   })
//   console.log("baseURL: --->... ", BASE_URL);  
//   res.redirect(loginLink);
// });

// app.get("/auth/google/callback", function (req, res, errorHandler) {
//   if (req.query.error) {
//     return errorHandler(req.query.error);
//   } else {
//     const authCodeFromQueryString = req.query.code;
//     oauth2Client.getToken(authCodeFromQueryString, async function (
//       error,
//       token
//     ) {
//       if (error) return errorHandler(error);
//       try {
//         const credential = Credentials.google({
//           idToken: token.id_token,
//         });
//         const user = await realmApp.logIn(credential);
//         console.log("signed in as Realm user", user.id , user.profile);
//         const vueAppUrl = `http://localhost:5173/home?userId=${user.id}&email=${user.profile.email}&name=${user.profile.name}`;
//         return res.redirect(vueAppUrl, '_blank', 'width=600,height=800');

//       } catch (error) {
//         errorHandler(error);
//       }
//     });
//   }
// });


//   // clientID: '1148896139479819', // Replace with your Facebook App ID
//   // clientSecret: '53d454b82431b85d02201e70a40b9037', // Replace with your Facebook App Secret
//   // callbackURL: 'http://localhost:5500/auth/facebook/callback', // Callback URL
  









// const FACEBOOK_APP_ID = '';
// const FACEBOOK_APP_SECRET = ''



// app.get('/auth/facebook', (req, res) => {
//   const BASE_URL = `http://localhost:5500`;
//   const redirect_uri = `${BASE_URL}/auth/facebook/callback`;
//   const scope = 'email';
//   const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${redirect_uri}&scope=${scope}`;
//   res.redirect(authUrl);
// });

// // Facebook OAuth Callback
// app.get('/auth/facebook/callback', async (req, res) => {
//   const { code } = req.query;
//   console.log("code", code);
//   const BASE_URL = `http://localhost:5500`;
//   const redirect_uri = `${BASE_URL}/auth/facebook/callback`;
//   const accessTokenUrl = 'https://graph.facebook.com/v11.0/oauth/access_token';
//   const accessTokenParams = {
//     client_id: FACEBOOK_APP_ID,
//     client_secret: FACEBOOK_APP_SECRET,
//     redirect_uri,
//     code,
//   };
//   try {
//     const { data } = await axios.get(accessTokenUrl, { params: accessTokenParams });
//     const accessToken = data.access_token;
//     const profileUrl = 'https://graph.facebook.com/me';
//     const profileParams = {
//       fields: 'id,name,email',
//       access_token: accessToken,
//     };
//     const { data: profileData } = await axios.get(profileUrl, { params: profileParams });
//     const credentials = Realm.Credentials.facebook(accessToken);
//     const realmUserfb = await realmApp.logIn(credentials)
//     console.log(realmUserfb);
//     const vueAppUrl = `http://localhost:5173/home?userId=${profileData.id}&email=${profileData.email}&name=${profileData.name}`;
//     return res.redirect(vueAppUrl, '_blank', 'width=600,height=800');
//     // res.send(profileData);
//   } catch (error) {
//     // Handle error
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });







// app.post("/logout", (req, res) => {
//   res.redirect("http://localhost:5500");
// });
// // app.use(function (error, res) {
// //   // res.status(error.status || 500);
// //   res.send({ error: error.message || 'Internal Server Error' });
// // });
// app.listen(port, function () {
//   console.log(`Listening on port ${port}`);
// });