import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collection as CollectionType } from "@/lib/types";
import { TabsContent } from "@radix-ui/react-tabs";

interface Props {
  data: CollectionType;
}

export const Collection: React.FC<Props> = ({ data }) => {
  return (
    <Tabs defaultValue="12">
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
            {Array.isArray(value) ? (
              <div className="grid grid-cols-8 gap-2">
                {value.map((release) => {
                  console.log({ release });

                  const title = release.basic_information.title;
                  const artists = release.basic_information.artists;
                  const thumbnail = release.basic_information.thumb;
                  const genres = release.basic_information.genres;
                  const styles = release.basic_information.styles;

                  return (
                    <HoverCard key={release.basic_information.id}>
                      <HoverCardTrigger>
                        <Card className="h-full">
                          <CardHeader>
                            <Avatar className="h-24 w-24">
                              <AvatarImage src={thumbnail} />
                              <AvatarFallback>💿</AvatarFallback>
                            </Avatar>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>
                              {artists.map((artist) => artist.name).join(", ")}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {genres.map((genre) => (
                                <Badge key={genre} className="text-xs">
                                  {genre}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-2">
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
                          <CardFooter></CardFooter>
                        </Card>
                      </HoverCardTrigger>
                    </HoverCard>
                  );
                })}
              </div>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });
};
