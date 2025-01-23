import Feed from "@app/components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">Discover and share 
        <br className="max-md:hidden" />
            <span className="rose_gradient"> AI Powered prompts</span>
        </h1>
        <p className="desc text-center">PromptPlanet is an opensource AI prompting tool for modern world to discover, create and share creative prompts</p>

        <Feed />
    </section>
  )
}

export default Home
