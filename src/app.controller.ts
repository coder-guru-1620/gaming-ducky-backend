import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    getHello(): string {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gaming Ducky Backend | Status</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #FFD700;
            --primary-dark: #ccac00;
            --bg: #0a0a0c;
            --card-bg: rgba(255, 255, 255, 0.03);
            --border: rgba(255, 255, 255, 0.1);
            --text: #ffffff;
            --text-dim: rgba(255, 255, 255, 0.6);
            --success: #00ff88;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Outfit', sans-serif;
        }

        body {
            background-color: var(--bg);
            color: var(--text);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow: hidden;
            background-image: 
                radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.05) 0%, transparent 40%);
        }

        .container {
            text-align: center;
            padding: 3rem;
            background: var(--card-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border);
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            max-width: 500px;
            width: 90%;
            animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .logo {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            display: block;
        }

        h1 {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #fff 0%, #aaa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        p {
            color: var(--text-dim);
            font-size: 1.1rem;
            margin-bottom: 2rem;
        }

        .status-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem 1.25rem;
            background: rgba(0, 255, 136, 0.1);
            border: 1px solid rgba(0, 255, 136, 0.2);
            border-radius: 100px;
            color: var(--success);
            font-weight: 600;
            font-size: 0.9rem;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .status-dot {
            width: 8px;
            height: 8px;
            background-color: var(--success);
            border-radius: 50%;
            margin-right: 10px;
            box-shadow: 0 0 12px var(--success);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
        }

        .links {
            margin-top: 2.5rem;
            display: flex;
            gap: 1rem;
            justify-content: center;
        }

        .link-btn {
            text-decoration: none;
            color: var(--text);
            font-size: 0.9rem;
            padding: 0.6rem 1.2rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border);
            border-radius: 12px;
            transition: all 0.3s ease;
        }

        .link-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: var(--primary);
            transform: translateY(-2px);
        }

        .footer {
            position: absolute;
            bottom: 2rem;
            color: var(--text-dim);
            font-size: 0.8rem;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <div class="container">
        <span class="logo">🦆</span>
        <h1>Gaming Ducky</h1>
        <p>Advanced Backend Infrastructure</p>
        
        <div class="status-badge">
            <span class="status-dot"></span>
            Server is Online
        </div>

        <div class="links">
            <a href="/api" class="link-btn">API Documentation</a>
        </div>
    </div>

    <div class="footer">
        &copy; 2026 Gaming Ducky Ecosystem
    </div>
</body>
</html>
    `;
    }
}
