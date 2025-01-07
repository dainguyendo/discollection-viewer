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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collection as CollectionType } from "@/lib/types";
import { TabsContent } from "@radix-ui/react-tabs";
import { Copy } from "lucide-react";
import Link from "next/link";

interface Props {
  data: CollectionType;
}

export const Collection: React.FC<Props> = ({ data }) => {
  return (
    <Tabs defaultValue="12" className="w-full">
      <TabsList>
        {Object.keys(data).map((format) => (
          <TabsTrigger key={format} value={format}>
            {format} &quot;
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.entries(data).map(([format, node]) => (
        <TabsContent key={format} value={format}>
          <CollectionNode data={node} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

interface CollectionNodeProps {
  data: CollectionType[keyof CollectionType];
  parent?: string;
}

const CollectionNode = ({ data, parent }: CollectionNodeProps) => {
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

    return (
      <Accordion key={key} type="multiple" defaultValue={[key]}>
        <AccordionItem value={key}>
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-8 gap-2">
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
                        <CardTitle>
                          <Link href={discogs.toString()}>{title}</Link>
                        </CardTitle>
                        <CardDescription>
                          {artists.map((artist) => artist.name).join(", ")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 grow">
                        <div className="grid grid-cols-2 gap-1">
                          {genres.map((genre) => (
                            <Badge key={genre} className="text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {styles.map((style) => (
                            <Badge
                              key={style}
                              variant="secondary"
                              className="text-xs"
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
                          className="text-xs text-neutral-400	"
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
