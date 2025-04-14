export default function PageHeader({
  title,
  description,
  icon,
}: {
  title: string | React.ReactNode;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-6 page-header">
      {icon}
      <div className="flex flex-row items-baseline gap-2">
        <h1 className="text-2xl">{title}</h1>
        <h3 className="text-xl text-muted-foreground">{description}</h3>
      </div>
    </div>
  );
}
