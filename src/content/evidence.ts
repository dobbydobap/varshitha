// Evidence — open source + achievements. §6 verbatim.

export const mergedPRs = [
  {
    repo: "microsoft/vscode",
    num: "#324571",
    url: "https://github.com/microsoft/vscode/pull/324571",
    detail: "fixed a task re-run execution bug",
  },
  {
    repo: "microsoft/vscode",
    num: "#324734",
    url: "https://github.com/microsoft/vscode/pull/324734",
    detail: "fixed a pinned-tab drag-and-drop defect in the editor tab bar",
  },
] as const;

export const openPRs = [
  { repo: "microsoft/vscode", nums: "#324369 & #324682" },
  { repo: "Textualize/textual", nums: "#6631 & #6630" },
  { repo: "fedora-infra/bodhi", nums: "#6121" },
] as const;

export const achievements = [
  {
    title: "Global Top 6, Apple Developer Academy (Italy)",
    detail: "among the top 6 applicants admitted from a worldwide pool",
  },
  {
    title: "Top 100, Meta PyTorch × Scaler OpenEnv Hackathon",
    detail: "among thousands of global participants",
  },
] as const;
