import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HoverCard } from "@/components/ui/hover-card";
import { Collection as CollectionType } from "@/lib/types";
import { Copy } from "lucide-react";
import Link from "next/link";

interface CollectionAtFormatProps {
  data: CollectionType[keyof CollectionType];
}

export const CollectionAtFormat = ({ data }: CollectionAtFormatProps) => {
  return <CollectionNode data={data} />;
};

interface CollectionNodeProps {
  data: CollectionType[keyof CollectionType];
  parent?: string;
}

export const CollectionNode = ({ data, parent }: CollectionNodeProps) => {
  return Object.entries(data).map(([key, value]) => {
    if (!Array.isArray(value)) {
      return <CollectionNode key={key} data={value} parent={key} />;
    }

    const title = (
      <>
        {parent ? <Badge>{parent}</Badge> : null}
        {key} ({value.length})
      </>
    );

    const id = parent
      ? `${parent}-${key}`.toLocaleLowerCase()
      : key.toLocaleLowerCase();

    return (
      <Accordion
        key={key}
        type="multiple"
        defaultValue={[key]}
        className="w-full"
      >
        <AccordionItem value={key}>
          <div className="sticky top-0 bg-background z-10">
            <AccordionTrigger id={id}>{title}</AccordionTrigger>
          </div>
          <AccordionContent>
            <div className="grid grid-cols-5 gap-2">
              {value.map((release) => {
                const title = release.basic_information.title;
                const artists = release.basic_information.artists;
                const thumbnail = release.basic_information.thumb;
                const genres = release.basic_information.genres;
                const styles = release.basic_information.styles;
                const id = release.basic_information.id;

                const discogs = new URL(
                  String(id),
                  "https://www.discogs.com/release/"
                );

                return (
                  <HoverCard key={release.basic_information.id}>
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <Avatar className="h-24 w-24 self-center mb-4">
                          <AvatarImage src={thumbnail} />
                          <AvatarFallback>💿</AvatarFallback>
                        </Avatar>
                        <Link href={discogs.toString()}>
                          <CardTitle>{title}</CardTitle>
                          <CardDescription>
                            {artists.map((artist) => artist.name).join(", ")}
                          </CardDescription>
                        </Link>
                      </CardHeader>
                      <CardContent className="space-y-2 grow">
                        <div className="flex flex-wrap gap-1">
                          {genres.map((genre) => (
                            <Badge
                              key={genre}
                              className="text-[10px] text-center cursor-pointer"
                              onClick={() =>
                                navigator.clipboard.writeText(genre)
                              }
                            >
                              {genre}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {styles.map((style) => (
                            <Badge
                              key={style}
                              variant="secondary"
                              className="text-[10px] text-center cursor-pointer"
                              onClick={() =>
                                navigator.clipboard.writeText(style)
                              }
                            >
                              {style}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() =>
                            navigator.clipboard.writeText(String(id))
                          }
                          className="text-[10px] text-neutral-400	"
                        >
                          <Copy />
                          {id}
                        </Button>
                      </CardFooter>
                    </Card>
                  </HoverCard>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });
};
