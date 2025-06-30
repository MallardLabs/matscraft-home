import Link from "next/link";
import { getWikiItems } from "#/lib/get-wiki-items";
import Container from "#/components/container";

export default async function WikiIndexPage() {
  const wikiItems = await getWikiItems();

  if (wikiItems.length === 0) {
    return (
      <main className="flex-1 bg-secondary border-[3px] border-border-primary">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Belum ada dokumentasi tersedia.
          </p>
          <p className="text-gray-400 mt-2">
            Tambahkan file MDX di folder <code>src/content/</code> untuk
            memulai.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      {wikiItems.map((item, index) => (
        <Link
          key={item.slug}
          href={`/wiki/${item.slug}`}
          className="block transition-shadow duration-200"
        >
          <Container className="p-5 w-full">
            <div
              className={`w-full flex flex-col md:flex-row ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              } gap-6 items-center md:items-start md:max-w-[90%] mx-auto`}
            >
              {/* Text Section */}
              <div className="flex-1 flex flex-col text-xs md:text-sm lg:text-base gap-3">
                <h1 className="font-ten text-2xl md:text-4xl py-3 md:py-5">
                  {item.title}
                </h1>
                {item.description && (
                  <p className="line-clamp-5 md:line-clamp-10">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Image Section */}
              <div className="flex-1 flex justify-center">
                <img
                  src={`/images/wiki/${item.slug}/thumb.png`}
                  alt="preview"
                  className="border-[3px] border-border-primary max-w-full md:max-w-[350px] justify-start"
                />
              </div>
            </div>
          </Container>
        </Link>
      ))}
    </>
  );
}
