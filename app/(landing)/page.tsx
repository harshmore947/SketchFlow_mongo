"use client";
import Logo from "@/components/base/Logo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// import AuthDialog from "@/components/ui/AuthDialog";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      {/* Hero Section */}
      <section className="pt-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Draw, Create, <span className="text-primary">Flow</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Create beautiful diagrams and sketches with Excalidraw integration
          </p>
          {session?.user ? (
            <Button
              className="h-14 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold transition-colors"
              size={"lg"}
              onClick={() => router.push("/dashboard")}
            >
              Continue to Dashboard
            </Button>
          ) : (
            <Button
              className="h-14 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold transition-colors"
              size="lg"
              onClick={() => alert("Show Auth Dialog")}
            >
              Get Started
            </Button>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Powerful features for your creative workflow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border">
              <div className="text-primary text-2xl mb-4">✏️</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Excalidraw Integration
              </h3>
              <p className="text-muted-foreground">
                Professional drawing tools with shapes, text, and freehand
                drawing
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border">
              <div className="text-primary text-2xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Smart Note Management
              </h3>
              <p className="text-muted-foreground">
                Organize with starring, archiving, and search functionality
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border">
              <div className="text-primary text-2xl mb-4">💾</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Auto-Save & Export
              </h3>
              <p className="text-muted-foreground">
                Automatic saving and export drawings as .excalidraw files
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-4 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Everything you need to stay organized
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-primary text-3xl mb-3">⭐</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Star Notes
              </h3>
              <p className="text-muted-foreground text-sm">
                Mark your favorite drawings
              </p>
            </div>
            <div className="text-center">
              <div className="text-primary text-3xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Smart Search
              </h3>
              <p className="text-muted-foreground text-sm">
                Find notes by title and content
              </p>
            </div>
            <div className="text-center">
              <div className="text-primary text-3xl mb-3">📱</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Responsive Design
              </h3>
              <p className="text-muted-foreground text-sm">
                Works on all devices
              </p>
            </div>
            <div className="text-center">
              <div className="text-primary text-3xl mb-3">🔐</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Secure Auth
              </h3>
              <p className="text-muted-foreground text-sm">
                Google & GitHub login
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to start creating?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join users who are already creating amazing diagrams with SketchFlow
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {session?.user ? (
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold transition-colors"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </Button>
            ) : (
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold transition-colors">
                Get Started
              </Button>
            )}
            <Button
              variant="outline"
              className="border-border text-foreground px-8 py-4 rounded-full text-lg font-semibold transition-colors hover:bg-muted"
              onClick={() => {
                if (session?.user) {
                  router.push("/dashboard");
                }
              }}
            >
              {session?.user ? "Create New Note" : "Learn More"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
