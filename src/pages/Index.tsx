
import { GeneratorForm } from "@/components/GeneratorForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
            Generate Your Perfect Website with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Just describe your vision, and we'll craft a stunning landing page for you in seconds. No code, no hassle.
          </p>
        </div>
        <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg">
          <GeneratorForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
