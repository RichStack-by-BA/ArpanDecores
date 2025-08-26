type Stat = { value: string; label: string }

export default function StatsStrip({ stats }: { stats: Stat[] }) {
  if (!stats?.length) return null
  return (
    <section className="section-padding bg-secondary/5">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-4xl font-playfair font-bold text-primary mb-2">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
