import Image from "next/image";
import Navbar from "#/components/navbar";
import Button from "#/components/button";
import SvgLoader from "#/components/svg/svgLoader";
import Container from "#/components/container";
import MiningStats from "#/components/stats";
import Footer from "#/components/footer";
import { GithubIcon, TwitterIcon } from "raster-react";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Navbar className="px-3 h-[80px]">
        <div className="w-full md:max-w-[90%] mx-auto flex items-center gap-2 justify-between">
          <a
            href="https://mallardlabs.xyz"
            className="font-ten text-base md:text-2xl flex flex-col"
          >
            Mallard Labs
          </a>
          <div className="flex items-center gap-2">
            <a href="https://github.com/MallardLabs">
              <GithubIcon size={24} color="" strokeWidth={0.25} radius={1} />
            </a>
            <a href="https://x.com/MallardLabs">
              <TwitterIcon size={24} color="" strokeWidth={0.25} radius={1} />
            </a>
            <a href="https://discord.mezo.org">
              <SvgLoader className="w-6 h-6" name="discord" />
            </a>
          </div>
        </div>
      </Navbar>
      <header className="hero w-full h-[500px] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 px-4 w-full">
          <img
            src="/images/logo.png"
            alt="preview"
            className="w-64 md:w-80 lg:w-96"
          />
          <p className="text-white font-minecraft text-xs md:text-sm lg:text-base text-center max-w-xl leading-relaxed">
            Play-to-Earn Minecraft server, where players can earn $MATS & $HUH
            through mining, and other in-game activities.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <Link
              href="/wiki/how-to-play"
              className="w-full text-[10px] md:text-xs"
            >
              <Button
                variant="success"
                className="w-full text-[10px] md:text-xs"
              >
                Play Matscraft
              </Button>
            </Link>
            <Link href="/wiki" className="w-full text-[10px] md:text-xs">
              <Button
                variant="primary"
                className="w-full text-[10px] md:text-xs"
              >
                Matscraft Wiki
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="flex flex-col">
            <p className="text-white font-ten text-xs md:text-sm lg:text-base text-start">
              powered by
            </p>
            <div className="flex items-center gap-2">
              <a href="https://mezo.org">
                <SvgLoader name="mezo" className="w-18 md:w-24" />
              </a>
              &
              <a href="https://drip.re">
                <SvgLoader name="drip" className="w-18 md:w-24" />
              </a>
            </div>
          </div>
        </div>
      </header>
      <Container className="p-5 w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center md:max-w-[90%] mx-auto">
          <div className="flex flex-col text-xs md:text-sm lg:text-base gap-3">
            <h1 className="font-ten text-2xl md:text-4xl py-3 md:py-5">
              Play and earn anywhere!
            </h1>
            <p>
              since MatsCraft runs on Bedrock Edition, you can play anytime,
              anywhere — on iOS, Android, or desktop!
            </p>
            <p>
              Mine Ores in MatsCraft and earn $MATS / $HUH along the way! Each
              ore drops random loot — you never know what you’ll get!
            </p>
          </div>
          <div className="flex justify-end">
            <img
              src="/images/preview.webp"
              alt="preview"
              className="border-[3px] border-border-primary max-w-full md:max-w-[500px]"
            />
          </div>
        </div>
      </Container>
      <Container className="w-full md:px-5 py-10">
        <MiningStats />
      </Container>
      <Footer />
    </>
  );
}
