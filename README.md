# Predictly 🔮

<div align="center">
  <img src="public/assets/logo/logo.png" alt="Predictly Logo" width="120" height="120" style="border-radius: 20px;" />
  
  <h3>Decentralize Prediction Market for Friend Groups</h3>
  
  <p>Create, participate, and earn from prediction markets with friends and communities on the Move blockchain ecosystem.</p>

  <p>
    <a href="#features">Features</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#technology-stack">Tech Stack</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## 🌟 Overview

Predictly is a cutting-edge decentralized application that enables users to create and participate in prediction markets. Built on the Move blockchain, it combines the excitement of forecasting with the security and transparency of decentralized finance.

Whether you're predicting sports outcomes, crypto prices, or world events, Predictly provides a seamless platform to test your forecasting skills and earn rewards for accurate predictions.

## ✨ Features

### 🎯 **Core Features**
- **🏗️ Create Markets** - Launch prediction markets on any topic with customizable parameters
- **💰 Place Predictions** - Stake MOVE tokens on your predictions with YES/NO voting
- **👥 Join Groups** - Create or join prediction communities with friends and like-minded predictors
- **📊 Real-time Analytics** - Track your performance with detailed statistics and insights
- **🏆 Market Resolution** - Transparent market resolution system with community governance

### 🔧 **Advanced Features**
- **📈 Activity Dashboard** - Beautiful charts showing your prediction activity over time
- **💳 Wallet Integration** - Seamless integration with Nightly, Petra & Martian wallets
- **🎨 Modern UI/UX** - Clean, minimalist design optimized for the best user experience
- **📱 Responsive Design** - Perfect experience across desktop, tablet, and mobile devices
- **⚡ Real-time Updates** - Live market updates and instant notifications

### 💎 **Market Types**
- **🎲 Full Degen** - Standard prediction markets with full risk/reward
- **🛡️ Zero Loss** - Protected markets with DeFi yield farming integration
- **🔒 Private Markets** - Exclusive prediction markets for specific groups

### 🌐 **DeFi Integration**
- **🏦 Yield Farming** - Earn additional rewards through integrated DeFi protocols
- **💹 Live Yield Counter** - Real-time yield tracking for zero-loss markets
- **🔗 Protocol Support** - Integration with Canopy, Layer Bank, and MovePosition

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 18.0 or higher)
- **npm**, **yarn**, **pnpm**, or **bun**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/predictly.git
   cd predictly/web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see Predictly in action! 🎉

### 🔗 Wallet Setup

To start using Predictly, you'll need a Move-compatible wallet:

1. **Install a supported wallet**:
   - [Nightly](https://wallet.nightly.app/)
   - [Petra Wallet](https://petra.app/)
   - [Martian Wallet](https://martianwallet.xyz/)

2. **Connect your wallet** using the "Connect Wallet" button in the app

3. **Get MOVE tokens** for testing (testnet) or real usage (mainnet)

## 🛠️ Technology Stack

### **Frontend**
- **⚛️ Next.js 16** - React framework with App Router
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🎬 Framer Motion** - Smooth animations and transitions
- **📊 Recharts** - Beautiful and responsive charts
- **🎭 Lottie React** - High-quality animations

### **Blockchain**
- **🏗️ Move Language** - Smart contracts on Movement blockchain
- **💳 Aptos SDK** - Blockchain interactions and wallet integration
- **⚡ Movement Testnet** - Fast and low-cost transactions

### **State Management**
- **🔧 Custom Hooks** - React hooks for API and state management
- **📡 SWR** - Data fetching and caching
- **🍞 Sonner** - Toast notifications

### **Development Tools**
- **📝 TypeScript** - Type safety and better developer experience
- **🧹 ESLint** - Code linting and formatting
- **🔍 Prettier** - Code formatting
- **🚀 Vercel** - Deployment and hosting

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components
│   └── pages/           # Page-specific components
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── providers/           # Context providers
└── app/                 # Next.js App Router pages

public/
├── assets/              # Static assets
│   ├── logo/           # Logo files
│   ├── main/           # Main images and animations
│   └── icons/          # Icon files
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **💬 Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **📤 Push to the branch** (`git push origin feature/amazing-feature`)
5. **🔃 Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write clear commit messages
- Add tests for new features when applicable
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

Need help? Here's how to get support:

- **📖 Documentation** - Check our comprehensive docs
- **🐛 Issues** - Report bugs or request features on GitHub
- **💬 Community** - Join our Discord community

---

<div align="center">
  <p>Made with ❤️ by the Predictly Team</p>
</div>
