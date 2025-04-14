import {
  GitPullRequest,
  Circle,
  Zap,
  Target,
  AlertTriangle,
  FileCode,
  Bot,
  Library,
} from "lucide-react";
import { Changeset, changesets } from "@/data/changeset-data";
import PageHeader from "@/components/page-header";
import { testCases } from "@/data/sample-data";

type PageProps = {
  id: string;
};

function ChangesetOverview({ changeset }: { changeset: Changeset }) {
  return (
    <div>
      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Circle
            className={`w-3 h-3 ${
              changeset.status === "merged"
                ? "fill-green-500 text-green-500"
                : changeset.status === "closed"
                  ? "fill-red-500 text-red-500"
                  : "fill-yellow-500 text-yellow-500"
            }`}
          />
          <span className="capitalize">{changeset.status}</span>
        </div>
        <div>by {changeset.author}</div>
        <div>Updated {new Date(changeset.updatedAt).toLocaleString()}</div>
      </div>
      <div className="my-4">
        <h3 className="font-medium mb-2">Description</h3>
        <p className="text-muted-foreground">{changeset.description}</p>
      </div>
    </div>
  );
}

function ChangesetInfoCard({
  header,
  content,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <div className="space-y-2 border border-muted rounded-md p-2">
      <div className="flex items-center gap-2 text-lg p-2">{header}</div>
      {content}
    </div>
  );
}

const fetchChangeset = (id: string) => {
  const changeset = changesets.find((c) => c.id === id);
  return changeset;
};

export default async function ChangesetPage({ params }: { params: Promise<PageProps> }) {
  const pageParams = await params;
  const changesetId = pageParams.id;

  const changeset = await fetchChangeset(changesetId);

  if (!changeset) {
    return <div>Changeset {changesetId} not found</div>;
  }

  const associatedTests = testCases
    .filter((test) =>
      changeset.testCases.some((testResult) => testResult.id === test.id),
    )
    .map((test) => ({
      ...test,
      status:
        changeset.testCases.find((testResult) => testResult.id === test.id)
          ?.status || "pending",
    }));

  return (
    <div className="p-6">
      <PageHeader
        title={changeset.id}
        description={changeset.title}
        icon={<GitPullRequest className="w-6 h-6" />}
      />
      <ChangesetOverview changeset={changeset} />

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min gap-4 py-4">
        <ChangesetInfoCard
          header={
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Impacted Subsystems
            </div>
          }
          content={
            <div className="space-y-2">
              {changeset.impactedSubsystems.map((system) => (
                <div
                  key={system.name}
                  className="flex flex-col items-start text-sm p-2 rounded-md bg-muted"
                >
                  <div className="flex gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        system.riskLevel === "high"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          : system.riskLevel === "medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      }`}
                    >
                      {system.riskLevel}
                    </span>
                    <span className="font-medium">{system.name}</span>
                  </div>
                  <span className="flex-1 text-muted-foreground">
                    {system.description}
                  </span>
                </div>
              ))}
            </div>
          }
        />

        <ChangesetInfoCard
          header={
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Verification Objectives
            </div>
          }
          content={
            <div className="space-y-2">
              {changeset.verificationObjectives.map((objective, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted"
                >
                  <Circle
                    className={`w-3 h-3 ${
                      objective.status === "verified"
                        ? "fill-green-500 text-green-500"
                        : objective.status === "failed"
                          ? "fill-red-500 text-red-500"
                          : "fill-yellow-500 text-yellow-500"
                    }`}
                  />
                  <span className="flex-1">{objective.objective}</span>
                  {objective.notes && (
                    <span className="text-muted-foreground">
                      {objective.notes}
                    </span>
                  )}
                </div>
              ))}
            </div>
          }
        />

        <ChangesetInfoCard
          header={
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Plausible Fallout
            </div>
          }
          content={
            <div className="space-y-2">
              {changeset.plausibleFallout.map((fallout, index) => (
                <div
                  key={index}
                  className="text-sm p-2 rounded-md bg-muted space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        fallout.severity === "critical"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          : fallout.severity === "major"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}
                    >
                      {fallout.severity}
                    </span>
                    <span className="font-medium">{fallout.scenario}</span>
                  </div>
                  <div className="text-muted-foreground pl-4 border-l-2 border-muted-foreground/20">
                    {fallout.mitigation}
                  </div>
                </div>
              ))}
            </div>
          }
        />

        <ChangesetInfoCard
          header={
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4" />
              Changed Files
            </div>
          }
          content={
            <div className="space-y-2">
              {changeset.changedFiles.map((file) => (
                <div
                  key={file.path}
                  className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted"
                >
                  <FileCode className="w-4 h-4" />
                  <span className="flex-1">{file.path}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      file.changeType === "added"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : file.changeType === "deleted"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    }`}
                  >
                    {file.changeType}
                  </span>
                  <span className="text-muted-foreground">
                    +{file.linesAdded} -{file.linesRemoved}
                  </span>
                </div>
              ))}
            </div>
          }
        />

        <ChangesetInfoCard
          header={
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Bespoke Tests
            </div>
          }
          content={
            <div className="space-y-2">
              {changeset.bespoke_tests.map((test, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted"
                >
                  <Circle
                    className={`w-3 h-3 ${
                      test.status === "passed"
                        ? "fill-green-500 text-green-500"
                        : test.status === "failed"
                          ? "fill-red-500 text-red-500"
                          : "fill-yellow-500 text-yellow-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{test.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {test.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        />

        <ChangesetInfoCard
          header={
            <div className="flex items-center gap-2">
              <Library className="w-4 h-4" />
              Existing Tests
            </div>
          }
          content={
            <div className="space-y-2">
              <div className="space-y-2">
                {associatedTests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted"
                  >
                    <Circle
                      className={`w-3 h-3 ${
                        test.status === "passed"
                          ? "fill-green-500 text-green-500"
                          : test.status === "failed"
                            ? "fill-red-500 text-red-500"
                            : "fill-yellow-500 text-yellow-500"
                      }`}
                    />
                    <span className="flex-1">{test.name}</span>
                    <span className="text-muted-foreground">
                      {test.duration}s
                    </span>
                  </div>
                ))}
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
