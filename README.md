# 🌍 WanderLust

> **Explore, Share & Discover Hidden Travel Gems**

A full-stack web application where travelers can share travel experiences, discover new places, and connect with fellow adventurers.

## 🚀 Live Demo
[**Visit WanderLust Here**](https://wanderlust-project-y7sd.onrender.com/listings)

---

## ✨ Features

- 🔐 **Secure User Authentication** - Login/Signup with Passport.js
- 📍 **Location-Based Search** - Find listings near you using Nominatim Geocoding
- 🗺️ **Interactive Maps** - Leaflet.js integration for visual exploration
- ⭐ **Reviews & Ratings** - Community feedback system
- 💬 **Comments** - Engage with other travelers
- 📸 **Image Upload** - Share travel photos with Cloudinary
- 🔒 **Authorization** - Only owners can edit/delete their listings

---

## 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-FF69B4?style=for-the-badge&logo=ejs&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet.js-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

**Backend:** Node.js, Express, MongoDB, Mongoose  
**Frontend:** EJS, CSS3, Vanilla JavaScript  
**Maps:** Leaflet.js + Nominatim API  
**Authentication:** Passport.js with Local Strategy  
**Image Storage:** Cloudinary CDN  

---

## 📋 Quick Setup

### Requirements
- Node.js v14+
- MongoDB (Local or Atlas)
- Cloudinary Account

### Installation

```bash
# Clone repository
git clone https://github.com/devNamit/WanderLust.git
cd WanderLust

# Install dependencies
npm install

# Create .env file
touch .env
```

Add to `.env`:
```
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
SESSION_SECRET=your_secret_key
```

```bash
# Start server
npm start
```

Open `http://localhost:3000`

---

## 🎮 How It Works

1. **Sign up** → Create traveler account
2. **Explore** → Browse listings on interactive map
3. **Add Listing** → Share your favorite spot with photos
4. **Leave Review** → Rate & comment on places
5. **Discover** → Find new places using location search

---

## 🏆 What I Learned

✅ Full-stack MERN development  
✅ Passport.js authentication & sessions  
✅ MongoDB relationships & Mongoose population  
✅ Third-party API integration (Nominatim, Cloudinary)  
✅ RESTful API design  
✅ Production deployment on Render  
✅ Debugging complex data flow issues  

---

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced filters (price range, ratings, distance)
- [ ] Email verification
- [ ] Image optimization & lazy loading
- [ ] Dark mode
- [ ] Mobile responsive improvements

---

## 📞 Connect With Me

- 🌐 [Portfolio](your-portfolio-link)
- 💼 [LinkedIn](your-linkedin-url)
- 📧 [Email](your-email)

**Made with ❤️ by Namit Srivastava**
