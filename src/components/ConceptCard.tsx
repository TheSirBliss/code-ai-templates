
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Concept } from "@/types/Concept"

interface ConceptCardProps {
  concept: Concept;
}

export function ConceptCard({ concept }: ConceptCardProps) {
  return (
    <Card className="animate-fade-in flex flex-col">
      <CardHeader>
        <CardTitle>{concept.conceptName}</CardTitle>
        <CardDescription>{concept.headline}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div>
          <h4 className="font-semibold text-sm mb-1">Concept Description</h4>
          <p className="text-muted-foreground text-sm">{concept.description}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-1">Visual Ideas</h4>
          <p className="text-muted-foreground text-sm">{concept.visualDescription}</p>
        </div>
      </CardContent>
    </Card>
  )
}
