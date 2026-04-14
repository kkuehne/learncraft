import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-minecraft-grass to-minecraft-dirt">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-pixel text-6xl md:text-8xl text-white mb-4 drop-shadow-lg">
            LearnCraft
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Lernen wird zum Abenteuer 🎮
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <FeatureCard
            emoji="🏛️"
            title="Lernhäuser"
            description="Trete einem Haus bei und kämpfe mit deinen Mitschülern um den Sieg!"
            color="bg-house-aqua"
          />
          <FeatureCard
            emoji="🎯"
            title="Quests"
            description="Meistere spannende Aufgaben und sammle XP für deinen Fortschritt"
            color="bg-minecraft-gold"
          />
          <FeatureCard
            emoji="🤖"
            title="KI-Tutor"
            description="Professor Eich begleitet dich mit hilfreichen Erklärungen"
            color="bg-house-terra"
          />
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/biome"
            className="inline-block bg-minecraft-gold hover:bg-yellow-400 text-black font-bold 
                       text-xl px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 
                       transition-all border-4 border-yellow-600"
          >
            🚀 Abenteuer starten
          </Link>
          <p className="mt-4 text-white/70 text-sm">
            Aktives Biom: Biologie - Fische 🐟
          </p>
        </div>

        {/* House Tournament Preview */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
          <h2 className="font-pixel text-3xl text-white text-center mb-6">Wochen-Turnier 🏆</h2>
          <div className="grid grid-cols-4 gap-4">
            <HouseScore name="Ignis" color="bg-house-ignis" score={1250} />
            <HouseScore name="Aqua" color="bg-house-aqua" score={1380} />
            <HouseScore name="Terra" color="bg-house-terra" score={1100} />
            <HouseScore name="Aer" color="bg-house-aer" score={1320} />
          </div>
          <p className="text-center text-white/70 mt-4">Noch 3 Tage bis zum nächsten Turnier!</p>
        </div>
      </div>
    </main>
  )
}

function FeatureCard({
  emoji,
  title,
  description,
  color,
}: {
  emoji: string
  title: string
  description: string
  color: string
}) {
  return (
    <div className={`${color} rounded-xl p-6 shadow-lg transform hover:scale-105 transition-all`}>
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="font-pixel text-2xl text-white mb-2">{title}</h3>
      <p className="text-white/90">{description}</p>
    </div>
  )
}

function HouseScore({
  name,
  color,
  score,
}: {
  name: string
  color: string
  score: number
}) {
  return (
    <div className={`${color} rounded-lg p-4 text-center`}>
      <p className="font-pixel text-xl text-white mb-1">{name}</p>
      <p className="text-white/90 text-sm">{score.toLocaleString()} XP</p>
    </div>
  )
}
