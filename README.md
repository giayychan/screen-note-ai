# Screen Note AI

![Logo](./public/favicon.ico)

## 📋 Table of Contents

- [Screen Note AI](#screen-note-ai)
  - [📋 Table of Contents](#-table-of-contents)
  - [🚀 Overview](#-overview)
  - [🌟 Key Features](#-key-features)
  - [🛠️ Technologies Used](#️-technologies-used)
  - [🎯 Use Cases](#-use-cases)
  - [⚙️ Setup Instructions](#️-setup-instructions)
  - [🌐 Demo](#-demo)
  - [💰 Donation](#-donation)
  - [📝 Feature Request](#-feature-request)

---

## 🚀 Overview

The Dynamic Learning App is here to change how you learn from online articles. With advanced Optical Character Recognition (OCR) and AI, the app makes it easy to capture text from websites and interact with it in real-time.

You can click on any word in the text to see a definition tailored to its context, helping you learn more effectively. Plus, the vocabulary builder lets you save words you want to remember, and you can easily add or remove them as you go.

To top it off, the app can create personalized articles using the words you’ve saved, turning your learning into something practical and creative. Whether you’re a student, a professional, or just love exploring new content, this app turns reading into an interactive learning experience that boosts your language skills and sparks your creativity.

---

## 🌟 Key Features

1. **Text Extraction with OCR**: Effortlessly capture text from online articles by simply pasting the URL. The app automatically takes a screenshot and extracts the text using cutting-edge Optical Character Recognition (OCR) technology.
2. **Contextual AI-Powered Word Definitions**: Click on any word within the extracted text, and get an instant, AI-generated definition that’s tailored to the context of the article, providing deeper understanding and nuanced meanings.
3. **Personalized Vocabulary Builder**: Easily save new words to your personal word list for future reference. Track and manage your vocabulary to facilitate long-term retention and mastery.
4. **AI-Generated Content Creation**: Utilize your saved word list to generate high-quality AI-written articles. Let the app create meaningful content that integrates the vocabulary you’ve learned for practice and application.

---

## 🛠️ Technologies Used

- **AI Technologies**: Hugging Face, MistralAI
- **OCR Processing**: Tesseract.js
- **Web Frameworks**: Next.js (Frontend), FastAPI (Backend)
- **Authentication**: Supabase for authentication
- **Database**: PostgreSQL relational database for storing user data
- **Hosting**: Vercel for deployment and hosting
- **Data Compression**: LZ-string for compressing OCR data in localStorage for faster retrieval
- **Web Scraping**: Puppeteer for taking screenshots of articles
- **State Management**: Zustand for managing application state

---

## 🎯 Use Cases

- **Educational Tool**: Enhance learning with contextual vocabulary and AI article creation.
- **Language Learners**: Simplify vocabulary building by seamlessly saving and analyzing new words.
- **Content Creators**: Generate drafts for blog posts or essays with minimal effort.

---

## ⚙️ Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Giayychan/screen-note-ai your-repo-name
   cd your-repo-name
   ```

2. Install dependencies:

   - **Backend**:

     ```bash
     python3.12 -m venv .venv && source venv/bin/activate && pip3 install -r requirements.txt
     ```

   - **Frontend**:

     ```bash
     pnpm install
     ```

3. Set up environment variables (create `.env` file and configure as needed).

4. Run the backend:

   ```bash
   pnpm run fastapi-dev
   ```

5. Run the frontend:

   ```bash
   pnpm run next-dev
   ```

6. Run the database locally:

   ```bash
   pnpm run supabase:start
   ```

7. Access the app at `http://localhost:3000`.

---

## 🌐 Demo

Live Demo: [https://screen-note-ai.vercel.app/](https://screen-note-ai.vercel.app/)

![demo gif](https://giaisadev.vercel.app/images/screen_note_ai_demo.gif)

---

## 💰 Donation

If you find Screen Note AI helpful and would like to support the development of this project, feel free to donate:

- **Buy Me A Coffee**: [Buy Me A Coffee](https://buymeacoffee.com/giawdevtesq)

Your support will help keep this project alive and improve its features!

---

## 📝 Feature Request

We’re always looking to improve the app! If you have any ideas or suggestions for new features, feel free to open an issue on GitHub or drop me a message:

- **Submit Feature Request**: [Feature Request Link](https://github.com/Giayychan/screen-note-ai/issues)

We value your feedback and are always happy to explore ways to make the app more useful!

---
