import { mockIssues } from './data/mockIssues';
import IssueCard from './components/issue/IssueCard';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">CivicPulse Issues</h1>
        <div className="grid gap-4">
          {mockIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    </div>
  )
}
