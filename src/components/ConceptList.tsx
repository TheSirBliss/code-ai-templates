
import { Concept } from "@/types/Concept"
import { ConceptCard } from "./ConceptCard"

interface ConceptListProps {
  concepts: Concept[];
}

export function ConceptList({ concepts }: ConceptListProps) {
  if (!concepts || concepts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-8">Here are your concepts!</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {concepts.map((concept, index) => (
          <ConceptCard key={index} concept={concept} />
        ))}
      </div>
    </div>
  )
}
