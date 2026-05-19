export type JrkPlayer = {
  name: string;
  number: number;
  position: string;
  grade: "6th" | "7th" | "8th";
};

export default function PlayerCard({ player }: { player: JrkPlayer }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-300 last:border-0">
      <span className="font-display text-royal-600 text-2xl tracking-widest w-12 shrink-0">
        #{player.number}
      </span>
      <span className="font-display text-black-500 text-lg tracking-wider flex-1">
        {player.name.toUpperCase()}
      </span>
      <span className="text-xs tracking-widest uppercase text-royal-600 bg-royal-600/10 px-3 py-1 rounded-lg shrink-0">
        {player.position}
      </span>
    </div>
  );
}
