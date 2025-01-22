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

The Dynamic Learning App is an innovative tool designed to transform how users engage with and learn from digital content. By integrating advanced AI technologies and Optical Character Recognition (OCR), the app enables users to extract text from websites effortlessly and interact with it dynamically.

With features like contextual word definitions and a personalized vocabulary builder, it empowers users to enhance their language skills and comprehension. The app also incorporates AI-powered content creation, allowing users to generate custom articles using their saved word lists. Perfect for students, professionals, and content creators, this app bridges the gap between learning, productivity, and creativity.

---

## 🌟 Key Features

1. **Text Extraction with OCR**: Easily capture text from websites using state-of-the-art Optical Character Recognition.
2. **Contextual Definitions**: Click any word for an AI-tailored definition contextual to the text.
3. **Vocabulary Builder**: Save words into a personal list for tracking or learning.
4. **AI-Powered Content Creation**: Use your word list to generate relevant, high-quality AI-powered articles.

---

## 🛠️ Technologies Used

- **AI Technologies**: Hugging Face, MistralAI
- **OCR Processing**: Python OCR
- **Web Frameworks**: Next.js (Frontend), FastAPI (Backend)
- **Hardware Acceleration**: NVIDIA GPUs

---

## 🎯 Use Cases

- **Educational Tool**: Enhance learning with contextual vocabulary and AI article creation.
- **Content Creators**: Generate drafts for blog posts or essays with minimal effort.
- **Language Learners**: Simplify vocabulary building by seamlessly saving and analyzing new words.

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
     python3 -m venv venv && source venv/bin/activate && pip3 install -r requirements.txt
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

6. Access the app at `http://localhost:3000`.

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

We’re always looking to improve the app! If you have any ideas or suggestions for new features, feel free to open an issue on GitHub or submit a request:

- **Submit Feature Request**: [Feature Request Link](https://github.com/Giayychan/screen-note-ai/issues)

We value your feedback and are always happy to explore ways to make the app more useful!

---
