# Notes App Frontend

A modern, responsive notes application built with Next.js 15, React 19, and TypeScript. This frontend provides a clean and intuitive interface for creating, managing, and organizing your notes.

## 🚀 Features

- **Create & Edit Notes**: Intuitive note creation and editing interface
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Dynamic note management with instant feedback
- **Modern UI**: Clean, minimalist design for distraction-free note-taking
- **TypeScript Support**: Full type safety for better development experience

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Frontend**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Styling**: CSS Modules
- **Linting**: ESLint with Next.js configuration

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun package manager
- Backend server running (see main project README)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 3. Open Application

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable React components
│   │   ├── NoteForm.tsx    # Note creation/editing form
│   │   └── NoteList.tsx    # Notes display component
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page
└── ...
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Key Components

### NoteForm
Handles note creation and editing with form validation and user-friendly interface.

### NoteList
Displays notes in an organized, searchable format with options to edit or delete.

### Authentication Pages
- `/login` - User login interface
- `/register` - New user registration

## 🔗 API Integration

This frontend communicates with the backend API using Axios for:
- User authentication (login/register)
- CRUD operations for notes
- Real-time data synchronization

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy on Vercel

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to a Git repository
2. Import your project to Vercel
3. Configure environment variables if needed
4. Deploy!

### Other Deployment Options

- **Netlify**: Connect your Git repository for automatic deployments
- **AWS Amplify**: Deploy with AWS's hosting service
- **Docker**: Use the included Dockerfile for containerized deployment

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev/) - Learn React concepts and patterns
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Master TypeScript
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial

## 🐛 Troubleshooting

### Common Issues

**Port already in use**: If port 3000 is busy, Next.js will automatically use the next available port.

**API connection issues**: Ensure the backend server is running and the API URL is correctly configured.

**Build errors**: Check that all dependencies are installed and TypeScript types are correct.

## 📄 License

This project is licensed under the MIT License - see the main project LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) by Vercel
- Icons and UI inspiration from modern design systems
- Community contributions and feedback

---

**Note**: This is the frontend portion of a full-stack notes application. See the main project README for complete setup instructions including backend configuration.#   N o t e p a d - A p p  
 