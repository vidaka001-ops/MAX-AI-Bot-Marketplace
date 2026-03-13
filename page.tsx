// MAX AI BOT MARKETPLACE — MARKETPLACE + BOT PAGE + DEVELOPER DASHBOARD
// -------------------------------------------------------------
// Features:
// • App-store style bot marketplace
// • Featured / Trending / New / Top sections
// • Search
// • Individual bot page
// • Developer dashboard
// • Publish bot form
// -------------------------------------------------------------

import React, { useState, useEffect } from "react";

// -------------------------------------------------------------
// TYPES
// -------------------------------------------------------------

type Bot = {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  installs: number;
  price: number;
};

type Lang = "en" | "ru";

// -------------------------------------------------------------
// TEXT
// -------------------------------------------------------------

const text = {
  en: {
    title: "MAX AI Bot Marketplace",
    subtitle:
      "Install powerful AI bots in seconds and automate your work.",
    install: "Install",
    installs: "installs",
    price: "Price",
    search: "Search bots",
    featured: "⭐ Featured Bots",
    trending: "🔥 Trending Bots",
    new: "🆕 New Bots",
    top: "⭐ Top Installed",
    dashboard: "Developer Dashboard",
    publish: "Publish Bot",
    mybots: "My Bots",
    back: "Back to marketplace",
  },

  ru: {
    title: "Маркетплейс AI-ботов MAX",
    subtitle:
      "Устанавливайте мощных AI-ботов за секунды и автоматизируйте работу.",
    install: "Установить",
    installs: "установок",
    price: "Цена",
    search: "Поиск ботов",
    featured: "⭐ Рекомендуемые боты",
    trending: "🔥 Популярные боты",
    new: "🆕 Новые боты",
    top: "⭐ Топ по установкам",
    dashboard: "Панель разработчика",
    publish: "Опубликовать бота",
    mybots: "Мои боты",
    back: "Назад",
  },
};

// -------------------------------------------------------------
// BOT GENERATION
// -------------------------------------------------------------

const templates = [
  { name: "Customer Support Assistant", category: "Support" },
  { name: "Lead Generation Bot", category: "Sales" },
  { name: "Restaurant Booking Manager", category: "Booking" },
  { name: "AI Marketing Copywriter", category: "Marketing" },
  { name: "Shop Order Tracker", category: "Ecommerce" },
  { name: "Analytics Insight Bot", category: "Analytics" },
];

const descriptions = [
  "Automates customer conversations",
  "Captures and qualifies leads",
  "Handles booking automatically",
  "Generates marketing text",
  "Tracks orders",
  "Analyzes business metrics",
];

function r<T>(a: T[]): T {
  return a[Math.floor(Math.random() * a.length)];
}

function generateBots(n: number): Bot[] {
  return Array.from({ length: n }, (_, i) => {
    const t = r(templates);

    return {
      id: i,
      name: t.name,
      category: t.category,
      description: r(descriptions),
      rating: Number((4 + Math.random()).toFixed(1)),
      installs: Math.floor(Math.random() * 20000),
      price: Math.floor(Math.random() * 40) + 10,
    };
  });
}

// -------------------------------------------------------------
// HERO
// -------------------------------------------------------------

function Hero({ lang }: { lang: Lang }) {
  const t = text[lang];

  return (
    <div
      style={{
        padding: 60,
        borderRadius: 20,
        background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
        color: "white",
        textAlign: "center",
        marginBottom: 40,
      }}
    >
      <h1 style={{ fontSize: 44 }}>{t.title}</h1>

      <p style={{ fontSize: 18 }}>{t.subtitle}</p>

      <div
        style={{
          marginTop: 20,
          background: "rgba(255,255,255,0.15)",
          padding: 20,
          borderRadius: 12,
          maxWidth: 700,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <b>
          {lang === "ru"
            ? "Разработчики могут публиковать и продавать своих AI-ботов"
            : "Developers can publish and sell their AI bots"}
        </b>

        <div style={{ marginTop: 10 }}>
          🔥 120+ bots · 👨‍💻 35 developers · 💰 $12k earned
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// BOT CARD
// -------------------------------------------------------------

function BotCard({ bot, lang, open }: { bot: Bot; lang: Lang; open: any }) {
  const t = text[lang];

  return (
    <div
      onClick={() => open(bot)}
      style={{
        background: "white",
        borderRadius: 16,
        padding: 18,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        cursor: "pointer",
      }}
    >
      <b>{bot.name}</b>

      <p style={{ fontSize: 14 }}>{bot.description}</p>

      <div>
        ⭐ {bot.rating} · 🔥 {bot.installs} {t.installs}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <b>
          {t.price}: ${bot.price}
        </b>

        <button
          style={{
            background: "#6366F1",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "6px 12px",
          }}
        >
          {t.install}
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// BOT PAGE
// -------------------------------------------------------------

function BotPage({ bot, lang, back }: any) {
  const t = text[lang];

  return (
    <div style={{ padding: 30 }}>
      <button onClick={back}>{t.back}</button>

      <h1>{bot.name}</h1>

      <p>{bot.description}</p>

      <div style={{ marginTop: 10 }}>
        ⭐ {bot.rating} · 🔥 {bot.installs} {t.installs}
      </div>

      <div style={{ marginTop: 10 }}>
        {t.price}: ${bot.price}
      </div>

      <div
        style={{
          marginTop: 20,
          height: 120,
          background: "#F3F4F6",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        bot preview / demo
      </div>

      <button
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "#6366F1",
          color: "white",
          border: "none",
          borderRadius: 10,
        }}
      >
        {t.install}
      </button>

      <h3 style={{ marginTop: 40 }}>Reviews</h3>

      <p>⭐ 5 — "Great automation bot"</p>
      <p>⭐ 4 — "Very useful for business"</p>
    </div>
  );
}

// -------------------------------------------------------------
// GRID
// -------------------------------------------------------------

function Grid({ bots, lang, open }: any) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
        gap: 20,
        marginBottom: 40,
      }}
    >
      {bots.map((b: Bot) => (
        <BotCard key={b.id} bot={b} lang={lang} open={open} />
      ))}
    </div>
  );
}

// -------------------------------------------------------------
// DEVELOPER DASHBOARD
// -------------------------------------------------------------

function DeveloperDashboard({ bots, lang }: any) {
  const t = text[lang];

  return (
    <div
      style={{
        marginTop: 60,
        padding: 30,
        background: "#F9FAFB",
        borderRadius: 16,
      }}
    >
      <h2>{t.dashboard}</h2>

      <h3>{t.mybots}</h3>

      <ul>
        {bots.slice(0, 5).map((b: Bot) => (
          <li key={b.id}>
            {b.name} — 🔥 {b.installs} installs — 💰 ${b.price}
          </li>
        ))}
      </ul>

      <PublishBotForm lang={lang} />
    </div>
  );
}

// -------------------------------------------------------------
// PUBLISH FORM
// -------------------------------------------------------------

function PublishBotForm({ lang }: { lang: Lang }) {
  const t = text[lang];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const submit = () => {
    alert("Bot submitted (demo)");

    setName("");
    setDescription("");
    setPrice("");
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>{t.publish}</h3>

      <input
        placeholder="Bot name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br />

      <button onClick={submit}>{t.publish}</button>
    </div>
  );
}

// -------------------------------------------------------------
// MAIN
// -------------------------------------------------------------

export default function Marketplace() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [lang, setLang] = useState<Lang>("ru");
  const [search, setSearch] = useState("");
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

  const t = text[lang];

  useEffect(() => {
    setBots(generateBots(120));
  }, []);

  if (selectedBot) {
    return (
      <BotPage
        bot={selectedBot}
        lang={lang}
        back={() => setSelectedBot(null)}
      />
    );
  }

  const filtered = bots.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()),
  );

  const featured = bots.slice(0, 6);
  const trending = [...bots].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const newest = bots.slice(-6);
  const top = [...bots].sort((a, b) => b.installs - a.installs).slice(0, 6);

  return (
    <div style={{ padding: 30, fontFamily: "Inter" }}>
      <Hero lang={lang} />

      <div style={{ marginBottom: 20 }}>
        {t.search}:

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginLeft: 10 }}
        />

        <button onClick={() => setLang("en")} style={{ marginLeft: 20 }}>
          EN
        </button>

        <button onClick={() => setLang("ru")} style={{ marginLeft: 6 }}>
          RU
        </button>
      </div>

      <h2>{t.featured}</h2>
      <Grid bots={featured} lang={lang} open={setSelectedBot} />

      <h2>{t.trending}</h2>
      <Grid bots={trending} lang={lang} open={setSelectedBot} />

      <h2>{t.new}</h2>
      <Grid bots={newest} lang={lang} open={setSelectedBot} />

      <h2>{t.top}</h2>
      <Grid bots={top} lang={lang} open={setSelectedBot} />

      <h2>All bots</h2>
      <Grid bots={filtered.slice(0, 40)} lang={lang} open={setSelectedBot} />

      <DeveloperDashboard bots={bots} lang={lang} />
    </div>
  );
}
