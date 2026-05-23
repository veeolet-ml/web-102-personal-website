import GitHubActivity from "./components/GitHubActivity";
import IntroSection from "./components/IntroSection";

function App() {
  return (
    <main className="min-h-screen px-4 py-10">
      <IntroSection />

      <section id="projects"></section>

      <section id="github-activity" className="mx-auto w-full max-w-xl">
        <GitHubActivity username="veeolet-ml" repo="web-102-personal-website" />
        {/* <GitHubActivity username="veeolet-ml" repo="niflover" /> */}
      </section>
    </main>
  );
}

export default App;
