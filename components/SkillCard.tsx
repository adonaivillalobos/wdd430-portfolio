interface SkillCardProps {
  name: string;
  level: 'Learning' | 'Comfortable' | 'Confident';
}

export default function SkillCard({ name, level }: SkillCardProps) {
  const levelColor = {
    Learning: 'bg-yellow-100 text-yellow-800',
    Comfortable: 'bg-blue-100 text-blue-800',
    Confident: 'bg-green-100 text-green-800',
  };

  return (
    <div className="p-3 border rounded-lg bg-white dark:bg-gray-800 flex justify-between items-center">
      <span className="font-medium text-gray-900 dark:text-white">{name}</span>
      <span className={`text-xs px-2 py-1 rounded-full ${levelColor[level]}`}>
        {level}
      </span>
    </div>
  );
}